import React from "react";

import {
  useForm
} from "react-hook-form";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  Link,
  useNavigate
} from "react-router-dom";

import {
  toast
} from "react-toastify";

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

  const navigate =
    useNavigate();

  const {
    loading
  } = useSelector(
    (state: any) =>
      state.auth
  );

  const {
    register,
    handleSubmit
  } =
    useForm<LoginForm>();

  const onSubmit =
    async (
      data: LoginForm
    ) => {
      /*
      ------------------------------
      Manual Validation
      ------------------------------
      */

      if (!data.email) {
        toast.error(
          "Please enter email"
        );
        return;
      }

      if (!data.password) {
        toast.error(
          "Please enter password"
        );
        return;
      }

      try {

        const response: any =
          await dispatch(
            loginUser(data)
          ).unwrap();

        /*
        ------------------------------
        Success Toast
        ------------------------------
        */

        toast.success(
          response.message ||
          "Welcome back to KAIRA ✨"
        );

        /*
        ------------------------------
        Redirect Home
        ------------------------------
        */

        setTimeout(() => {
          navigate("/");
        }, 1500);

      } catch (
        error: any
      ) {

        toast.error(
          error ||
          "Login failed"
        );

      }
    };

  return (
    <div className="login-page">

      <form
        onSubmit={handleSubmit(
          onSubmit
        )}
      >

        {/* BRAND */}

        <div className="brand">
          Kaira
          <span>
            Fashion
          </span>
        </div>

        <h2>
          Welcome Back
        </h2>

        {/* EMAIL */}

        <input
          placeholder="Email"

          {...register(
            "email"
          )}
        />

        {/* PASSWORD */}

        <input
          type="password"

          placeholder="Password"

          {...register(
            "password"
          )}
        />

        {/* BUTTON */}

        <button
          type="submit"
        >
          {loading
            ? "Loading..."
            : "Login"}
        </button>

        {/* LINK */}

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