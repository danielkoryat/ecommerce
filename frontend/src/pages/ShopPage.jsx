import { useState, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import ProductService from "../api/services/ProductService";
import { errorContext } from "../errors/errorHandler";
import ProductCard from "../components/ProductCard";
import ErrorNotification from "../components/ErrorNotification";
import Spinner from "../components/spinner";

const ShopPage = () => {
  const categories = useSelector((state) => state.category.categories);
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [products, setProducts] = useState([]);
  const [hasMore, setHasMore] = useState(true);
  const pageNumber = parseInt(searchParams.get("page")) || 0;
  const { loading, serverError, fetchData } = useFetch(
    ProductService.getProducts,
    errorContext.product
  );

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

  const handleProductDelete = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product._id !== productId)
    );
  };

  const handleCategorySelect = (category) => {
    setSelectedCategories((prevSelectedCategories) =>
      prevSelectedCategories.includes(category)
        ? prevSelectedCategories.filter((c) => c !== category)
        : [...prevSelectedCategories, category]
    );
  };

  if (serverError) {
    return (
      <ErrorNotification
        title="server error accessing products"
        message={serverError}
      />
    );
  }

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <section>
        <h1 className="text-2xl sm:text-3xl font-bold mb-4 text-center">
          Shop
        </h1>
        <div className="flex flex-wrap justify-center gap-2 mb-4">
          {categories.map((category, i) => (
            <button
              key={i}
              onClick={() => handleCategorySelect(category._id)}
              className={`px-3 py-1 sm:px-4 sm:py-2 text-xs sm:text-sm font-medium rounded-full transition-colors
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
      </section>
      {products.length === 0 && selectedCategories.length > 0 ? (
        <ErrorNotification
          title="No products found"
          message="Try different categories"
        />
      ) : (
        <>
          <section>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
              {products.map((product, i) => (
                <ProductCard
                  onDelete={handleProductDelete}
                  product={product}
                  isAuthenticated={isAuthenticated}
                  key={i}
                />
              ))}
            </div>
            <div className="flex justify-center mt-8 space-x-4">
              <button
                onClick={() => setSearchParams({ page: pageNumber - 1 })}
                disabled={pageNumber === 0}
                className={`px-4 py-2 text-white font-semibold rounded-md 
                ${
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
                className={`px-4 py-2 text-white font-semibold rounded-md 
              ${
                !hasMore
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-blue-500 hover:bg-blue-700"
              }`}
              >
                Next
              </button>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default ShopPage;
