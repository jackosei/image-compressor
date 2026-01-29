const tinify = require("tinify");
require("dotenv").config();

// Initialize Tinify with the API key
function initTinify() {
  const key = process.env.TINIFY_KEY;
  if (!key || key === "your_api_key_here") {
    console.error("Error: TINIFY_KEY is missing or invalid in .env file.");
    return false;
  }
  tinify.key = key;
  return true;
}

/**
 * Compress an image from a buffer.
 * @param {Buffer} buffer - The image buffer.
 * @returns {Promise<Buffer>} - The compressed image buffer.
 */
async function compressImageBuffer(buffer) {
  if (!initTinify()) throw new Error("Tinify API key not configured.");

  try {
    const source = tinify.fromBuffer(buffer);
    const result = await source.toBuffer();
    return result;
  } catch (err) {
    console.error("Compression error:", err);
    throw err;
  }
}

/**
 * Compress an image from a file path and save to destination.
 * @param {string} sourcePath - Path to the source image.
 * @param {string} destPath - Path to save the compressed image.
 */
async function compressFile(sourcePath, destPath) {
  if (!initTinify()) throw new Error("Tinify API key not configured.");

  try {
    const source = tinify.fromFile(sourcePath);
    await source.toFile(destPath);
    console.log(`Compressed: ${sourcePath} -> ${destPath}`);
  } catch (err) {
    console.error(`Error compressing ${sourcePath}:`, err.message);
  }
}

module.exports = {
  compressImageBuffer,
  compressFile,
  initTinify,
};
