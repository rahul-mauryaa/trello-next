const asyncHandler = require("express-async-handler");
const Column = require("../models/columnModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getColumn = asyncHandler(async (req, res) => {
  const ColumnData = await Column.findById(req.params.id);
  if (!ColumnData || ColumnData.length === 0) {
    return res.status(404).json({ message: "No records found" });
  }
  res.status(200).json(ColumnData);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createColumn = asyncHandler(async (req, res) => {
  const { boardId, sequence } = req.body;
  if (!sequence || !boardId) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  try {
    const ColumnData = await Column.create({
      boardId,
      user_id: req.user.id,
      sequence,
    });
    res.status(201).json(ColumnData);
  } catch (err) {
    console.log(err, "err");
  }
});

const getAllColumn = asyncHandler(async (req, res) => {
  const ColumnsData = await Column.find({});
  res.status(200).json(ColumnsData);
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
const updateColumn = asyncHandler(async (req, res) => {
  const ColumnData = await Column.findById(req.params.id);

  if (!ColumnData) {
    res.status(404);
    throw new Error("Column not found");
  }

  if (ColumnData.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedColumn = await Column.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedColumn);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteColumn = asyncHandler(async (req, res) => {
  const columnData = await Column.findById(req.params.id);
  if (!columnData) {
    res.status(404);
    throw new Error("columnData not found");
  }
  if (columnData.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other user columnDatas"
    );
  }
  await columnData.deleteOne({ _id: req.params.id });
  res.status(200).json(columnData);
});

module.exports = {
  getColumn,
  createColumn,
  getAllColumn,
  updateColumn,
  deleteColumn,
};
