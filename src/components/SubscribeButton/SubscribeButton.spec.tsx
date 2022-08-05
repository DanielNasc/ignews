import {render, screen, fireEvent} from '@testing-library/react';
import {signIn, useSession} from 'next-auth/react';
import {useRouter} from 'next/router'

import { SubscribeButton } from '.';

jest.mock('next-auth/react');
jest.mock('next/router', () => ({
    useRouter: jest.fn().mockReturnValue({
      push: jest.fn(),
    }),
  }))

// const useRouter = jest.spyOn(require('next/router'), 'useRouter')

describe('SignInButton', () => {
    it("renders correctly", () => {
        const mockedUseSession = jest.mocked(useSession);
        mockedUseSession.mockReturnValueOnce({
            data: null,
            status: "unauthenticated"
        })

        render(<SubscribeButton />);

        expect(screen.getByText("Subscribe")).toBeInTheDocument();
    })

    it("redirects to the login page when the user is not logged in", () => {
        const mockedSignIn = jest.mocked(signIn);
        const mockedUseSession = jest.mocked(useSession);
        mockedUseSession.mockReturnValueOnce({
            data: null,
            status: "unauthenticated"
        })

        render(<SubscribeButton />);

        const button = screen.getByText("Subscribe");

        fireEvent.click(button);

        expect(mockedSignIn).toHaveBeenCalled()
    })

    it("redirects to the posts page when the user is logged in", () => {
        const mockedRouter = jest.mocked(useRouter);
        const mockedUseSession = jest.mocked(useSession);
        const push = jest.fn();

        mockedRouter.mockReturnValueOnce({
            push
        } as any)
        mockedUseSession.mockReturnValueOnce({
            data: {
                user: {
                    name: "John Doe",
                    email: "john.doe@example.com",
                },
                activeSubscription: "confia",
                expires: "bruh",
            },
            status: "authenticated"
        })

        render(<SubscribeButton />);

        const button = screen.getByText("Subscribe");

        fireEvent.click(button);

        expect(push).toHaveBeenCalledWith("/posts")
    })
})