const express = require("express");
const router = express.Router();

const pdfService = require("../services/pdfService");

const multer = require("multer");
const { getStoredChunks } = require("../services/storeChunksService");
const { getAIAnswer } = require("../services/AIService");

const upload = multer({ dest: "uploads/" });

router.post("/upload", upload.single("pdf"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "No file uploaded",
        error: "No file uploaded",
      });
    }

    const result = await pdfService.extractTextFromPDF(req.file.path);

    res.status(200).json({
      success: true,
      message: "File uploaded successfully",
      fileName: req.file.originalname,
      filePath: req.file.path,
      totalChunks: result.chunksCount,
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

router.post("/ask", async (req, res) => {
  try {
    const { question, filePath } = req.body;

    if (!question) {
      return res.status(400).json({
        success: false,
        message: "No question provided",
        error: "No question provided",
      });
    }

    if (!filePath) {
      return res.status(400).json({
        success: false,
        message: "No file path provided",
        error: "filePath is required",
      });
    }

    const chunks = await getStoredChunks(filePath);

    if (!chunks) {
      return res.status(404).json({
        success: false,
        message: "No document found for the provided file path",
        error: "Invalid or expired filePath. Please upload the PDF again.",
        filePath,
      });
    }
    const result = await getAIAnswer(req.body.question, chunks);
    console.log("Answer generated:", result);

    res.status(200).json({
      success: true,
      message: "Answer generated successfully",
      question: req.body.question,
      answer: result,
    });
  } catch (error) {
    console.error("Error handling /ask request:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process the question",
      error: error.message,
    });
  }
});

module.exports = router;
