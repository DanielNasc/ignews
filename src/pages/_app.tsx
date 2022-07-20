import type { AppProps } from "next/app";
import { Header } from "../components/Header";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
      <Header /> {/* O header aparece em todas as páginas */}
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
