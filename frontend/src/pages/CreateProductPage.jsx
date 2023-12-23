import React, { useState, useEffect } from "react";
import { useForm, Controller } from "react-hook-form";
import Select from "react-select";
import productService from "../api/services/ProductService";
import { errorContext } from "../errors/errorHandler";
import Spinner from "../components/Spinner";
import usefetch from "../hooks/useFetch";
import { useSelector } from "react-redux";

export default function CreateProductPage() {
  const [secsessMessage, setSuccessMessage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const { categories } = useSelector((state) => state.category.categories);
  const { loading, serverError, fetchData, clearServerError } = usefetch(
    productService.createProduct,
    errorContext.product
  );

  const handleCategoryChange = (selectedOptions) => {
    setSelectedCategories(selectedOptions);
    setValue(
      "categories",
      selectedOptions.map((option) => option.value)
    );
  };

  const {
    register,
    setValue,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (formData) => {
    const productData = new FormData();
    for (const [key, value] of Object.entries(formData)) {
      if (key === "images") {
        Array.from(value).forEach((file) => {
          productData.append(key, file);
        });
      } else if (key === "categories" && Array.isArray(value)) {
        // Append each category value separately
        value.forEach((category) => {
          productData.append(`${key}[]`, category);
        });
      } else {
        productData.append(key, value);
      }
    }
    const data = await fetchData(productData);
    if (data) {
      setSuccessMessage("Product created successfully");
      reset();
    }
  };

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Name
          </label>
          <input
            id="name"
            name="name"
            type="text"
            {...register("name", {
              required: true,
              onChange: () => clearServerError(),
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product name"
          />
          {errors.name && (
            <p className="text-red-500">Product name is required.</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            {...register("description", {
              required: true,
              onChange: () => clearServerError(),
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product description"
          ></textarea>
          {errors.description && (
            <p className="text-red-500">Product description is required.</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="price"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price
          </label>
          <input
            id="price"
            name="price"
            type="number"
            step="0.01"
            {...register("price", {
              required: true,
              onChange: () => clearServerError(),
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="0.00"
          />
          {errors.price && <p className="text-red-500">Price is required.</p>}
        </div>

        <div className="mb-4">
          <label
            htmlFor="amount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Amount
          </label>
          <input
            id="amount"
            name="amount"
            type="number"
            {...register("amount", {
              required: true,
              onChange: () => clearServerError(),
            })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter amount"
          />
          {errors.productAmount && (
            <p className="text-red-500">Amount is required.</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="categories"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>

          <Select
            isMulti
            options={categories.map((cat) => ({
              label: cat.name,
              value: cat._id,
            }))}
            className="text-gray-700 leading-tight"
            classNamePrefix="select"
            value={selectedCategories}
            onChange={handleCategoryChange}
          />
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label
            htmlFor="images"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Images
          </label>
          <input
            type="file"
            id="images"
            name="images"
            multiple
            {...register("images")}
            className="w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded-full file:border-0
            file:text-sm file:font-semibold
            file:bg-violet-50 file:text-violet-700
            hover:file:bg-violet-100
            "
            accept="image/*"
          />
        </div>

        {/* Submit Button */}
        <div className="flex items-center justify-between">
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          >
            Create Product
          </button>
        </div>
        {loading && <Spinner />}
        {/* Error Message */}
        {serverError && <p className="text-red-500">{serverError}</p>}
        {secsessMessage && <p className="text-green-500">{secsessMessage}</p>}
      </form>
    </div>
  );
}
