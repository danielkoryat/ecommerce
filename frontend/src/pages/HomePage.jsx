import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "@material-tailwind/react";
import useDocumentTitle from "../hooks/useDocumantTitle";
import { useEffect, useState } from "react";
import useFetch from "../hooks/useFetch";
import ProductService from "../api/services/ProductService";
import { errorContext } from "../errors/errorHandler";
import Spinner from "../components/shared/Spinner";
import ProductCard from "../components/shared/ProductCard";

const HomePage = () => {
  useDocumentTitle("Home");
  const [products, setProducts] = useState([]);
  const {
    fetchData: fetchProducts,
    serverError,
    loading,
  } = useFetch(ProductService.getRecentProducts, errorContext.product);
  const numberOfProducts = 3;

  useEffect(() => {
    const fetchPageData = async () => {
      const data = await fetchProducts(numberOfProducts);
      if (Array.isArray(data)) {
        setProducts(data);
      }
    };
    fetchPageData();
  }, []);
  return (
    <div>
      {/* Carousel */}
      <section>
        <Carousel
          transition={{ duration: 0.5 }}
          className="rounded-xs  h-64 mx-auto"
        >
          <img
            src="https://images.unsplash.com/photo-1497436072909-60f360e1d4b1?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2560&q=80"
            alt="image 1"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1493246507139-91e8fad9978e?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2940&q=80"
            alt="image 2"
            className="h-full w-full object-cover"
          />
          <img
            src="https://images.unsplash.com/photo-1518623489648-a173ef7824f3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2762&q=80"
            alt="image 3"
            className="h-full w-full object-cover"
          />
        </Carousel>
      </section>

      {/* Welcome section */}
      <section className="text-center py-12">
        <h2 className="text-4xl font-bold text-gray-800">
          Welcome to Our E-commerce Store
        </h2>
        <p className="text-gray-600 mt-4">
          Find the best products at unbeatable prices.
        </p>
      </section>

      {/* Products section */}
      <section className="container mx-auto py-12">
        {loading ? (
          <Spinner />
        ) : (
          <>
            <h3 className="text-3xl font-bold text-center text-gray-800">
              Our Leading Products
            </h3>
            {serverError ? (
              <p className="text-center text-red-500">{serverError}</p>
            ) : products.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-6">
                {products.map((product) => (
                  <ProductCard key={product.id} product={product} isSmall/>
                ))}
              </div>
            ) : (
              <p className="text-center text-gray-600">No products found</p>
            )}
          </>
        )}
      </section>

      {/* Features section */}
      <section className="bg-gray-100 py-12">
        <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
          <FeatureCard
            icon="🚚"
            title="Free Shipping"
            description="On orders over $50"
          />
          <FeatureCard
            icon="🔒"
            title="Secure Payment"
            description="100% secure payment"
          />
          <FeatureCard
            icon="🔄"
            title="Easy Returns"
            description="30-day return policy"
          />
        </div>
      </section>
    </div>
  );
};



const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-4">
    <span className="text-6xl">{icon}</span>
    <h4 className="text-xl font-bold mt-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default HomePage;
