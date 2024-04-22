const asyncHandler = require("express-async-handler");
const Bord = require("../models/bordModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getBord = asyncHandler(async (req, res) => {
  const userId = req.query.user_id;
  const Bords = await Bord.find({ user_id: userId });
  if (!Bords || Bords.length === 0) {
    return res.status(404).json({ message: "No records found" });
  }
  res.status(200).json(Bords);
});

const getBoardById = asyncHandler(async (req, res) => {
  const boardId = req.params.id;
  const Bords = await Bord.find({
    $and: [{ user_id: req.user.id }, { _id: boardId }],
  });

  if (!Bords || Bords.length === 0) {
    return res.status(404).json({ message: "No records found" });
  }
  res.status(200).json(Bords);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createBord = asyncHandler(async (req, res) => {
  const { name } = req.body;
  if (!name) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  const bordData = await Bord.create({
    name,
    user_id: req.user.id,
  });

  res.status(201).json(bordData);
});

const getAllBord = asyncHandler(async (req, res) => {
  const BordsData = await Bord.find({});
  res.status(200).json(BordsData);
});

//@desc Get contact
//@route GET /api/contacts/:id
//@access private
// const getContact = asyncHandler(async (req, res) => {

//     const contact = await Contact.findById(req.params.id);
//     if (!contact) {
//       res.status(404);
//       throw new Error("Contact not found");
//     }
//     res.status(200).json(contact);

// });

//@desc Update contact
//@route PUT /api/contacts/:id
//@access private
const updateBoard = asyncHandler(async (req, res) => {
  const boads = await Bord.findById(req.params.id);

  if (!boads) {
    res.status(404);
    throw new Error("boads not found");
  }

  if (boads.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedBoard = await Bord.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBoard);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteBoard = asyncHandler(async (req, res) => {
  const boards = await Bord.findById(req.params.id);
  if (!boards) {
    res.status(404);
    throw new Error("boards not found");
  }
  if (boards.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user boards");
  }
  await boards.deleteOne({ _id: req.params.id });
  res.status(200).json(boards);
});

module.exports = {
  getBord,
  createBord,
  getAllBord,
  updateBoard,
  deleteBoard,
  getBoardById,
};
