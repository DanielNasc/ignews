import Head from "next/head";
import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import { asHTML, asText } from "@prismicio/helpers";

import { client } from "../../services/prismic";

import styles from "./post.module.scss";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  return (
    <>
      <Head>
        <title>{post.title} | ignews</title>
      </Head>

      <main className={styles.post}>
        <article className={styles.post}>
          <h1>{post.title}</h1>
          <time>{post.updatedAt}</time>
          <div
            className={styles.content}
            dangerouslySetInnerHTML={{ __html: post.content }}
          />
        </article>
      </main>
    </>
  );
}

export const getServerSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });

  // if (!params) {
  //   return {
  //     redirect: {
  //       destination: "/posts",
  //       permanent: false,
  //     },
  //   };
  // }

  const slug = params!["slug"] as string;

  console.log(slug);

  if (!session?.activeSubscription) {
    return {
      redirect: {
        destination: `/posts/preview/${slug}`,
        permanent: false,
      },
    };
  }

  const response: any = await client.getByUID("post", slug, {});

  const post = {
    slug,
    title: asText(response.data.Title),
    content: asHTML(response.data.Content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: {
      post,
    },
  };
};
