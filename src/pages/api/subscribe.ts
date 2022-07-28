import { NextApiRequest, NextApiResponse } from "next";
import { getSession } from "next-auth/react";
import { query as q } from "faunadb";

import { faunaClient } from "../../services/fuana";
import { stripe } from "../../services/stripe";

type User = {
  ref: {
    id: string;
  };
  data: {
    stripe_customer_id: string;
  };
};

export default async function subscribe(
  req: NextApiRequest,
  res: NextApiResponse
) {
  // verifica se o method é POST, se não for, retorna uma resposta com um header Allow: POST
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    res.status(405).end("Method not allowed");
    return;
  }

  const session = await getSession({ req }); // pega o session do next-auth
  if (!session) {
    res.status(401).end("Unauthorized");
    return;
  }

  if (!session.user?.email) {
    res.status(400).end("No email found");
    return;
  }

  // pega o user do fauna
  const user = await faunaClient.query<User>(
    q.Get(q.Match(q.Index("user_by_email"), q.Casefold(session.user.email)))
  );

  let customerId = user.data.stripe_customer_id;

  if (!customerId) {
    const stripeCustomer = await stripe.customers.create({
      email: session.user.email,
    });

    await faunaClient.query(
      q.Update(q.Ref(q.Collection("users"), user.ref.id), {
        data: {
          stripe_customer_id: stripeCustomer.id,
        },
      })
    );

    customerId = stripeCustomer.id;
  }

  const checkoutSession = await stripe.checkout.sessions.create({
    customer: customerId,
    payment_method_types: ["card"],
    billing_address_collection: "required",
    line_items: [{ price: process.env.PRICE_ID!, quantity: 1 }],
    mode: "subscription",
    allow_promotion_codes: true,
    success_url: process.env.STRIPE_SUCCESS_URL!,
    cancel_url: process.env.STRIPE_CANCEL_URL!,
  });

  return res.status(200).json({ sessionId: checkoutSession.id });
}
