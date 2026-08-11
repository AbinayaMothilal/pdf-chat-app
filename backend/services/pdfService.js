const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse-fork");

// Extract Text from PDF file
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    console.log("PDF parse done, characters:", data.text.length)
    return data.text; 
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw error;
  }
};

module.exports = {
  extractTextFromPDF
};
