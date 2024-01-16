import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../hooks/useFetch";
import ProductService from "../api/services/ProductService";
import { errorContext } from "../errors/errorHandler";
import ErrorNotification from "../components/shared/ErrorNotification";
import Spinner from "../components/shared/spinner";
import CommentsSection from "../components/ProductPage/ReviewSection";
import EditProductComponent from "../components/ProductPage/EditProduct";
import { useSelector, useDispatch } from "react-redux";
import ProductDisplay from "../components/ProductPage/ProductDisplay";
import useAlert from "../hooks/useAlert";
import useDocumentTitle from "../hooks/useDocumantTitle";

const ProductPageContainer = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const  setAlert  = useAlert();
  
  
  const { id, isAuthenticated } = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  useDocumentTitle(`Product | ${product?.name || "Product"}`);
  const [isEditing, setIsEditing] = useState(false);

  const { loading, fetchData } = useFetch(
    ProductService.getProductById,
    errorContext.product
  );

  const {
    loading: deleteLoading,
    serverError: deleteError,
    fetchData: deleteProduct,
  } = useFetch(ProductService.deleteProduct, errorContext.product);


  useEffect(() => {
    const getProduct = async () => {
      const data = await fetchData(productId);
      setProduct(data);
    };

    getProduct();
  }, [productId, fetchData]);

  const handleDelete = async () => {
    const data = await deleteProduct(productId);
    if (!data) {
      setAlert({ type: "error", message: deleteError.message });

    } else {
      navigate("/shop");
      setAlert({ type: "success", message: "Product deleted successfully" });
    }
  };

  if (loading) return <Spinner />;
  if (!product) return <ErrorNotification />;

  return (
    <div className="container mx-auto my-8 p-5 bg-white shadow-xl rounded-xl">
      <ProductDisplay
        product={product}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleDelete={handleDelete}
        deleteLoading={deleteLoading}
        deleteError={deleteError}
        isAuthenticated={isAuthenticated}
        isSeller={id === product?.seller._id}
      />
      <EditProductComponent isOpen={isEditing} product={product} />
      <CommentsSection productId={productId} isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default ProductPageContainer;


