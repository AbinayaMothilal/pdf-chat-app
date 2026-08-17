// Change 1 — require groq instead of anthropic
const Groq = require("groq-sdk");

// Change 2 — initialize groq client
const groq = new Groq({
  apiKey: process.env.GROQ_AI_API_KEY,
});

// Change 3 — use groq in function
const getAIAnswer = async (question, chunks) => {
  try {
    const response = await groq.chat.completions.create({
      model: "groq/compound-mini",
      max_tokens: 1024,
      messages: [
        {
          role: "system",
          content: `You are a context-only question answering assistant.
          Answer ONLY from the context provided.
          If answer not in context, gently say "The answer is not available in the provided context."`,
        },
        {
          role: "user",
          content: `Context:\n${chunks}\n\nQuestion: ${question}`,
        },
      ],
    });
    return response.choices[0].message.content;
  } catch (error) {
    console.error("Error getting AI answer:", error);
    throw error;
  }
};

module.exports = {
  getAIAnswer,
};
