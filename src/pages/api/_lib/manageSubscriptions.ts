import { query as q } from "faunadb";
import { faunaClient } from "../../../services/fuana";
import { stripe } from "../../../services/stripe";

export async function saveSubscription(
  subscriptionId: string,
  customerId: string,
  isCreateAction = false
) {
  // buscar o usuario no faunadb com o id do customer
  const userRef = await faunaClient.query(
    q.Select(
      "ref",
      q.Get(q.Match(q.Index("user_by_stripe_customer_id"), customerId))
    )
  );

  const subscription = await stripe.subscriptions.retrieve(subscriptionId);

  // salvar os dados da subscription do usuario no faunadb
  const subscriptionData = {
    id: subscription.id,
    userId: userRef,
    status: subscription.status,
    price_id: subscription.items.data[0].price.id,
  };

  if (isCreateAction) {
    // se for uma criacao, salvar a subscription no faunadb
    await faunaClient.query(
      q.Create(q.Collection("subscriptions"), {
        data: { ...subscriptionData },
      })
    );
  } else {
    // se for uma atualizacao, atualizar a subscription no faunadb
    await faunaClient.query(
      q.Replace(
        q.Select(
          "ref",
          q.Get(q.Match(q.Index("subscription_by_id"), subscriptionId))
        ),
        {
          data: { ...subscriptionData },
        }
      )
    );
  }
}
