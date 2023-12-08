import React from "react";

const AboutUsPage = () => {
  return (
    <div className="bg-white">
      {/* Hero Section */}
      <div className="text-center py-16 bg-gray-200">
        <h1 className="text-5xl font-bold text-gray-800">About Us</h1>
        <p className="text-xl text-gray-600 mt-4">
          Our journey and where we're heading
        </p>
      </div>

      {/* Our Story Section */}
      <div className="container mx-auto px-6 py-10">
        <h2 className="text-3xl font-semibold text-gray-800">Our Story</h2>
        <div className="mt-6 text-gray-700 space-y-4">
          <p>
            Since our inception, we've been driven by a desire to create a more
            connected and accessible world of commerce. Our team works
            tirelessly to ensure that the products we offer are not only of the
            highest quality but also bring innovation and creativity to our
            customers' lives.
          </p>
          <p>
            As we continue to grow, our focus remains on building a sustainable
            and customer-centric business. We're dedicated to improving the
            e-commerce experience, one satisfied customer at a time.
          </p>
        </div>
        <img
          className="mx-auto my-10 h-64 w-auto"
          src="https://placekitten.com/720/400"
          alt="Our Journey"
        />
      </div>

      {/* Values Section */}
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Our Values
          </h2>
          <div className="flex flex-wrap mt-10 -mx-4 text-center">
            <div className="w-full md:w-1/3 px-4">
              <h3 className="text-xl font-semibold text-gray-700">Integrity</h3>
              <p className="mt-2 text-gray-600">
                We do the right thing, even when no one is watching.
              </p>
            </div>
            <div className="w-full md:w-1/3 px-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Commitment
              </h3>
              <p className="mt-2 text-gray-600">
                We are dedicated to our customers and to each other.
              </p>
            </div>
            <div className="w-full md:w-1/3 px-4">
              <h3 className="text-xl font-semibold text-gray-700">
                Innovation
              </h3>
              <p className="mt-2 text-gray-600">
                We strive to bring new and better products to market.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Mission Section */}
      <div className="bg-gray-100 py-10">
        <div className="container mx-auto px-6">
          <h2 className="text-3xl font-semibold text-center text-gray-800">
            Our Mission
          </h2>
          <p className="text-center text-gray-600 mt-4 max-w-2xl mx-auto">
            Our mission is to revolutionize the e-commerce space by providing
            unique, high-quality products and an unparalleled shopping
            experience.
          </p>
        </div>
      </div>

      {/* Call to Action Section */}
      <div className="container mx-auto px-6 py-10 text-center">
        <h2 className="text-3xl font-semibold text-gray-800">
          Join Our Journey
        </h2>
        <p className="text-gray-600 mt-4">
          Interested in learning more about our products or joining our team?
          Get in touch with us!
        </p>
        <button
          type="button"
          onClick={() => alert("This is not a real company")}
          className="mt-6 inline-block bg-blue-500 text-white text-sm font-semibold px-8 py-3 rounded"
        >
          Contact Us
        </button>
      </div>
    </div>
  );
};

export default AboutUsPage;
