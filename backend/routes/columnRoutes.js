const express = require("express");
const {
  createColumn,
  getAllColumn,
  getColumn,
  updateColumn,
  deleteColumn,
} = require("../controllers/columnController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/", validateToken, createColumn);
router.get("/all", validateToken, getAllColumn);
router.get("/:id", validateToken, getColumn);

router.put("/:id", validateToken, updateColumn);
router.delete("/:id", validateToken, deleteColumn);

module.exports = router;
