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

const app = express();

// ✅ Proper CORS for Vercel + cookies
app.use(
  cors({
    origin: function (origin, callback) {
      // ✅ allow server-to-server / Postman requests
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      } else {
        console.log("Blocked by CORS:", origin);
        return callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// ✅ Preflight (OPTIONS) handle
app.options("*", cors());

app.use(cookieParser());
app.use(express.json());

// ✅ DB connect
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
