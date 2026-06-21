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
  registerUser
} from "../../../redux/features/authThunk";

import {
  toast
} from "react-toastify";

import logoDark from "../../../assets/logo/kaira-logo-light.png";

import "./RegisterPage.scss";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

function RegisterPage() {

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
    watch,
    formState: {
      errors
    }
  } =
    useForm<RegisterForm>();

  const password =
    watch("password");

  const onSubmit =
    async (
      data: RegisterForm
    ) => {

      try {

        await dispatch(
          registerUser({

            name:
              data.name,

            email:
              data.email,

            password:
              data.password

          })
        ).unwrap();

        toast.success(
          "Registration Successful"
        );

        navigate(
          "/login"
        );

      } catch (
        error: any
      ) {

        toast.error(
          error ||
          "Registration Failed"
        );
      }
    };

  return (

    <div className="register-wrap">

      <form
        onSubmit={
          handleSubmit(
            onSubmit
          )
        }
      >

        {/* LOGO */}

        <div
          style={{
            textAlign:
              "center"
          }}
        >

          <Link to="/">
         
            <img className="logo"
              src={logoDark}
              alt="logo"
            />

          </Link>

        </div>

        <h2>
          Create Account
        </h2>

        {/* NAME */}

        <input
          placeholder="Full Name"

          {...register(
            "name",

            {
              required:
                "Name is required",

              minLength: {

                value: 3,

                message:
                  "Minimum 3 characters"
              }
            }
          )}
        />

        {
          errors.name &&

          <p className="error-text">
            {
              errors.name.message
            }
          </p>
        }

        {/* EMAIL */}

        <input
          placeholder="Email"

          {...register(
            "email",

            {
              required:
                "Email required",

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
              errors.email.message
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
              errors.password.message
            }
          </p>
        }

        {/* CONFIRM */}

        <input
          type="password"
          placeholder="Confirm Password"

          {...register(
            "confirmPassword",

            {
              required:
                "Confirm password required",

              validate:
                (value) =>

                  value ===
                  password ||

                  "Passwords do not match"
            }
          )}
        />

        {
          errors.confirmPassword &&

          <p className="error-text">
            {
              errors
              .confirmPassword
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
              : "Register"
          }

        </button>

        {/* LOGIN */}

        <div className="bottom-link">

          Already have account ?

          <Link to="/login">
            Login
          </Link>

        </div>

        {/* HOME */}

        <div className="back-home">

          <Link to="/">
            ← Back To Home
          </Link>

        </div>

      </form>

    </div>
  );
}

export default RegisterPage;