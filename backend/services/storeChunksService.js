// let storedChunks = []; // In-memory storage for chunks
let chunksStore = {};

const storeChunks = async (chunks, filepath) => {
  try {
    chunksStore[filepath] = chunks;
    return chunksStore[filepath];
  } catch (error) {
    console.error("Error storing chunks:", error);
    throw error;
  }
};

const getStoredChunks = async (filepath) => {
  try {
    if (filepath === undefined || filepath === null || filepath.trim() === "") {
      throw new Error("File path is required to retrieve stored chunks.");
    }
    const chunks = chunksStore[filepath];

    // key not present, or stored but empty
    if (!chunks || chunks.length === 0 || chunks === undefined) {
      return null; // Return null if no chunks are found for the given file path
    }

    return chunks;
  } catch (error) {
    console.error("Error getting stored chunks:", error);
    throw error;
  }
};

module.exports = {
  storeChunks,
  getStoredChunks,
};
