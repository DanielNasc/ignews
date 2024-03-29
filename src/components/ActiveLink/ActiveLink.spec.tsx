import { render, screen } from "@testing-library/react"
import { ActiveLink } from "."

jest.mock("next/router", () => {
    return {
        useRouter() {
           return {
            asPath: "/"
           }
        }
    }
})

describe("ActiveLink", () => {
    it("renders correctly", () => {
        render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
    
        expect(screen.getByText("Home")).toBeInTheDocument()
    })
    
    it("renders active class name when active", () => {
        render(
            <ActiveLink href="/" activeClassName="active">
                <a>Home</a>
            </ActiveLink>
        )
    
        expect(screen.getByText("Home")).toHaveClass("active")
    })
})