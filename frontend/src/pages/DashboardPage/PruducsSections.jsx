import ProductCard from "../../components/ProductCard";
const ProductsSection = ({ products, isAuthenticated }) => {
  return (
    <>
      <h2>Your Products</h2>;
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isAuthenticated={isAuthenticated}
          />
        ))}
      </div>
    </>
  );
};

export default ProductsSection;
