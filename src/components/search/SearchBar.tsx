import styles from "./SearchBar.module.scss";

function SearchBar() {
  return (
    <input
      className={styles.input}
      placeholder="Search products..."
    />
  );
}

export default SearchBar;