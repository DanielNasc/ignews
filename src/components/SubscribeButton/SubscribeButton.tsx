import { strictEqual } from "assert";
import { signIn, useSession } from "next-auth/react";
import { api } from "../../services/api";
import { getStripeJs } from "../../services/stripe-js";
import styles from "./styles.module.scss";

interface SubscribeButtonProps {
  priceId: string;
}

export function SubscribeButton({ priceId }: SubscribeButtonProps) {
  const { data: session } = useSession();

  async function handleSubscribe() {
    // se o usuário nao estiver logado, redireciona para o login
    if (!session) {
      signIn("github");
    }

    // se o usuário estiver logado, faz o subscribe
    try {
      const response = await api.post("/subscribe");

      const { sessionId } = response.data;

      const stripe = await getStripeJs();

      if (!stripe) {
        throw new Error("Stripe not found");
      }

      stripe.redirectToCheckout({ sessionId });
    } catch (err: any) {
      alert(err.message);
    }
  }

  return (
    <button
      type="button"
      className={styles.subscribeButton}
      onClick={handleSubscribe}
    >
      Subscribe
    </button>
  );
}
