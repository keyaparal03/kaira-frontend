import { useDispatch } from "react-redux";

import { toggleTheme } from "../../redux/features/themeSlice";

import styles from "./ThemeToggle.module.scss";

function ThemeToggle() {
  const dispatch: any = useDispatch();

  return (
    <button
      className={styles.button}
      onClick={() => dispatch(toggleTheme())}
    >
      Theme
    </button>
  );
}

export default ThemeToggle;