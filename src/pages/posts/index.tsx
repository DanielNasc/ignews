import React from "react";
import Head from "next/head";

import { GetStaticProps } from "next";
import { asText } from "@prismicio/helpers";

import { client } from "../../services/prismic";
import styles from "./styles.module.scss";
import Link from "next/link";

interface Post {
  slug: string;
  title: string;
  excerpt: string;
  updatedAt: string;
}

interface PostProps {
  posts: Post[];
}

export default function Posts({ posts }: PostProps) {
  return (
    <>
      <Head>
        <title>Posts | ignews</title>
      </Head>

      <main className={styles.container}>
        <div className={styles.posts}>
          {posts.map((post) => (
            <Link href={`/posts/${post.slug}`}>
              <a key={post.slug}>
                <time>{post.updatedAt}</time>
                <strong>{post.title}</strong>
                <p>{post.excerpt}</p>
              </a>
            </Link>
          ))}
        </div>
      </main>
    </>
  );
}

export const getStaticProps: GetStaticProps = async () => {
  const response = await client.getAllByType("post");

  const posts = response.map((post) => ({
    slug: post.uid,
    title: asText(post.data.Title),
    excerpt:
      post.data.Content.find(
        (content: any) =>
          content.type === "paragraph" && content.text.length > 0
      )?.text ?? "",
    updatedAt: new Date(post.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  }));

  console.dir(posts, { depht: null });

  return {
    props: {
      posts,
    },
  };
};
