import Joi from "joi";
import JoiObjectId from "joi-objectid";

export const getProductSchema = () => {
  Joi.objectId = JoiObjectId(Joi);
  const productSchema = Joi.object({
    name: Joi.string().required().trim(),
    seller: Joi.objectId().required(), // Use Joi.objectId() directly after extending Joi
    description: Joi.string().required().trim(),
    price: Joi.number().min(0).required(),
    amount: Joi.number().min(0).required(),
    categories: Joi.array().items(Joi.objectId()).optional(), // Same here, use Joi.objectId()
    images: Joi.array()
      .items(
        Joi.object({
          buffer: Joi.binary().required(), // Assuming you want to store the image data
          mimetype: Joi.string()
            .valid("image/jpeg", "image/png", "image/gif", "image/bmp")
            .required(),
        })
      )
      .optional(),
  });

  return productSchema;
};
