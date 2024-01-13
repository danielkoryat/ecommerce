import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { errorContext } from "../../errors/errorHandler";
import useFetch from "../../hooks/useFetch";
import { Spinner } from "@material-tailwind/react";
import ProductsSection from "./PruducsSections";
import UserInfoSection from "./UserInfoSection";
import UserStatsSection from "./UserStatsSection";
import ProductService from "../../api/services/ProductService";
const DashboardPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);

  const {
    loading: loadingProducts,
    serverError,
    fetchData: fetchUserProducts,
  } = useFetch(ProductService.getUserProducts, errorContext.product);

  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchUserProducts();
      setProducts(data);
    };

    getProducts();
  },[user.id]);

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "green" }}>
        Dashboard
      </h1>
      {loadingProducts ? (
        <Spinner />
      ) : serverError ? (
        <p>{serverError}</p>
      ) : (
        <ProductsSection
          products={products}
          isAuthenticated={user.isAuthenticated}
          setProducts={setProducts}
        />
      )}
      <UserInfoSection userInfo={user} />
      <UserStatsSection products={products} />
    </div>
  );
};

export default DashboardPage;
