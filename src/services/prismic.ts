import * as prismic from "@prismicio/client";

const endpoint = process.env.PRISMIC_API_ENDPOINT!;
export const client = prismic.createClient(endpoint, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN!,
});
