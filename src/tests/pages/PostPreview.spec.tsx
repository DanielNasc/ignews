import { render, screen } from "@testing-library/react";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";

import Post, { getStaticProps } from "../../pages/posts/preview/[slug]";
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
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

describe("Post Preview", () => {
  it("renders correctly", () => {
    const mockedUseSession = jest.mocked(useSession);
    mockedUseSession.mockReturnValueOnce({
      data: null,
      status: "unauthenticated",
    });

    render(<Post post={post} />);

    expect(screen.getByText("fake title")).toBeInTheDocument();
    expect(
      screen.getByText(
        "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat."
      )
    ).toBeInTheDocument();
    expect(screen.getByText("Wanna continue reading?")).toBeInTheDocument();
  });

  it("redirects user to full post if the user is logged in", async () => {
    const mockedUseSession = jest.mocked(useSession);
    mockedUseSession.mockReturnValueOnce({
      data: {
        activeSubscription: "active",
      },
      status: "authenticated",
    } as any);

    const mockedUseRouter = jest.mocked(useRouter);
    const push = jest.fn();
    mockedUseRouter.mockReturnValueOnce({
      push,
    } as any);

    render(<Post post={post} />);
    expect(push).toHaveBeenCalledWith("/posts/fake-slug");
  });

  it("loads initial data", async () => {
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

    const response = await getStaticProps({
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
