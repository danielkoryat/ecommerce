import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import useFetch from "../../hooks/useFetch";
import ProductService from "../../api/services/ProductService";
import { errorContext } from "../../errors/errorHandler";
import NoProductsNotification from "../../components/NoProductNotification";
import Spinner from "../../components/Spinner";
import CommentsSection from "./ReviewSection";
import EditProductComponent from "./EditProduct";
import { useSelector, useDispatch } from "react-redux";
import { setAlert } from "../../app/alertSlice";
import ProductDisplay from "./ProductDisplay";

const PATH_TO_DEFAULT_IMAGE = "../../../public/images/default-product-image.png"; 

const ProductPage = () => {
  const { productId } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  
  const { id, isAuthenticated } = useSelector((state) => state.user);
  const [product, setProduct] = useState(null);
  const [isEditing, setIsEditing] = useState(false);

  const { loading, fetchData } = useFetch(
    ProductService.getProductById,
    errorContext.product
  );

  const {
    loading: deleteLoading,
    error: deleteError,
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
      dispatch(setAlert({ type: "error", message: deleteError.message }));
    } else {
      navigate("/shop");
      dispatch(setAlert({ type: "success", message: "Product deleted successfully" }));
    }
  };

  const handleAddToWatchlist = () => {
    // Implementation for adding product to watchlist
  };

  if (loading) return <Spinner />;
  if (!product) return <NoProductsNotification />;

  return (
    <div className="container mx-auto my-8 p-5 bg-white shadow-xl rounded-xl">
      <ProductDisplay
        product={product}
        isEditing={isEditing}
        setIsEditing={setIsEditing}
        handleDelete={handleDelete}
        deleteLoading={deleteLoading}
        deleteError={deleteError}
        handleAddToWatchlist={handleAddToWatchlist}
        isAuthenticated={isAuthenticated}
        isSeller={id === product?.seller._id}
        pathToDefaultImage={PATH_TO_DEFAULT_IMAGE}
      />
      <EditProductComponent isOpen={isEditing} product={product} />
      <CommentsSection productId={productId} isAuthenticated={isAuthenticated} />
    </div>
  );
};

export default ProductPage;