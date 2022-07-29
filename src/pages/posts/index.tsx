import Head from "next/head";
import styles from "./styles.module.scss";

export default function Posts() {
  return (
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          <a href="#">
            <time>12 de março de 2022</time>
            <strong>Titulo</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati, recusandae veritatis. Quidem nobis dignissimos
              exercitationem totam dolorum eaque distinctio ea fuga culpa eos.
              Corporis sequi, enim officia placeat qui nihil.
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2022</time>
            <strong>Titulo</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati, recusandae veritatis. Quidem nobis dignissimos
              exercitationem totam dolorum eaque distinctio ea fuga culpa eos.
              Corporis sequi, enim officia placeat qui nihil.
            </p>
          </a>
          <a href="#">
            <time>12 de março de 2022</time>
            <strong>Titulo</strong>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipisicing elit.
              Obcaecati, recusandae veritatis. Quidem nobis dignissimos
              exercitationem totam dolorum eaque distinctio ea fuga culpa eos.
              Corporis sequi, enim officia placeat qui nihil.
            </p>
          </a>
          f
        </div>
      </main>
    </>
  );
}
