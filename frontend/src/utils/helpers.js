export const proccessImagentoUrl = (imageFile) => {
  if (!imageFile) return;
  const base64String = btoa(
    new Uint8Array(imageFile.data.data).reduce(
      (data, byte) => data + String.fromCharCode(byte),
      ""
    )
  );

  const url = `data:${image.contentType};base64,${base64String}`;

  return url;
};
