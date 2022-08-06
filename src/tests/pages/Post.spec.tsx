import { createClient } from "@prismicio/client";
import { render, screen } from "@testing-library/react";
import { getSession } from "next-auth/react";

import Post, { getServerSideProps } from "../../pages/posts/[slug]";
import { client } from "../../services/prismic";

const post = {
  slug: "fake-slug",
  title: "fake title",
  content:
    "<p>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>",
  updatedAt: "2004",
};

jest.mock("../../services/prismic", () => {
  return {
    client: {
      getByUID: jest.fn(),
    },
  };
});

jest.mock("next-auth/react");

describe("Post", () => {
  it("should renders correctly", () => {
    render(<Post post={post} />);

    expect(screen.getByText("fake title")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
      )
    ).toBeInTheDocument();
  });

  it("redirects user to / if the user is not logged in", async () => {
    const mockedGetSession = jest.mocked(getSession);
    mockedGetSession.mockResolvedValueOnce(null);

    const response = await getServerSideProps({
      params: {
        slug: "fake-slug",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        redirect: {
          destination: "/",
          permanent: false,
        },
      })
    );
  });

  it("loads initial data", async () => {
    const mockedGetSession = jest.mocked(getSession);
    mockedGetSession.mockResolvedValueOnce({
      activeSubscription: "active",
    } as any);

    const mockedPrismicClient = jest.mocked(client);
    mockedPrismicClient.getByUID.mockResolvedValueOnce({
      uid: "fake-slug",
      data: {
        Title: [
          {
            type: "heading1",
            text: "fake title",
          },
        ],
        Content: [
          {
            type: "paragraph",
            text: "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
            spans: [],
          },
        ],
      },
      last_publication_date: "2004",
    } as any);

    const response = await getServerSideProps({
      params: {
        slug: "fake-slug",
      },
    } as any);

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          post: {
            slug: "fake-slug",
            title: "fake title",
            content:
              "<p>Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.</p>",
            updatedAt: "31 de dezembro de 2003",
          },
        },
      })
    );
  });
});
