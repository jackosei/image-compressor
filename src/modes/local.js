const chokidar = require("chokidar");
const path = require("path");
const fs = require("fs");
const { compressFile } = require("../services/tinifyService");

function startLocalMode() {
  const uploadDir = path.resolve(__dirname, "../../uploads");
  const convertedDir = path.resolve(__dirname, "../../converted");

  // Ensure directories exist
  if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });
  if (!fs.existsSync(convertedDir))
    fs.mkdirSync(convertedDir, { recursive: true });

  console.log(`Starting Local Mode...`);
  console.log(`Watching for images in: ${uploadDir}`);
  console.log(`Compressed results will be in: ${convertedDir}`);

  const watcher = chokidar.watch(uploadDir, {
    persistent: true,
    ignoreInitial: true,
    depth: 0,
    awaitWriteFinish: {
      stabilityThreshold: 1000,
      pollInterval: 100,
    },
  });

  watcher
    .on("add", (filePath) => {
      const fileName = path.basename(filePath);
      // Basic image extension check
      if (!/\.(jpg|jpeg|png|webp)$/i.test(fileName)) {
        console.log(`Ignoring non-image file: ${fileName}`);
        return;
      }

      console.log(`New file detected: ${fileName}`);
      const destPath = path.join(convertedDir, fileName);

      compressFile(filePath, destPath);
    })
    .on("error", (error) => console.error(`Watcher error: ${error}`));
}

module.exports = { startLocalMode };
