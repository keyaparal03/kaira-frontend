import { useForm } from "react-hook-form";
import styles from "./Register.module.scss";

interface RegisterData {
  name: string;
  email: string;
  password: string;
}

function Register() {
  const {
    register,
    handleSubmit
  } = useForm<RegisterData>();

  const onSubmit = (
    data: RegisterData
  ) => {
    console.log(data);
  };

  return (
    <div className={styles.container}>
      <form
        onSubmit={handleSubmit(onSubmit)}
      >
        <h2>Register</h2>

        <input
          placeholder="Name"
          {...register("name")}
        />

        <input
          placeholder="Email"
          {...register("email")}
        />

        <input
          type="password"
          placeholder="Password"
          {...register("password")}
        />

        <button>
          Register
        </button>
      </form>
    </div>
  );
}

export default Register;