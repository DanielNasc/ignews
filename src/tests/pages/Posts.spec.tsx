import { render, screen } from "@testing-library/react";

import Posts, { getStaticProps, Post } from "../../pages/posts";
import { client } from "../../services/prismic";

const posts: Post[] = [
  {
    slug: "fake-slug",
    title: "fake title",
    excerpt:
      "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
    updatedAt: "2004",
  },
];

jest.mock("../../services/prismic", () => {
  return {
    client: {
      getAllByType: jest.fn(),
    },
  };
});

describe("Posts", () => {
  it("should renders correctly", () => {
    render(<Posts posts={posts} />);

    expect(screen.getByText("fake title")).toBeInTheDocument();
  });

  it("s", async () => {
    const mockedClient = jest.mocked(client);

    mockedClient.getAllByType.mockResolvedValueOnce([
      {
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
            },
          ],
        },
        last_publication_date: "2004",
      },
    ] as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          posts: [
            {
              slug: "fake-slug",
              title: "fake title",
              excerpt:
                "Lorem ipsum dolor sit amet, qui minim labore adipisicing minim sint cillum sint consectetur cupidatat.",
              updatedAt: "31 de dezembro de 2003",
            },
          ],
        },
      })
    );
  });
});
