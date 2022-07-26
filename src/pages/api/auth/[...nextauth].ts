import NextAuth from "next-auth";
import GithubProvider from "next-auth/providers/github";
import { query as q } from "faunadb";

import { faunaClient } from "../../../services/fuana";

export default NextAuth({
  providers: [
    GithubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!,
      authorization: {
        params: {
          scope: "read:user",
          secret: process.env.NEXTAUTH_SECRET!,
        },
      },
    }),
  ],
  callbacks: {
    async signIn({ user }) {
      const { email } = user;

      try {
        if (!email) {
          throw new Error("No email found");
        }

        await faunaClient.query(
          q.If(
            q.Not(
              q.Exists(q.Match(q.Index("user_by_email"), q.Casefold(email)))
            ),
            q.Create(q.Collection("users"), { data: { email } }),
            q.Get(q.Match(q.Index("user_by_email"), q.Casefold(email)))
          )
        );
      } catch (error) {
        console.log(error);

        return false;
      }

      return true;
    },
  },
});
