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
  loginUser
} from "../../../redux/features/authThunk";

import {
  toast
} from "react-toastify";

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
    handleSubmit,
    formState: {
      errors
    }
  } =
    useForm<LoginForm>();

  const onSubmit =
    async (
      data: LoginForm
    ) => {

      try {

        await dispatch(
          loginUser(data)
        ).unwrap();

        toast.success(
          "Login Successful"
        );

        navigate("/");

      } catch (
        error: any
      ) {

        toast.error(
          error ||
          "Login Failed"
        );
      }
    };

  return (

    <div className="login-page">

      <form
        onSubmit={
          handleSubmit(
            onSubmit
          )
        }
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

        {/* EMAIL */}

        <input
          placeholder="Email"

          {...register(
            "email",

            {
              required:
                "Email is required",

              pattern: {

                value:
                  /^\S+@\S+\.\S+$/,

                message:
                  "Invalid email"

              }
            }
          )}
        />

        {
          errors.email &&

          <p className="error-text">
            {
              errors.email
              .message
            }
          </p>
        }

        {/* PASSWORD */}

        <input
          type="password"
          placeholder="Password"

          {...register(
            "password",

            {
              required:
                "Password required",

              minLength: {

                value: 6,

                message:
                  "Minimum 6 characters"

              }
            }
          )}
        />

        {
          errors.password &&

          <p className="error-text">
            {
              errors.password
              .message
            }
          </p>
        }

        {/* BUTTON */}

        <button
          type="submit"
        >

          {
            loading
              ? "Loading..."
              : "Login"
          }

        </button>

        <div className="bottom-link">

          New User ?

          <Link to="/register">
            Register
          </Link>

        </div>

      </form>

    </div>
  );
}

export default Login;