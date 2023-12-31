import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import ProductService from "../api/services/ProductService";
import { errorContext } from "../errors/errorHandler";
import Spinner from "../components/Spinner";
import ProductCard from "../components/ProductCard";
import ErrorNotification from "../components/ErrorNotification";

const ShopPage = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const categories = useSelector((state) => state.category.categories);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const { loading, serverError, fetchData } = useFetch(
    ProductService.getProducts,
    errorContext.product
  );

  const handleCategorySelect = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  const pageNumber = parseInt(searchParams.get("page")) || 0;

  useEffect(() => {
    const getProductsDetails = async () => {
      const data = await fetchData(pageNumber, selectedCategories);
      if (data) {
        const { products, hasMore } = data;
        setProducts(products);
        setHasMore(hasMore);
      }
    };
    getProductsDetails();
  }, [pageNumber, fetchData, selectedCategories]);

  if (serverError) {
    return <div className="text-red-500">{serverError}</div>;
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <h1 className="text-3xl font-bold mb-4 text-center">Shop</h1>
      <div className="flex overflow-x-auto whitespace-nowrap mb-4">
        {categories.map((category) => (
          <button
            key={category.id}
            onClick={() => handleCategorySelect(category._id)}
            className={`px-4 py-2 text-sm font-medium rounded-full transition-colors mr-2
                        ${
                          selectedCategories.includes(category._id)
                            ? "bg-blue-500 text-white"
                            : "bg-gray-200 text-gray-800 hover:bg-blue-500 hover:text-white"
                        }`}
          >
            {category.name}
          </button>
        ))}
      </div>
      {products.length === 0 && selectedCategories.length > 0 ? (
        <ErrorNotification
          title="No products found"
          message="Try different categories"
        />
      ) : (
        <>
          <div
            className={`grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4`}
          >
            {products.map((product, i) => (
              <ProductCard product={product} key={i} />
            ))}
          </div>
          <div className="flex justify-center mt-8">
            <button
              onClick={() => setSearchParams({ page: pageNumber - 1 })}
              disabled={pageNumber === 0}
              className={`px-6 py-2 text-white font-semibold rounded-md mr-4 ${
                pageNumber === 0
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              Previous
            </button>
            <button
              onClick={() => setSearchParams({ page: pageNumber + 1 })}
              disabled={!hasMore}
              className={`px-6 py-2 text-white font-semibold rounded-md ${
                !hasMore
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
            >
              Next
            </button>
          </div>
        </>
      )}
    </>
  );
};

export default ShopPage;
