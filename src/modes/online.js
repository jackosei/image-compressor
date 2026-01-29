const express = require("express");
const multer = require("multer");
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
    const compressedBuffer = await compressImageBuffer(req.file.buffer);
    console.log(`Compressed successfully.`);

    res.set("Content-Type", req.file.mimetype);
    res.set(
      "Content-Disposition",
      `attachment; filename="compressed_${req.file.originalname}"`,
    );
    res.send(compressedBuffer);
  } catch (error) {
    console.error("Compression failed:", error);
    res.status(500).json({ error: "Image compression failed." });
  }
});

module.exports = router;
