import React from "react";

import { useFormik } from "formik";
import * as Yup from "yup";

import {
  useDispatch,
  useSelector
} from "react-redux";

import {
  Link,
  useNavigate
} from "react-router-dom";

import { toast } from "react-toastify";

import {
  registerUser
} from "../../redux/features/authThunk";

import "./Register.scss";

function RegisterPage() {
  const dispatch: any =
    useDispatch();

  const navigate =
    useNavigate();

  const authState =
    useSelector(
      (state: any) =>
        state?.auth || {
          loading: false
        }
    );

  const { loading } =
    authState;

  const formik =
    useFormik({
      initialValues: {
        name: "",
        email: "",
        password: ""
      },

      validationSchema:
        Yup.object({
          name:
            Yup.string()
              .required(),

          email:
            Yup.string()
              .email()
              .required(),

          password:
            Yup.string()
              .min(8)
              .required()
        }),

      onSubmit:
        async (
          values
        ) => {
          try {

            const response: any =
              await dispatch(
                registerUser(
                  values
                )
              ).unwrap();

            /*
            SUCCESS TOAST
            */

            toast.success(
              response.message ||
              "Registration successful!"
            );

            /*
            REDIRECT LOGIN
            */

            setTimeout(
              () => {
                navigate(
                  "/login"
                );
              },
              1500
            );

          } catch (
            error: any
          ) {
            toast.error(
              error ||
              "Registration failed"
            );
          }
        }
    });

  return (
    <div className="register-page">

      <form
        onSubmit={
          formik.handleSubmit
        }
      >
        <div className="brand">
          Kaira
          <span>
            Fashion
          </span>
        </div>

        <h2>
          Register
        </h2>

        <input
          name="name"
          placeholder="Name"

          value={
            formik.values.name
          }

          onChange={
            formik.handleChange
          }
        />

        <input
          name="email"
          placeholder="Email"

          value={
            formik.values.email
          }

          onChange={
            formik.handleChange
          }
        />

        <input
          type="password"
          name="password"
          placeholder="Password"

          value={
            formik.values.password
          }

          onChange={
            formik.handleChange
          }
        />

        <button
          type="submit"
        >
          {loading
            ? "Loading..."
            : "Register"}
        </button>

        <div className="bottom-link">
          Already account?{" "}

          <Link to="/login">
            Login
          </Link>
        </div>

      </form>

    </div>
  );
}

export default RegisterPage;