const express = require("express");
const router = express.Router();

const pdfService = require("../services/pdfService");
const getRelevantChunks =
  require("../services/storeChunksService").getRelevantChunks;

const multer = require("multer");

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
    console.log("received boisydy: ", req.body);
    console.log("Received question:", req.body.question);
    if (!req.body.question) {
      return res.status(400).json({
        success: false,
        message: "No question provided",
        error: "No question provided",
      });
    }

    const result = await getRelevantChunks(req.body.question, 3);

    const answer = result.join(" "); // Combine the top chunks into a single answer

    res.status(200).json({
      success: true,
      message: "Answer generated successfully",
      question: req.body.question,
      answer: answer,
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
