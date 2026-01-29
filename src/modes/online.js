const express = require("express");
const multer = require("multer");
const path = require("path");
const { compressImageBuffer } = require("../services/tinifyService");

const router = express.Router();
const storage = multer.memoryStorage();
const upload = multer({
  storage: storage,
  limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
});

router.post("/compress", upload.single("image"), async (req, res) => {
  if (!req.file) {
    return res.status(400).json({ error: "No image file provided." });
  }

  try {
    console.log(
      `Received upload: ${req.file.originalname} (${req.file.size} bytes)`,
    );
    const targetFormat = req.body.format || "original";
    console.log(`Converting to: ${targetFormat}`);

    const compressedBuffer = await compressImageBuffer(
      req.file.buffer,
      targetFormat,
    );
    console.log(`Compressed successfully.`);

    // Determine content type and extension
    let mimeType = req.file.mimetype;
    let ext = path.extname(req.file.originalname).slice(1); // default extension (no dot)

    if (targetFormat === "image/png") {
      mimeType = "image/png";
      ext = "png";
    } else if (targetFormat === "image/jpeg") {
      mimeType = "image/jpeg";
      ext = "jpg";
    } else if (targetFormat === "image/webp") {
      mimeType = "image/webp";
      ext = "webp";
    } else if (targetFormat === "image/avif") {
      mimeType = "image/avif";
      ext = "avif";
    }

    res.set("Content-Type", mimeType);
    res.set(
      "Content-Disposition",
      `attachment; filename="compressed_${path.parse(req.file.originalname).name}.${ext}"`,
    );
    res.send(compressedBuffer);
  } catch (error) {
    console.error("Compression failed:", error);
    res.status(500).json({ error: "Image compression failed." });
  }
});

module.exports = router;
