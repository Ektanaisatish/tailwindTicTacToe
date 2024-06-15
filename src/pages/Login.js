import React, { useContext, useState } from "react";
import {  useForm } from "react-hook-form";
import { TEInput } from "tw-elements-react";
import { Email_REQUIRED, INVALID_CREDENTIALS, INVALID_EMAIL, INVALID_PASSWORD, LOGIN_SUCCESS, PASSWORD_MAXLENGTH, PASSWORD_MINLENGTH, PASSWORD_REQUIRED } from "../constants/Constants";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function Login() {
  const { register, handleSubmit, formState: { errors: formErrors } } = useForm();
  const { login } = useContext(AuthContext);
  const [loginError, setLoginError] = useState("");
  const navigate = useNavigate();
  
  const onSubmit = (data) => {
    const { email, password } = data;
    const users = JSON.parse(localStorage.getItem("users")) || [];
    const loggedInUser = users.find(
      (user) => user.email === email && user.password === password
    );
    if (loggedInUser) {
      login(loggedInUser); // Log in the user
      console.log(loggedInUser);
      navigate("/dashboard");
      toast.success(LOGIN_SUCCESS);
    } else {
      let errorMessage = "";
      const userWithEmail = users.find((user) => user.email === email);
      const userWithPassword = users.find((user) => user.password === password);
      if (!userWithEmail && !userWithPassword) {
        errorMessage = INVALID_CREDENTIALS;
        toast.error(INVALID_CREDENTIALS)
      } else if (!userWithEmail) {
        errorMessage = INVALID_EMAIL;
        toast.error(INVALID_EMAIL)
      } else if (!userWithPassword) {
        errorMessage = INVALID_PASSWORD;
        toast.error(INVALID_PASSWORD)
      }
      setLoginError("errorMessage");
      toast.error("Login fails")
    }
  };
  return (
    <section className="h-screen flex justify-center items-center bg-gray-100 dark:bg-gray-900">
      <div className="w-full max-w-md  dark:bg-gray-800 rounded-lg shadow-lg p-8">
        <div className="flex justify-center mb-8">
          <img
            src="https://tecdn.b-cdn.net/img/Photos/new-templates/bootstrap-login-form/draw2.webp"
            className="w-48"
            alt="Sample"
          />
        </div>

        <div className="flex flex-col space-y-6">
        
<div>
  <form onSubmit={handleSubmit(onSubmit)}>
          <div className="flex items-center justify-between border-solid border border-gray-500	">
            <div className="w-full">
              <TEInput
                type="email"
                placeholder="email"
                size="lg"
                className="mb-4"
                {...register("email", {
                  required: Email_REQUIRED,
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: INVALID_EMAIL,
                  },
                })}
              />
          <p>{formErrors.email?.message} </p>

            </div>
          </div>

          <div className="w-full border-solid border border-gray-500  mt-6">
            <TEInput
              type="password"
              placeholder="password"
              className="mb-4"
              size="lg"
              {...register("password", {
                required: PASSWORD_REQUIRED,
                minLength: {
                  value: 4,
                  message: PASSWORD_MINLENGTH,
                },
                maxLength: {
                  value: 20,
                  message: PASSWORD_MAXLENGTH,
                },
              })}
            />
            <p>{formErrors.password?.message} </p>
          </div>
          <div className="flex items-center justify-between mb-4">
            <label className="inline-flex items-center">
              <input
                type="checkbox"
                className="rounded border-primary text-primary shadow-sm focus:border-primary focus:ring-primary dark:border-neutral-600 dark:focus:border-neutral-600 dark:focus:ring-neutral-600 dark:text-neutral-200"
              />
              <span className="ml-2 text-sm text-gray-700 dark:text-white">
                Remember me
              </span>
            </label>

            <a
              href="/"
              className="text-sm text-primary hover:text-primary-600 dark:text-neutral-200"
            >
              Forgot password?
            </a>
          </div>

          <button className="block w-full rounded bg-primary py-2 transition duration-300 ease-in-out hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-primary dark:bg-transparent dark:hover:bg-primary-600 dark:focus:ring-primary">
            Login
          </button>

          <p className="mt-4 text-center text-gray-700 dark:text-white">
            Don't have an account?{" "}
            <a
              href="/signup"
              className="text-primary hover:text-primary-600 dark:text-neutral-200"
            >
              Register
            </a>
          </p></form>
          </div>
        </div>
      </div>
    </section>
  );
}
export default Login