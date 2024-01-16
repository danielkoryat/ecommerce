import { useLocation } from "react-router-dom";
import { errorContext } from "../errors/errorHandler";
import ProductService from "../api/services/ProductService";
import useFetch from "../hooks/useFetch";
import { useEffect, useState } from "react";
import ProductCard from "../components/shared/ProductCard";
import Spinner from "../components/shared/spinner";
import ErrorNotification from "../components/shared/ErrorNotification";
import useDocumentTitle from "../hooks/useDocumantTitle";

const SearchPage = () => {
  const query = useQuery();
  const searchValue = query.get("query");
  const [products, setProducts] = useState([]);
  useDocumentTitle(`Search | ${searchValue}`);

  const {
    fetchData: searchProducts,
    loading,
    serverError,
  } = useFetch(ProductService.searchProductByName, errorContext.search);

  useEffect(() => {
    const search = async () => {
      const data = await searchProducts(searchValue);
      if (data) {
        setProducts(data);
      }
    };
    search();
  }, [searchValue]);

  return (
    <div className="container mx-auto p-6">
    <h1 className="text-3xl font-bold mb-8" style={{ color: "green" }}>
      Search Results
    </h1>
    {loading ? (
      <Spinner />
    ) : products.length > 0 ? (
      <>
        <p>Found {products.length} products</p>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </>
    ) : serverError ? (
      <ErrorNotification title="Server Error" message={serverError} />
    ) : (
      <ErrorNotification
        title={"No products found"}
        message="Try searching for something else"
      />
    )}
  </div>
  );
};

export default SearchPage;

function useQuery() {
  return new URLSearchParams(useLocation().search);
}
