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
    const url = new URL(imageUrl);
    const pathname = url.pathname;
    const containerName = 'ecommarceimages/'; 
    const blobName = pathname.includes(containerName) ? pathname.split(containerName)[1] : null;
    const blockBlobClient = containerClient.getBlockBlobClient(blobName);
    const deleteBlobResponse = await blockBlobClient.deleteIfExists();
    if (deleteBlobResponse.errorCode) {
      throw new Error(
        `Failed to delete image: ${deleteBlobResponse.errorCode}`
      );
    }
  });
  return Promise.all(deletePromises);
};
