import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Select from "react-select";
import productService from "../api/services/ProductService";
import { errorContext } from "../errors/errorHandler";
import usefetch from "../hooks/useFetch";
import { useSelector } from "react-redux";
import TextAreaField from "../components/TextAreaField";
import InputField from "../components/InputField";
import { Button,Typography } from "@material-tailwind/react";

export default function CreateProductPage() {
  const [successMessage, setSuccessMessage] = useState(null);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const categories = useSelector((state) => state.category.categories);
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
      clearServerError();
    }
  };

  return (
    <>
    <Typography variant="h3" >Create Product</Typography>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4"
      >
        <InputField
        label="Product Name"
        error={errors.name}
        register={register}
        id="name"
        type="text"
        step="0.01"
        placeholder="Enter product name"
      />
        <TextAreaField
          label="Description"
          error={errors.description}
          register={register}
          id="description"
        />
        <InputField
          label="Price"
          error={errors.price}
          register={register}
          id="price"
          type="number"
          step="0.01"
          placeholder="0.00"
        />
        <InputField
          label="Amount"
          error={errors.amount}
          register={register}
          id="amount"
          type="number"
          placeholder="Enter amount"
        />

        {/* Category Select - Assuming you're using a Tailwind wrapped react-select component */}
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2">
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
        <Button
              loading={loading}
              type="submit"
              size="md"
              color="green"
              className="mt-4"
            >
            Create Product
          </Button>
        </div>
        {/* Error Message */}
        {serverError && <p className="text-red-500">{serverError}</p>}
        {successMessage && <p className="text-green-500">{successMessage}</p>}
      </form>
    </>
  );
}
