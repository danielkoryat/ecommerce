import React from "react";
import { useForm } from "react-hook-form";
import Select from 'react-select';


export default function CreateProductPage() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    console.log(data);
    // Here you would typically handle the form submission,
    // like sending the data to your backend server.
  };

  const categoriesOptions = [
    { value: "electronics", label: "Electronics" },
    { value: "jewelery", label: "Jewelery" },
    { value: "men's clothing", label: "Men's Clothing" },
    { value: "women's clothing", label: "Women's Clothing" },
  ];

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold text-center mb-6">Add New Product</h1>

      <form onSubmit={handleSubmit(onSubmit)} className="max-w-xl mx-auto">
        <div className="mb-4">
          <label
            htmlFor="productName"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Name
          </label>
          <input
            id="productName"
            name="productName"
            type="text"
            {...register("productName", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product name"
          />
          {errors.productName && (
            <p className="text-red-500">Product name is required.</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="productDescription"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Description
          </label>
          <textarea
            id="productDescription"
            {...register("productDescription", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter product description"
          ></textarea>
          {errors.productDescription && (
            <p className="text-red-500">Product description is required.</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="productPrice"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Price
          </label>
          <input
            id="productPrice"
            name="productPrice"
            type="number"
            step="0.01"
            {...register("productPrice", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="0.00"
          />
          {errors.productPrice && (
            <p className="text-red-500">Price is required.</p>
          )}
        </div>

        <div className="mb-4">
          <label
            htmlFor="productAmount"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Amount
          </label>
          <input
            id="productAmount"
            name="productAmount"
            type="number"
            {...register("productAmount", { required: true })}
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            placeholder="Enter amount"
          />
          {errors.productAmount && (
            <p className="text-red-500">Amount is required.</p>
          )}
        </div>
        <div className="mb-4">
          <label
            htmlFor="productCategory"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Category
          </label>
          <Select
            id="productCategory"
            options={categoriesOptions}
            isMulti
            className="text-gray-700 leading-tight"
            classNamePrefix="select"
          />
          {errors.productCategory && (
            <p className="text-red-500 text-xs italic">
              Please select at least one category.
            </p>
          )}
        </div>

        {/* Image Upload */}
        <div className="mb-6">
          <label
            htmlFor="productImages"
            className="block text-gray-700 text-sm font-bold mb-2"
          >
            Product Images
          </label>
          <input
            type="file"
            id="productImages"
            name="productImages"
            multiple
            {...register}
            className="w-full text-sm text-gray-500
              file:mr-4 file:py-2 file:px-4
              file:rounded-full file:border-0
              file:text-sm file:font-semibold
              file:bg-violet-50 file:text-violet-700
              hover:file:bg-violet-100
            "
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
      </form>
    </div>
  );
}
