import { render, screen } from "@testing-library/react";

import Home, { getStaticProps } from "../../pages";
import { stripe } from "../../services/stripe";

jest.mock("next-auth/react", () => ({
  useSession: jest.fn().mockReturnValue({
    data: null,
    status: "unauthenticated",
  }),
}));
jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
  }),
}));

jest.mock("../../services/stripe.ts");

describe("Home", () => {
  it("should render", () => {
    render(<Home product={{ priceId: "hola", amount: "$514.00" }} />);

    expect(screen.getByText("for $514.00/month")).toBeInTheDocument();
  });

  // testando get static props
  it("loads initial data", async () => {
    const mockedStripeRetrieve = jest.mocked(stripe.prices.retrieve);
    mockedStripeRetrieve.mockResolvedValueOnce({
      id: "fakeid",
      unit_amount: 51400,
    } as any);

    const response = await getStaticProps({});

    expect(response).toEqual(
      expect.objectContaining({
        props: {
          product: {
            priceId: "fakeid",
            amount: "$514.00",
          },
        },
      })
    );
  });
});
