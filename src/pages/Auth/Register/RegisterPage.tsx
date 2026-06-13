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
  registerUser
} from "../../../redux/features/authThunk";

import "./RegisterPage.scss";

interface RegisterForm {
  name: string;
  email: string;
  password: string;
}

function Register() {
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
    useForm<RegisterForm>();

  const onSubmit = (
    data: RegisterForm
  ) => {
    dispatch(
      registerUser(
        data
      )
    );
  };

  return (
    <div className="register-page">

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
          Create Account
        </h2>

        {error && (
          <div className="error">
            {error}
          </div>
        )}

        <input
          placeholder="Name"
          {...register(
            "name"
          )}
        />

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
            : "Register"}
        </button>

        <div className="bottom-link">
          Already have account ?{" "}

          <Link to="/login">
            Login
          </Link>
        </div>

      </form>

    </div>
  );
}

export default Register;