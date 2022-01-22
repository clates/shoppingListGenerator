import Link from "next/link";
import styles from "./footer.module.css";
import packageJSON from "../package.json";
import {
  faGithub,
  faReact
} from "@fortawesome/free-brands-svg-icons";
import {
  faEnvelope
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <hr />
      <ul className={"ml-3"}>
        <li className={styles.navItem}>
          <a href="https://next-auth.js.org">
            <FontAwesomeIcon icon={faReact} />
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="https://www.npmjs.com/package/next-auth">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="https://github.com/nextauthjs/next-auth-example">
            <FontAwesomeIcon icon={faEnvelope} />
          </a>
        </li>
        <li className={styles.navItem}>
          <Link href="/policy">
            <a>Policy</a>
          </Link>
        </li>
        <li className={styles.navItem}>
          <em>noplanjustshop@{packageJSON.version}</em>
        </li>
      </ul>
    </footer>
  );
}
