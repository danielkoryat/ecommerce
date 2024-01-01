import React from "react";
import { useNavigate } from "react-router-dom";
import defoultProductImage from '../assets/images/default-product-image.png'
const ProductCard = ({ product }) => {
  const { _id, imageUrls, name, price, description } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${_id}`);
  };

  return (
    <div
      className="max-w-sm rounded overflow-hidden shadow-lg cursor-pointer"
      onClick={handleClick}
    >
      <img
        className="w-full h-64 object-cover object-center"
        src={imageUrls[0] ? imageUrls[0] : defoultProductImage}
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
