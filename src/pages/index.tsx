import type { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { SubscribeButton } from "../components/SubscribeButton/SubscribeButton";
import { stripe } from "../services/stripe";

import styles from "./home.module.scss";

const PRICE_ID = process.env.PRICE_ID!;

interface product {
  priceId: string;
  amount: string;
}

interface HomeProps {
  product: product;
}

export default function Home({ product }: HomeProps) {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <main className={styles.contentContainer}>
        <section className={styles.hero}>
          <span>👋 Hey, welcome</span>
          <h1>
            News about the <span>React</span> world.
          </h1>
          <p>
            Get access to the latest news about the React framework. <br />
            <span>for {product.amount}/month</span>
          </p>

          <SubscribeButton priceId={PRICE_ID} />
        </section>

        <Image
          src="/images/avatar.svg"
          alt="a girl codding in a notebook"
          width="336"
          height="521"
        />
      </main>
    </>
  );
}

// SSG --> Static Site Generation
export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve(PRICE_ID);

  const product: product = {
    priceId: price.id,
    amount: new Intl.NumberFormat("en-US", {
      style: "currency",
      currency: "USD",
    }).format((price.unit_amount || 0) / 100),
  };

  return {
    props: {
      product,
    },
    revalidate: 60 * 60 * 24, // 1 day
  };
};
