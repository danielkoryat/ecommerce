import React from "react";
import { useNavigate } from "react-router-dom";
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Typography,
  Button,
} from "@material-tailwind/react";
import defoultProductImage from '../assets/images/default-product-image.png'
const ProductCard = ({ product,isAuth }) => {
  const { _id, imageUrls, name, price, description } = product;
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(`/products/${_id}`);
  };

  return (
        <Card className="w-96">
          <CardHeader shadow={false} floated={false} className="h-96">
            <img
              src={imageUrls[0] ? imageUrls[0] : defoultProductImage}
              alt="card-image"
              className="h-full w-full object-cover cursor-pointer"
              onClick={handleClick}
            />
          </CardHeader>
          <CardBody>
            <div className="mb-2 flex items-center justify-between">
              <Typography color="blue-gray" className="font-medium">
                {name}
              </Typography>
              <Typography color="blue-gray" className="font-medium">
                {price}$
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
        {isAuth && <CardFooter className="pt-0">
          <Button
            ripple={false}
            fullWidth={true}
            className="bg-blue-gray-900/10 text-blue-gray-900 shadow-none hover:scale-105 hover:shadow-none focus:scale-105 focus:shadow-none active:scale-100"
          >
            Add to Watchlist
          </Button>
        </CardFooter>}
        </Card>
      );
    };

export default ProductCard;
