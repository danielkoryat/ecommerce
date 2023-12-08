import React, { useState, useEffect } from "react";
import userservice from "../api/services/UserService.js"
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { getErrorMessage, errorContext } from "../errors/errorHandler.js";
import Spinner from "../components/spinner";
import { loginUser } from "../app/userSlice.js";
import { useSelector, useDispatch } from "react-redux";

const RegisterPage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/home");
    }
    document.title = "Register";
  }, []);

  const {
    register,
    setError,
    clearErrors,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (userData) => {
    try {
      setIsLoading(true);
      const data = await userservice.createUser(userData);
      if (data) {
        dispatch(loginUser(data));
        navigate("/");
      }
      console.log(userData);
    } catch (error) {
      console.error(error);
      setError("server", {
        type: "manual",
        message: getErrorMessage(error.response, errorContext.register),
      });
    } finally {
      setIsLoading(false);
    }
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

          <div className="flex items-baseline justify-between">
            <button
              type="submit"
              className="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-blue-900"
            >
              Register
            </button>
          </div>
          {errors.server && (
            <p className="text-red-600">{errors.server.message}</p>
          )}
        </form>
        {isLoading && <Spinner />}
      </div>
    </div>
  );
};

export default RegisterPage;
