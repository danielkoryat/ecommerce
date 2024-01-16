import React from "react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Carousel } from "@material-tailwind/react";
import useDocumentTitle from "../hooks/useDocumantTitle";

const HomePage = () => {
  useDocumentTitle("Home");
  return (
    <div>
      {/* Carousel */}
      <section>
        <Carousel transition={{ duration: 0.5 }} className="rounded-xs  h-64 mx-auto">
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

      {/* Categories section */}
      <section className="container mx-auto py-12">
        <h3 className="text-3xl font-bold text-center text-gray-800">
          Shop by Category
        </h3>
        <div className="flex flex-wrap justify-center gap-4 mt-8">
          {/* TODO: Replace with actual categories and links */}
          <CategoryCard
            title="Electronics"
            imageUrl="https://www.parkerpawn.com/wp-content/uploads/2023/08/electronic-gadgets.jpeg"
          />
          <CategoryCard
            title="Home & Garden"
            imageUrl="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSEM8oHy-0gFKhYuYxK4tRf20-RryVPdquWOA&usqp=CAU"
          />
        </div>
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

// CategoryCard component placeholder
const CategoryCard = ({ title, imageUrl }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <img className="w-full" src={imageUrl} alt={title} />
    <div className="px-6 py-4">
      <div className="font-bold text xl text-center">{title}</div>
    </div>
  </div>
);

// FeatureCard component placeholder
const FeatureCard = ({ icon, title, description }) => (
  <div className="text-center p-4">
    <span className="text-6xl">{icon}</span>
    <h4 className="text-xl font-bold mt-2">{title}</h4>
    <p className="text-gray-600">{description}</p>
  </div>
);

export default HomePage;
