import {render, screen} from "@testing-library/react";

import {Header} from "."

jest.mock("next/router", () => {
    return {
        useRouter: () => ({
            asPath: "/",
        })
    }
})

jest.mock("next-auth/react", () => {
    return {
        useSession: () => ({
            data: null
        })
    }
})

describe("Header", () => {
    it("should render", () => {
        render(<Header />)

        expect(screen.getByText("Home")).toBeInTheDocument()
        expect(screen.getByText("Posts")).toBeInTheDocument()
    })
})

