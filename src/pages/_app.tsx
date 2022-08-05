import type { AppProps } from "next/app";
import { SessionProvider } from "next-auth/react";

import { Header } from "../components/Header";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
	return (
		<SessionProvider>
			<Header />
			{" "}
			{/* O header aparece em todas as páginas */}
			<Component {...pageProps} />
		</SessionProvider>
	);
}

export default MyApp;
