import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { errorContext } from "../errors/errorHandler";
import useFetch from "../hooks/useFetch";
import { Spinner } from "@material-tailwind/react";
import ProductsSection from "../components/DashboardPage/ProductsSections";
import UserInfoSection from "../components/DashboardPage/UserInfoSection";
import UserStatsSection from "../components/DashboardPage/UserStatsSection";
import ErrorNotification from "../components/shared/ErrorNotification";
import ProductService from "../api/services/ProductService";
import useDocumentTitle from "../hooks/useDocumantTitle";
const DashboardPage = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user);
  const [products, setProducts] = useState([]);

  const {
    loading: loadingProducts,
    serverError,
    fetchData: fetchUserProducts,
  } = useFetch(ProductService.getUserProducts, errorContext.product);

  useDocumentTitle(`Dashboard | ${user.username}`);
  useEffect(() => {
    const getProducts = async () => {
      const data = await fetchUserProducts();
      setProducts(data);
    };

    getProducts();
  }, [user.id]);

  return loadingProducts ? (
    <Spinner />
  ) : serverError ? (
    <ErrorNotification
      title="server error"
      message={serverError}
    />
  ) : (
    <div className="container mx-auto p-6">
      <h1 className="text-3xl font-bold mb-8" style={{ color: "green" }}>
        Dashboard
      </h1>
      <p>{serverError}</p>
      <ProductsSection
        products={products}
        isAuthenticated={user.isAuthenticated}
        setProducts={setProducts}
      />
      <UserInfoSection userInfo={user} />
      <UserStatsSection products={products} />
    </div>
  );
};

export default DashboardPage;
