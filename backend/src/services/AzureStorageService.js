import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.CONTAINER_NAME;

export const uploadImagesToAzure = async (images) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

  let uploadPromises = images.map(async (image, index) => {
    const blobName = `products/${Date.now()}-${image.originalname}-${index}`;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const uploadBlobResponse = await blockBlobClient.upload(
      image.buffer,
      image.buffer.length
    );
    if (uploadBlobResponse.errorCode) {
      throw new Error(
        `Failed to upload image: ${uploadBlobResponse.errorCode}`
      );
    }
    return blockBlobClient.url;
  });

  return Promise.all(uploadPromises);
};
