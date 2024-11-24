const STORAGE_ACCOUNT = "gatiimages";
const CONTAINER_NAME = "gatiiimages-container";
const SAS_TOKEN = "sv=2022-11-02&ss=bfqt&srt=sco&sp=rwdlacupiytfx&se=2070-11-24T08:03:26Z&st=2024-11-24T00:03:26Z&spr=https&sig=GdXylzUkBYPUVGPIxrIDd80%2Fs%2FmDj%2FUlWBc3ae%2FGyDw%3D";

// Base URL for Azure Blob Storage
const AZURE_STORAGE_URL = `https://${STORAGE_ACCOUNT}.blob.core.windows.net/${CONTAINER_NAME}/images`;

/**
 * Gets the full URL for an image from Azure Storage
 * @param {string} imagePath - The path to the image within the container
 * @returns {string} The complete URL to the image
 */
export const getImageUrl = (imagePath) => {
  if (!imagePath) return '';
  
  // Construct the full URL with SAS token
  return `${AZURE_STORAGE_URL}/${imagePath}?${SAS_TOKEN}`;
};