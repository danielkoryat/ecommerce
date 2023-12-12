import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductService from "../api/services/ProductService";
import { errorContext } from "../errors/errorHandler";
import Spinner from "../components/spinner";
import NoProductsNotification from "../components/NoProductNotification";
import CommentsSection from "../components/CommentsSection"; // Assuming you have a CommentsSection component

const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const { loading, serverError, fetchData } = useFetch(
    ProductService.getProductById,
    errorContext.product
  );
  const isSeller = true; 
  //TODO find a global way to acsess this
  const pathToDefoultImage = "../images/default-product-image.png";

  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchData(productId);
      setProduct(data);
    };

    getProduct();
  }, [productId]);

  const handleDelete = async () => {
    //TODO Implement delete functionality
  };

  const handleEdit = () => {
    navigate(`/edit-product/${productId}`);
  };

  if (loading) return <Spinner />;
  if (!product) return <NoProductsNotification />;

  return (
    <div className="container mx-auto my-8 p-5 bg-white shadow-xl rounded-xl">
           {" "}
      <div className="flex flex-col md:flex-row">
               {" "}
        <div className="md:w-1/2">
                   {" "}
          <img
            src={product.imageUrls[0] ? product.imageUrls[0] : pathToDefoultImage} // Assuming the product object has an imageUrl field
            alt={product.name}
            className="rounded-lg mb-4 md:mb-0"
          />
                 {" "}
        </div>
               {" "}
        <div className="md:w-1/2 md:pl-8">
                    <h1 className="text-4xl font-bold mb-4">{product.name}</h1> 
                 {" "}
          <p className="text-gray-700 text-lg mb-4">{product.description}</p>   
               {" "}
          <p className="text-gray-800 font-semibold">
                        Price:{" "}
            <span className="text-green-500">${product.price}</span>         {" "}
          </p>
                   {" "}
          <p className="text-gray-800 font-semibold">
                        Amount:{" "}
            <span className="text-blue-500">{product.amount}</span>         {" "}
          </p>
                   {" "}
          <p className="text-gray-600 text-sm mb-4">
                        Created At:{" "}
            {new Date(product.createdAt).toLocaleDateString()}         {" "}
          </p>
                   {" "}
          {isSeller && (
            <div className="flex justify-end mt-4">
                           {" "}
              <button
                onClick={handleEdit}
                className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 transition-colors"
              >
                                Edit              {" "}
              </button>
                           {" "}
              <button
                onClick={handleDelete}
                className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
              >
                                Delete              {" "}
              </button>
                         {" "}
            </div>
          )}
                 {" "}
        </div>
             {" "}
      </div>
      {/* ... rest of the product details above ... */}
      {/* Comments Section */}
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Customer Reviews</h2>
        <CommentsSection productId={productId} />
      </div>
    </div>
  );
};

export default ProductPage;
