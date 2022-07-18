import type { NextPage } from "next";
import Head from "next/head";

import styles from "../styles/Home.module.scss";

const Home: NextPage = () => {
  return (
    <>
      <Head>
        <title>Home | ig.news</title>
      </Head>
      <div>
        <h1 className={styles.title}>Hello, Ignews</h1>
      </div>
    </>
  );
};

export default Home;
