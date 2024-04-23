const express = require("express");
const cookieParser = require("cookie-parser");
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");
const dotenv = require("dotenv").config();
const cors = require("cors");

connectDb();

const allowedOrigind = [
  "https://trello-next-m7gx.vercel.app",
  "http://localhost:3000",
];

const app = express();
app.use(
  cors({
    origin: allowedOrigind,
    credentials: true,
  })
);
const port = process.env.PORT || 5000;

app.use(cookieParser());
app.use(express.json());

app.use("/api/contacts", require("./routes/contactRoutes"));
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/bords", require("./routes/bordsRoutes"));
app.use("/api/columns", require("./routes/columnRoutes"));
app.use("/api/cards", require("./routes/cardRoutes"));
app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
