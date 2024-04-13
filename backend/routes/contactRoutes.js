const express = require("express");
const router = express.Router();
const {
  getContacts,
  createContact,
  getContact,
  updateContact,
  deleteContact,
  getAllContacts,
} = require("../controllers/contactController");
const validateToken = require("../middleware/validateTokenHandler");

// router.use(validateToken);

router.post("/", validateToken,createContact);
router.get("/",validateToken, getContacts);
router.get("/all", getAllContacts);

router.put("/:id",validateToken, updateContact);
router.get("/:id",validateToken,getContact);
router.delete("/:id",validateToken,deleteContact);




// router.route("/").get(getContacts).post(createContact);
// router.route("/:id").get(getContact).put(updateContact).delete(deleteContact);

module.exports = router;
