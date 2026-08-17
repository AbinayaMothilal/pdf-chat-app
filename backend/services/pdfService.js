const fs = require("fs");
const path = require("path");
const pdfParse = require("pdf-parse-fork");

const { storeChunks } = require("./storeChunksService");

// Extract Text from PDF file
const extractTextFromPDF = async (filePath) => {
  try {
    const dataBuffer = fs.readFileSync(filePath);
    const data = await pdfParse(dataBuffer);
    console.log("PDF parse done, characters:", data.text.length);
    // Chunk the text into smaller parts
    const chunks = chunkText(data.text, 500);
    // console.log("Text chunking done, chunks:", chunks.length);
    // send filename and chunks to storeChunksService to store in memory - to access correct chunks for the question asked
    const storedChunks = await storeChunks(chunks, filePath);
    return {
      chunks: storedChunks,
      chunksCount: storedChunks.length,
    };
  } catch (error) {
    console.error("Error extracting text from PDF:", error);
    throw error;
  }
};

// Chunk text into smaller parts - create chunk array
const chunkText = (text, size = 500) => {
  try {
    const words = text.split(" ");

    const chunks = [];
    for (let i = 0; i < words.length; i += size) {
      const chunk = words.slice(i, i + size).join(" ");
      if (chunk.length > 0) {
        chunks.push(chunk);
      }
    }
    return chunks;
  } catch (error) {
    console.error("Error chunking text:", error);
    throw error;
  }
};

module.exports = {
  extractTextFromPDF,
};
