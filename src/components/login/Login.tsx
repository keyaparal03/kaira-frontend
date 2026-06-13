import React from "react";

import { useForm } from "react-hook-form";

import {
  useDispatch,
  useSelector
} from "react-redux";

import { Link } from "react-router-dom";

// import {
//   loginUser
// } from "../../../redux/features/authThunk";

import {
  loginUser
} from "../../redux/features/authThunk";

import "./Login.scss";

interface LoginFormData {
  email: string;
  password: string;
}

function LoginPage() {

  console.log("ddd")
  const dispatch: any =
    useDispatch();

  /*
  |--------------------------------------------------------------------------
  | Safe Redux State
  |--------------------------------------------------------------------------
  */

  const authState =
    useSelector(
      (state: any) =>
        state?.auth || {
          loading: false,
          error: null
        }
    );

  const loading =
    authState.loading;

  const error =
    authState.error;

  /*
  |--------------------------------------------------------------------------
  | Form
  |--------------------------------------------------------------------------
  */

  const {
    register,
    handleSubmit,
    formState: { errors }
  } =
    useForm<LoginFormData>();

  /*
  |--------------------------------------------------------------------------
  | Submit
  |--------------------------------------------------------------------------
  */

  const onSubmit = (
    data: LoginFormData
  ) => {
    console.log(
      "LOGIN DATA:",
      data
    );

    dispatch(
      loginUser(data)
    );
  };
  console.log("ddd")

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

        {/* API ERROR */}

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        {/* EMAIL */}

        <input
          type="email"
          placeholder="Enter Email"

          {...register(
            "email",
            {
              required:
                "Email is required"
            }
          )}
        />

        {errors.email && (
          <p className="field-error">
            {
              errors.email
                .message
            }
          </p>
        )}

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Enter Password"

          {...register(
            "password",
            {
              required:
                "Password is required",

              minLength: {
                value: 6,
                message:
                  "Minimum 6 characters"
              }
            }
          )}
        />

        {errors.password && (
          <p className="field-error">
            {
              errors
                .password
                .message
            }
          </p>
        )}

        {/* BUTTON */}

        <button
          type="submit"
          disabled={loading}
        >
          {loading
            ? "Logging In..."
            : "Login"}
        </button>

        {/* LINK */}

        <div className="bottom-link">

          Don’t have account?{" "}

          <Link to="/register">
            Register
          </Link>

        </div>

      </form>

    </div>
  );
}

export default LoginPage;