import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { createUserAsync } from "../app/thunks/userThunks.js";
import { resetServerError } from "../app/userSlice.js";
import { Button } from "@material-tailwind/react";
import useDocumentTitle from "../hooks/useDocumantTitle.js";

const RegisterPage = () => {
  const loading = useSelector((state) => state.user.loading);
  const serverError = useSelector((state) => state.user.serverError);
  const dispatch = useDispatch();
  useDocumentTitle("Register");

  useEffect(() => {
    dispatch(resetServerError());
  }, [dispatch]);


  const {
    register,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userData) => {
    dispatch(createUserAsync(userData));
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Register</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label className="block" htmlFor="name">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              {...register("username", { required: "Username is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
              onChange={() => clearErrors("server")}
            />
            {errors.username && (
              <p className="text-red-600">{errors.username.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block" htmlFor="email">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format",
                },
              })}
              onChange={() => clearErrors("server")}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            {errors.email && (
              <p className="text-red-600">{errors.email.message}</p>
            )}
          </div>

          <div className="mt-4">
            <label className="block" htmlFor="password">
              Password
            </label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters",
                },
              })}
              onChange={() => clearErrors("server")}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            {errors.password && (
              <p className="text-red-600">{errors.password.message}</p>
            )}
          </div>
          <Button
              loading={loading}
              type="submit"
              size="md"
              color="green"
              className="mt-4"
            >
              Register
            </Button>     
          {serverError && (
            <p className="text-red-600">{serverError}</p>
          )}
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
