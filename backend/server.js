const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
require("dotenv").config();
const cors = require("cors");

const allowedOrigins = [
  "https://trello-next-vert.vercel.app",
  "https://trello-next-git-main-rahulmauryaas-projects.vercel.app",
  "https://trello-next-139zks25e-rahulmauryaas-projects.vercel.app",
  "http://localhost:3000",
];

const corsOptions = {
  origin: function (origin, callback) {
    // Postman / server requests
    if (!origin) return callback(null, true);

    if (allowedOrigins.includes(origin)) {
      return callback(null, true);
    }

    console.log("❌ Blocked by CORS:", origin);
    return callback(new Error("Not allowed by CORS"));
  },
  credentials: true,
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
};

const app = express();

app.use(cors(corsOptions));

// ✅ IMPORTANT: handle preflight with SAME cors options
app.options("*", cors(corsOptions));

app.use(cookieParser());
app.use(express.json());

connectDb();

app.get("/", (req, res) => res.send("API running ✅"));

app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bords", require("./routes/bordsRoutes"));
app.use("/api/columns", require("./routes/columnRoutes"));
app.use("/api/cards", require("./routes/cardRoutes"));

app.use(errorHandler);

module.exports = app;
