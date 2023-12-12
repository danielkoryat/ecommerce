import ProductCard from "../components/ProductCard";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import ProductService from "../api/services/ProductService";
import { errorContext } from "../errors/errorHandler";
import NoProductsNotification from "../components/NoProductNotification";
import Spinner from "../components/spinner";
const ShopPage = () => {
  const [page, setPage] = useState(0);
  const [products, setProducts] = useState([]);
  const { loading, serverError, fetchData } = useFetch(
    ProductService.getProducts,
    errorContext.product
  );

  useEffect(() => {
    const getProductsDeatails = async () => {
      const products = await fetchData(page);
      setProducts(products);
    };
    getProductsDeatails();
  },[]);

  if (serverError) return <div className="text-red-900">{serverError}</div>;
  if (loading) return <Spinner />;
  if (products.length === 0) return <NoProductsNotification />;

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Shop</h1>
      <div
        className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 ${
          loading ? "cursor-wait" : ""
        }`}
      >
        {products.map((product, i) => (
          <ProductCard product={product} key={i} />
        ))}
      </div>
    </>
  );
};

export default ShopPage;
