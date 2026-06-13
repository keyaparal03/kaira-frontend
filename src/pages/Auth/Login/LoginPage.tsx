import React from "react";

import {
  useForm
} from "react-hook-form";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  Link
} from "react-router-dom";

import {
  loginUser
} from "../../../redux/features/authThunk";

import "./LoginPage.scss";

interface LoginForm {
  email: string;
  password: string;
}

function Login() {
  const dispatch: any =
    useDispatch();

  const {
    loading,
    error
  } = useSelector(
    (state: any) =>
      state.auth
  );

  const {
    register,
    handleSubmit
  } =
    useForm<LoginForm>();

  const onSubmit = (
    data: LoginForm
  ) => {
    dispatch(
      loginUser(data)
    );
  };

  return (
    <div className="login-page">

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
      >
        <div className="brand">
          Kaira
          <span>
            Fashion
          </span>
        </div>

        <h2>
          Welcome Back
        </h2>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <input
          placeholder="Email"
          {...register(
            "email"
          )}
        />

        <input
          type="password"
          placeholder="Password"
          {...register(
            "password"
          )}
        />

        <button
          type="submit"
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>

        <div className="bottom-link">
          New User ?{" "}

          <Link to="/register">
            Register
          </Link>
        </div>

      </form>

    </div>
  );
}

export default Login;