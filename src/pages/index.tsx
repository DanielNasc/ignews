import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { SubscribeButton } from "../components/SubscribeButton/SubscribeButton";

import styles from "./home.module.scss";

const Home: NextPage = () => {
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
            <span>for $9.90/month</span>
          </p>

          <SubscribeButton />
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
};

export default Home;
