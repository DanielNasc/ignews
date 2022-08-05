import { render, screen } from "@testing-library/react"
import {useSession} from "next-auth/react"

import { SignInButton } from "."

jest.mock("next-auth/react")

describe("SignInButton", () => {
    it("renders correctly when not logged in", () => {
        // mocked
        const mockedUseSession = jest.mocked(useSession)
        mockedUseSession.mockReturnValueOnce({
            data: null,
            status: "unauthenticated"
        })

        render(<SignInButton />)

        expect(screen.getByText("Sign In with Github")).toBeInTheDocument()
    })

    it("renders correctly when logged in", () => {
        const mockedUseSession = jest.mocked(useSession)
        mockedUseSession.mockReturnValueOnce({
            data: {
                user: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                },
                expires: "bruh",
            },
            status: "authenticated"
        })

        render(<SignInButton />)

        expect(screen.getByText("John Doe")).toBeInTheDocument()
    })
})