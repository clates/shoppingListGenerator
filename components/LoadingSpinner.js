import styles from "./loading.module.css"
export default function LoadingSpinner({ text = "Loading" }) {
  return <div className={styles.loadingContainer}>
    <div className={styles.loading}></div>
    <div className={styles.loadingText}>{text}</div>
  </div>
}