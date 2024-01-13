import ProductCard from "../../components/ProductCard";
const ProductsSection = ({ products,setProducts, isAuthenticated }) => {

  const handleProductDelete = (productId) => {
    setProducts((currentProducts) =>
      currentProducts.filter((product) => product._id !== productId)
    );
  };
  return products.length === 0 ? <p>No products found</p> : (
    <>
      <h2>Your Products</h2>;
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-0">
        {products.map((product) => (
          <ProductCard
            key={product._id}
            product={product}
            isAuthenticated={isAuthenticated}
            onDelete={handleProductDelete}
            isSmall
          />
        ))}
      </div>
    </>
  );
};

export default ProductsSection;
