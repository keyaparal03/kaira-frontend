import { useState } from "react";

import styles from "./ForgotPassword.module.scss";

function ForgotPassword() {
  const [email, setEmail] =
    useState("");

  const handleSubmit = (
    e: React.FormEvent
  ) => {
    e.preventDefault();

    console.log(email);
  };

  return (
    <div className={styles.container}>
      <form onSubmit={handleSubmit}>
        <h2>
          Forgot Password
        </h2>

        <input
          placeholder="Email"
          value={email}
          onChange={(e) =>
            setEmail(
              e.target.value
            )
          }
        />

        <button>
          Send Reset Link
        </button>
      </form>
    </div>
  );
}

export default ForgotPassword;