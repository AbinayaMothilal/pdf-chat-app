const express = require("express");
const router = express.Router();

const pdfService = require("../services/pdfService");

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        error: "No file uploaded",
      });
    }

    const result = await pdfService.extractTextFromPDF(req.file.path);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      characters: result.text.length,
      totalChunks: result.chunks.length,
      // chunks: result.chunks,
    });
  } catch (error) {
    console.error("Upload/PDF extraction error:", error);

    res.status(500).json({
      success: false,
      message: "Failed to extract text from PDF",
      error: error.message,
    });
  }
});

module.exports = router;