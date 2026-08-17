// let storedChunks = []; // In-memory storage for chunks
let chunksStore = {};

const storeChunks = async (chunks, filepath) => {
  try {
    chunksStore[filepath] = chunks;
    // console.log("Chunks stored successfully:", chunksStore[filepath].length);
    return chunksStore[filepath];
  } catch (error) {
    console.error("Error storing chunks:", error);
    throw error;
  }
};

// const getRelevantChunks = async (question, topN = 3) => {
//   try {
//     const queryWords = question.toLowerCase().split(/\s+/);

//     const scored = storedChunks.map((chunk) => {
//       const chunkLower = chunk.toLowerCase();
//       let score = 0;
//       for (const word of queryWords) {
//         if (word.length < 3) continue;
//         if (chunkLower.includes(word)) score++;
//       }
//       return { chunk, score };
//     });

//     scored.sort((a, b) => b.score - a.score);
//     const top = scored.slice(0, topN);
//     console.log(
//       "Top scores:",
//       top.map((t) => t.score),
//     ); // e.g. [3, 2, 1]
//     return top.map((item) => item.chunk);
//   } catch (error) {
//     console.error("Error getting relevant chunks:", error);
//     throw error;
//   }
// };

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

    console.log("Retrieving stored chunks:", chunks.length);
    return chunks;
  } catch (error) {
    console.error("Error getting stored chunks:", error);
    throw error;
  }
};

module.exports = {
  storeChunks,
  getStoredChunks,
  // getRelevantChunks,
};
