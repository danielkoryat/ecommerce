import React from "react";
import { useNavigate } from "react-router-dom";
import useWatchlist from "../hooks/useWatchlist";
import { useSelector } from "react-redux";
import useFetch from "../hooks/useFetch";
import ProductService from "../api/services/ProductService";
import setAlert from "../app/alertSlice";
import { errorContext } from "../errors/errorHandler";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import defaultProductImage from "../assets/images/default-product-image.png";
import useAlert from "../hooks/useAlert";

const ProductCard = React.memo(
  ({
    product: { _id, imageUrls, name, price, description, seller },
    isAuthenticated,
  }) => {
    const navigate = useNavigate();
    const {
      addToWatchlist,
      isInWatchlist,
      removeFromWatchlist,
      loading: watchlistLoading,
    } = useWatchlist(_id);

    const {
      loading: deleteLoading,
      serverError,
      fetchData: deleteProduct,
    } = useFetch(ProductService.deleteProduct, errorContext.product);

    const setSlert = useAlert();

    const imageUrl = imageUrls[0] || defaultProductImage;
    const altText = `Product image for ${name}`;
    const userId = useSelector((state) => state.user.id);
    const isSeller = userId === seller;

    const handleNavigate = () => navigate(`/products/${_id}`);

    const handleRemoveProduct = async () => {
      try {
        await deleteProduct(_id);
        setSlert("success", "Product deleted successfully");
      } catch (error) {
        setSlert("error", serverError);
      }
    }

    return (
      <Card className="w-96 flex flex-col">
        <CardHeader shadow={false} floated={false} className="h-96">
          <img
            src={imageUrl}
            alt={altText}
            className="h-full w-full object-cover cursor-pointer"
            onClick={handleNavigate}
          />
        </CardHeader>
        <CardBody className="flex-grow">
          <div className="mb-2 flex items-center justify-between">
            <Typography color="blue-gray" className="font-medium">
              {name}
            </Typography>
            <Typography color="blue-gray" className="font-medium">
              ${price}
            </Typography>
          </div>
          <Typography
            variant="small"
            color="gray"
            className="font-normal opacity-75"
          >
            {description}
          </Typography>
        </CardBody>
        {isAuthenticated && (
          <CardFooter className="pt-0">
            {isSeller ? (
              <Button
                loading={false}
                ripple={false}
                fullWidth={true}
                className="bg-red-500/10 text-red-500 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                onClick={() => setSlert("success", "Product deleted successfully")}
              >
                Delete Product
              </Button>
            ) : isInWatchlist ? (
              <Button
                loading={watchlistLoading}
                ripple={false}
                fullWidth={true}
                className="bg-red-500/10 text-red-500 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                onClick={() => removeFromWatchlist(_id)}
              >
                Remove from Watchlist
              </Button>
            ) : (
              <Button
                loading={watchlistLoading}
                ripple={false}
                fullWidth={true}
                className="bg-blue-500/10 text-blue-500 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
                onClick={() => addToWatchlist(_id)}
              >
                Add to Watchlist
              </Button>
            )}
          </CardFooter>
        )}
      </Card>
    );
  }
);

export default ProductCard;
