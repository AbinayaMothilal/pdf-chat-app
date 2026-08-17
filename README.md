# 📄 PDF Chat App — AI-Powered PDF Assistant using RAG

Upload a PDF, then ask questions about it in plain language. The app extracts the
document's text, splits it into chunks, and uses a large language model to answer
your questions **using only the content of that PDF** as context.

Built with a clean, extensible Retrieval-Augmented Generation (RAG) pipeline.

---

## ✨ Features

- Upload a PDF and automatically extract its text
- Text is chunked and stored for fast, per-file lookup
- Ask natural-language questions about the uploaded document
- Answers are grounded in the PDF — the model is instructed to say when an answer
  isn't in the document rather than making one up
- Robust error handling for missing files, missing questions, and unknown file paths

---

## 🛠️ Tech Stack

**Backend**

- Node.js + Express
- [`multer`](https://www.npmjs.com/package/multer) — handling file uploads
- [`pdf-parse-fork`](https://www.npmjs.com/package/pdf-parse-fork) — PDF text extraction
- [`groq-sdk`](https://www.npmjs.com/package/groq-sdk) — LLM inference (`groq/compound-mini`)

**Frontend**

- [Angular](https://angular.dev/) — component-based architecture
- Each feature is a standalone Angular **component** with its own `.ts` (logic),
  `.html` (template), and `.css` (scoped styles)
- Angular `HttpClient` for talking to the backend `/upload` and `/ask` endpoints

---

## 🚀 Getting Started

### Prerequisites

- Node.js (v18+ recommended)
- [Angular CLI](https://angular.dev/tools/cli) (`npm install -g @angular/cli`)
- A [Groq API key](https://console.groq.com/)

### 1. Clone the repository

```bash
git clone https://github.com/AbinayaMothilal/pdf-chat-app.git
cd pdf-chat-app
```

### 2. Set up the backend

```bash
cd backend
npm install
```

Create a `.env` file inside `backend/`:

```env
GROQ_AI_API_KEY=your_groq_api_key_here
PORT=5000
```

Start the server:

```bash
npm start
```

### 3. Set up the frontend (Angular)

```bash
cd ../frontend
npm install       # installs Angular and dependencies
ng serve          # compiles the components and starts the dev server
```

The Angular app runs at **http://localhost:4200** by default, with live reload
as you edit any component's `.ts`, `.html`, or `.css` files.

> Requires the Angular CLI. Install it globally if you don't have it:
>
> ```bash
> npm install -g @angular/cli
> ```
>
> To build for production, run `ng build`.

---

## 🔌 API Reference

### `POST /upload`

Upload a PDF for processing.

**Request:** `multipart/form-data` with a `pdf` field.

**Success (200):**

```json
{
  "success": true,
  "message": "File uploaded successfully",
  "fileName": "invoice.pdf",
  "filePath": "uploads/abc123",
  "totalChunks": 12
}
```

### `POST /ask`

Ask a question about a previously uploaded PDF.

**Request body (JSON):**

```json
{
  "question": "What services were provided and on what date?",
  "filePath": "uploads/abc123"
}
```

**Success (200):**

```json
{
  "success": true,
  "message": "Answer generated successfully",
  "question": "What services were provided and on what date?",
  "answer": "..."
}
```

**Errors:**

- `400` — missing `question` or `filePath`
- `404` — no document found for the given `filePath` (upload again)
- `500` — extraction or AI processing failure

---

## 🎯 Why This Project

Instead of pasting a document into a general-purpose chatbot, this app provides a
**purpose-built, private, and controllable** way to query your own documents:

- **Grounded answers** — responses come strictly from your PDF, reducing hallucination
- **Data ownership** — documents are processed in your own backend, not a third-party UI
- **Fully customizable** — you control the model, chunking, prompts, and cost
- **Integration-ready** — a clean API that can be embedded into any product or workflow

---

## 🧩 Design Highlights

- **Modular RAG pipeline** — extraction, chunking, storage, and answering are
  cleanly separated services, making each stage easy to extend or swap
- **Fast MVP storage** — chunks are held in memory for instant lookup, keeping the
  first version lightweight and easy to run locally
- **Provider-flexible** — powered by Groq for low-latency inference, and simple to
  point at a different model or provider

---

## 🚀 Advanced Roadmap

Planned enhancements to take the project from MVP to production-grade:

- ⚡ **Semantic retrieval** — embedding-based similarity search for smarter,
  more precise context selection on large documents
- 💾 **Persistent storage** — a database or vector store so documents survive
  restarts and scale across sessions
- 📚 **Multi-document support** — query across several files in one session
- 💬 **Conversational memory** — follow-up questions with full chat history
- 🔐 **Auth & access control** — user accounts and secure, per-user document spaces

---

## 👤 Author

**V M Abinaya** — [@AbinayaMothilal](https://github.com/AbinayaMothilal)
