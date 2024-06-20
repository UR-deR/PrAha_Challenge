import styles from "./CustomButton.module.css";
export function CustomButton({ className }) {
  return (
    <button className={styles.custombutton + ` ${className}`}>click me!</button>
  );
}
