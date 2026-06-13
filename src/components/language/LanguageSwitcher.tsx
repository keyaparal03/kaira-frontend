import styles from "./LanguageSwitcher.module.scss";

function LanguageSwitcher() {
  return (
    <select className={styles.select}>
      <option>EN</option>
      <option>HI</option>
    </select>
  );
}

export default LanguageSwitcher;