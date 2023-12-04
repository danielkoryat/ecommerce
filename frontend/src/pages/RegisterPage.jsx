import React from 'react';
import { useForm } from 'react-hook-form';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm();

  const onSubmit = async (data) => {
    // Submit data to the server
    console.log(data);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="px-8 py-6 mt-4 text-left bg-white shadow-lg">
        <h3 className="text-2xl font-bold text-center">Register</h3>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mt-4">
            <label className="block" htmlFor="name">Name</label>
            <input
              type="text"
              placeholder="Name"
              {...register("name", { required: "Name is required" })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            {errors.name && <p className="text-red-600">{errors.name.message}</p>}
          </div>

          <div className="mt-4">
            <label className="block" htmlFor="email">Email</label>
            <input
              type="email"
              placeholder="Email"
              {...register("email", {
                required: "Email is required",
                pattern: {
                  value: /\S+@\S+\.\S+/,
                  message: "Entered value does not match email format"
                }
              })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            {errors.email && <p className="text-red-600">{errors.email.message}</p>}
          </div>

          <div className="mt-4">
            <label className="block" htmlFor="password">Password</label>
            <input
              type="password"
              placeholder="Password"
              {...register("password", {
                required: "Password is required",
                minLength: {
                  value: 6,
                  message: "Password must have at least 6 characters"
                }
              })}
              className="w-full px-4 py-2 mt-2 border rounded-md focus:outline-none focus:ring-1 focus:ring-green-600"
            />
            {errors.password && <p className="text-red-600">{errors.password.message}</p>}
          </div>

          <div className="flex items-baseline justify-between">
            <button type="submit" className="px-6 py-2 mt-4 text-white bg-green-600 rounded-lg hover:bg-blue-900">
              Register
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;