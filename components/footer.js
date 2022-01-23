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
    <footer className={"mt-5 w-full"}>
      <hr />
      <ul className={"ml-3"}>
        <li className={styles.navItem}>
          <a href="https://nextjs.org/">
            <FontAwesomeIcon icon={faReact} />
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="https://github.com/clates/shoppingListGenerator">
            <FontAwesomeIcon icon={faGithub} />
          </a>
        </li>
        <li className={styles.navItem}>
          <a href="mailto:chris@noplanjustshop.com">
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
