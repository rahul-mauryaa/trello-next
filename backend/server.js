const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const cors = require("cors");

const allowedOrigins = [
  "trello-next-vert.vercel.app",
  "trello-next-git-main-rahulmauryaas-projects.vercel.app",
  "trello-next-139zks25e-rahulmauryaas-projects.vercel.app",
  "http://localhost:3000",
];

const app = express();

app.use(
  cors({
    origin: allowedOrigins,
    credentials: true,
  })
);

app.use(cookieParser());
app.use(express.json());

// ✅ connect db before routes (serverless safe)
connectDb();

app.get("/", (req, res) => {
  res.send("API running ✅");
});

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bords", require("./routes/bordsRoutes"));
app.use("/api/columns", require("./routes/columnRoutes"));
app.use("/api/cards", require("./routes/cardRoutes"));

app.use(errorHandler);

// ✅ IMPORTANT: export app for Vercel
module.exports = app;
