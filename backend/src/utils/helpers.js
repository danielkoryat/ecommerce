/**
 * Processes the request files and maps them into image objects for the database.
 * @param {Object} files - The files object from the request.
 * @return {Array} An array of image objects for the database.
 */
export const prepareImagesForProduct = (files) => {
    let filesArray = [];
  
    if (Array.isArray(files)) {
      filesArray = files;
    } else if (files && typeof files === 'object') {
      filesArray = [files];
    }
  
    const images = filesArray.map((file) => ({
      buffer: file.buffer,
      mimetype: file.mimetype,
    }));
  
    return images;
  }
  