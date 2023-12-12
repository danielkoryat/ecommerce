import React from "react";
import { useNavigate } from "react-router-dom";

const ProductCard = ({ product }) => {
  const { _id, imageUrls, name, price } = product;
  const navigate = useNavigate();
  const pathToDefoultImage = "../images/default-product-image.png";

  const handleClick = () => {
    navigate(`/products/${_id}`);
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <img
        className="w-full"
        src={imageUrls[0] ? imageUrls[0] : pathToDefoultImage}
        alt={name}
      />

      <div className="px-6 py-4">
        <div className="font-bold text-xl mb-2">{name}</div>
        <p className="text-gray-700 text-base">${price}</p>
      </div>
    </div>
  );
};

export default ProductCard;
