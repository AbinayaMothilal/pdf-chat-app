// const axios = require("axios");

// const getEmbeddings = async (chunks) => {
//   try {
//     let storedEmbeddings = [];
//     // Here make axios post with bearer token of huggingface api key to get embeddings for the chunks
//     for (const chunk of chunks) {
//       const headers = {
//         Authorization: `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//       };
//       const response = await axios.post(
//         "https://api-inference.huggingface.co/pipeline/feature-extraction/sentence-transformers/all-MiniLM-L6-v2",
//         {
//           inputs: chunk,
//         },
//         {
//           headers: headers,
//         },
//       );
//       console.log("Embedding response:", response.data);
//       const embedding = response.data[0];
//       storedEmbeddings.push(embedding);
//     }
//     console.log("Stored embeddings:", storedEmbeddings);
//   } catch (error) {
//     console.error("Error getting embeddings:", error);
//     throw error;
//   }
// };

// module.exports = {
//   getEmbeddings,
// };
