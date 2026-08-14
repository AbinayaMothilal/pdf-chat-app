const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
dotenv.config();
const chatRoutes = require("./routes/chat");

const app = express();
app.use(cors());

app.use(express.json());

const PORT = process.env.PORT || 3000;

app.use("/api", chatRoutes);

app.get("/", (req, res) => {
  res.send("Hi there, Backend is running.");
});

app.listen(PORT, () => {
  console.log(`Server is successfully running on http://localhost:${PORT}`);
});
