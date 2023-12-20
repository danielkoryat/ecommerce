import Joi from "joi";
import JoiObjectId from "joi-objectid";

export const getProductSchema = () => {
  Joi.objectId = JoiObjectId(Joi);

  const imageSchema = Joi.object({
    fieldname: Joi.string().required(),
    originalname: Joi.string().required(),
    encoding: Joi.string().required(),
    mimetype: Joi.string()
      .valid("image/jpeg", "image/png", "image/gif", "image/bmp")
      .required(),
    buffer: Joi.binary().required(),
    size: Joi.number().integer().min(1).required(),
  });

  const productSchema = Joi.object({
    name: Joi.string().required().trim(),
    seller: Joi.objectId().required(),
    description: Joi.string().required().trim(),
    price: Joi.number().min(0).required(),
    amount: Joi.number().min(0).required(),
    categories: Joi.array().items(Joi.objectId()).optional(),
    images: Joi.array().items(imageSchema).optional(),
  });

  return productSchema;
};

export const getRevieScheme = () => {
  Joi.objectId = JoiObjectId(Joi);

  const schema = Joi.object({
    productId:  Joi.objectId().required(),
    rating: Joi.number().required(),
    comment: Joi.string().required(),
    userId:  Joi.objectId().required(),
  });

  return schema;
};
