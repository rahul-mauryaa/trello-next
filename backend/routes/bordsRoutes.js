const express = require("express");
const {
  createBord,
  getAllBord,
  getBord,
  updateBoard,
  deleteBoard,
  getBoardById,
} = require("../controllers/bordsController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/", validateToken, createBord);
router.get("/", validateToken, getBord);
router.get("/all", validateToken, getAllBord);

router.put("/:id", validateToken, updateBoard);
router.get("/:id", validateToken, getBoardById);
router.delete("/:id", validateToken, deleteBoard);

module.exports = router;
