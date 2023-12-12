import React,{useEffect,useState} from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductService from "../api/services/ProductService";
import { errorContext } from "../errors/errorHandler";
const ProductPage = () => {
  const { productId } = useParams();
  const navigate = useNavigate();
  const [product, setProduct] = useState(null);
  const {loading, serverError, fetchData} = useFetch(ProductService.getProductById, errorContext.product);
  const isSeller = true;

  useEffect(() => {
    fetchData(productId);
  }, [productId]);

  const handleDelete = async () => {
  
  };

  const handleEdit = () => {
    navigate(`/edit-product/${productId}`); 
  };

  if (!product) return <div>Loading...</div>;

  if (serverError) return <div className="text-red-900">{serverError}</div>;

  return (
    <div className= {`container mx-auto my-8 p-5 bg-white shadow-lg rounded-lg ${loading ? 'cursor-wait' : ''}`}>
      <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
      <p className="text-gray-700 text-lg mb-4">{product.description}</p>
      <p className="text-gray-800 font-semibold">
        Price: <span className="text-green-500">${product.price}</span>
      </p>
      <p className="text-gray-800 font-semibold">
        Amount: <span className="text-blue-500">{product.amount}</span>
      </p>
      {/* Categories and images would be rendered here */}
      <p className="text-gray-600 text-sm">
        Created At: {new Date(product.createdAt).toLocaleDateString()}
      </p>
      {isSeller && (
        <div className="flex justify-end mt-4">
          <button
            onClick={handleEdit}
            className="bg-blue-500 text-white px-4 py-2 rounded mr-2 hover:bg-blue-700 transition-colors"
          >
            Edit
          </button>
          <button
            onClick={handleDelete}
            className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-700 transition-colors"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default ProductPage;
