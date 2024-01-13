import { BlobServiceClient } from "@azure/storage-blob";

const AZURE_STORAGE_CONNECTION_STRING =
  process.env.AZURE_STORAGE_CONNECTION_STRING;
const CONTAINER_NAME = process.env.CONTAINER_NAME;

export const uploadImagesToAzure = async (
  images,
  recivedConnectionString = AZURE_STORAGE_CONNECTION_STRING,
  recivedContainerName = CONTAINER_NAME
) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    recivedConnectionString
  );
  const containerClient =
    blobServiceClient.getContainerClient(recivedContainerName);

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

export const deleteImagesFromAzure = async (imageUrls) => {
  const blobServiceClient = BlobServiceClient.fromConnectionString(
    AZURE_STORAGE_CONNECTION_STRING
  );
  const containerClient = blobServiceClient.getContainerClient(CONTAINER_NAME);

  let deletePromises = imageUrls.map(async (imageUrl) => {
    try {
      const url = new URL(imageUrl);
      const pathname = url.pathname;
      const blobName = decodeURIComponent(pathname).replace(/^\/ecommarceimages\//, '');
      const blockBlobClient = containerClient.getBlockBlobClient(blobName);
      await blockBlobClient.deleteIfExists();

    } catch (error) {
      // Log error or rethrow with additional information
      console.error(`Failed to delete image ${imageUrl}: ${error.message}`);
      throw new Error(`Failed to delete image: ${error.message}`);
    }
  });

  return Promise.all(deletePromises);
};