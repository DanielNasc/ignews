import { Client } from "faunadb";

export const faunaClient = new Client({
  secret: process.env.FAUNA_CLIENT_SECRET!,
  domain: "db.us.fauna.com",
});
