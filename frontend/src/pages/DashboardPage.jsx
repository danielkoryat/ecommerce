import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { errorContext } from "../errors/errorHandler";
import UserService from "../api/services/UserService";
import useFetch from "../hooks/useFetch";
const DashboardPage = () => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const [userInfo, setUserInfo] = useState({
    email: "user@example.com",
    username: "username",
  });

  const { loading, serverError, fetchData } = useFetch(
    ProductService.getProducts,
    errorContext.product
  )

useEffect(() => {
  
})
  

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "red" }}>
        Dashboard
      </h1>

      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Products</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {products.map((product) => (
            <div
              key={product.id}
              className="border shadow rounded-md p-4"
              style={{ borderColor: "red" }}
            >
              <h3 className="text-xl font-semibold">{product.name}</h3>
              <p className="text-gray-600">{product.description}</p>
              <p className="text-gray-800 font-bold">{product.price}</p>
            </div>
          ))}
        </div>
      </div>

      {/* User Info Section */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">Your Information</h2>
        <div className="flex flex-col">
          <label>Email:</label>
          <input
            type="email"
            name="email"
            value={userInfo.email}
            onChange={handleUserInfoChange}
            className="mb-4 p-2 border rounded"
          />
          <label>Username:</label>
          <input
            type="text"
            name="username"
            value={userInfo.username}
            onChange={handleUserInfoChange}
            className="mb-4 p-2 border rounded"
          />
          <button
            onClick={submitUserInfo}
            className="bg-red-500 text-white font-bold py-2 px-4 rounded"
          >
            Update Info
          </button>
        </div>
      </div>

      {/* Additional sections for other relevant details can be added here */}
      {/* For example, orders, analytics, user profile, etc. */}
      {/* Below is an example of an additional section for user statistics */}
      <div className="mb-6">
        <h2 className="text-2xl font-semibold mb-4">User Statistics</h2>
        <div className="flex flex-col md:flex-row justify-between">
          {/* Mock statistics data, replace with actual data */}
          <div className="mb-4 md:mb-0">
            <span className="block text-lg font-bold">Total Products:</span>
            <span className="block text-xl">{products.length}</span>
          </div>
          <div className="mb-4 md:mb-0">
            <span className="block text-lg font-bold">Total Sales:</span>
            <span className="block text-xl">$0.00</span>{" "}
            {/* Replace with actual sales data */}
          </div>
          <div>
            <span className="block text-lg font-bold">Profile Views:</span>
            <span className="block text-xl">0</span>{" "}
            {/* Replace with actual profile views data */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DashboardPage;
