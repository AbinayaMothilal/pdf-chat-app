let storedChunks = []; // In-memory storage for chunks

const storeChunks = async (chunks) => {
  try {
    storedChunks = []; // reset so an old PDF's chunks don't mix in
    for (const chunk of chunks) {
      storedChunks.push(chunk);
    }
    console.log("Chunks stored successfully:", storedChunks.length);
    return storedChunks;
  } catch (error) {
    console.error("Error storing chunks:", error);
    throw error;
  }
};


const getRelevantChunks = async (question, topN = 3) => {
  try {
    const queryWords = question.toLowerCase().split(/\s+/);

    const scored = storedChunks.map((chunk) => {
      const chunkLower = chunk.toLowerCase();
      let score = 0;
      for (const word of queryWords) {
        if (word.length < 3) continue;
        if (chunkLower.includes(word)) score++;
      }
      return { chunk, score };
    });

    scored.sort((a, b) => b.score - a.score);
    const top = scored.slice(0, topN);
    console.log("Top scores:", top.map((t) => t.score)); // e.g. [3, 2, 1]
    return top.map((item) => item.chunk);
  } catch (error) {
    console.error("Error getting relevant chunks:", error);
    throw error;
  }
};

// const getStoredChunks = async () => {
//   try {
//     return storedChunks;
//   } catch (error) {
//     console.error("Error getting stored chunks:", error);
//     throw error;
//   }
// };

module.exports = {
  storeChunks,
//   getStoredChunks,
  getRelevantChunks,
};
