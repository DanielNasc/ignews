import { signIn, signOut, useSession } from "next-auth/react";

import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";

import styles from "./styles.module.scss";

export function SignInButton() {
  const { data: session } = useSession();

  return session ? (
    // se o usuário etiver logado, exibe o seu nome do Github e um botão para sair
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signOut()}
    >
      <FaGithub color="#04d361" /> {session.user?.name}
      <FiX color="737380" className={styles.closeIcon} />
    </button>
  ) : (
    // se o usuário não estiver logado, exibe um botão para fazer login
    <button
      type="button"
      className={styles.signInButton}
      onClick={() => signIn("github")}
    >
      <FaGithub color="#eba417" /> Sign In with Github
    </button>
  );
}
