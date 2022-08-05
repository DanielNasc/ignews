import Link from "next/link";
import Image from "next/image";

import { SignInButton } from "../SignInButton";

import styles from "./styles.module.scss";
import { useRouter } from "next/router";
import { ActiveLink } from "../ActiveLink";

export function Header() {
  const { asPath } = useRouter();

  return (
    <header className={styles.headerContainer}>
      <div className={styles.headerContent}>
        <Image width="110" height="31" src="/images/logo.svg" alt="" />

        <nav>
          <ActiveLink href="/" activeClassName={styles.active}>
            <a>Home</a>
          </ActiveLink>
          <ActiveLink href="/posts" activeClassName={styles.active}>
            <a>Posts</a>
          </ActiveLink>
        </nav>

        <SignInButton />
      </div>
    </header>
  );
}
