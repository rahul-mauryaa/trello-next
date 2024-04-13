const express = require("express");
const {
  createCard,
  getAllCard,
  getCard,
  updateCard,
  deleteCard,
} = require("../controllers/cardController");
const validateToken = require("../middleware/validateTokenHandler");

const router = express.Router();

router.post("/", validateToken, createCard);
router.get("/", validateToken, getCard);
router.get("/all", validateToken, getAllCard);

router.put("/:id", validateToken, updateCard);
router.delete("/:id", validateToken, deleteCard);

module.exports = router;
