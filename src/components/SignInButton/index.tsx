import { FaGithub } from "react-icons/fa";
import { FiX } from "react-icons/fi";
import styles from "./styles.module.scss";

export function SignInButton() {
  const isUserSignedIn = true;

  return isUserSignedIn ? (
    // se o usuário etiver logado, exibe o seu nome do Github e um botão para sair
    <button type="button" className={styles.signInButton}>
      <FaGithub color="04d361" /> Daniel Nasc
      <FiX color="737380" className={styles.closeIcon} />
    </button>
  ) : (
    // se o usuário não estiver logado, exibe um botão para fazer login
    <button type="button" className={styles.signInButton}>
      <FaGithub color="eba417" /> Sign In with Github
    </button>
  );
}
