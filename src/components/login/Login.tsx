import React from "react";
import { useForm } from "react-hook-form";
import { useDispatch } from "react-redux";

import { loginUser } from "../../redux/features/authThunk";

import "./Login.scss";

interface LoginFormData {
  email: string;
  password: string;
}

function Login() {
  const dispatch: any =
    useDispatch();

  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm<LoginFormData>();

  const onSubmit = (
    data: LoginFormData
  ) => {
    dispatch(
      loginUser(data)
    );
  };

  return (
    <div className="login-container">

      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Login</h2>

        <input
          placeholder="Email"
          {...register("email", {
            required: true
          })}
        />

        {errors.email && (
          <span>Email required</span>
        )}

        <input
          type="password"
          placeholder="Password"
          {...register(
            "password",
            {
              required: true
            }
          )}
        />

        {errors.password && (
          <span>Password required</span>
        )}

        <button type="submit">
          Login
        </button>

      </form>

    </div>
  );
}

export default Login;