const asyncHandler = require("express-async-handler");
const Card = require("../models/cardModel");
//@desc Get all contacts
//@route GET /api/contacts
//@access private
const getCard = asyncHandler(async (req, res) => {
  const userId = req.query.user_id;
  const CardData = await Card.find({ user_id: userId });
  if (!CardData || CardData.length === 0) {
    return res.status(404).json({ message: "No records found" });
  }
  res.status(200).json(CardData);
});

//@desc Create New contact
//@route POST /api/contacts
//@access private
const createCard = asyncHandler(async (req, res) => {
  const { boardId, sequence, columnId } = req.body;
  if (!boardId || !columnId) {
    res.status(400);
    throw new Error("All fields are mandatory !");
  }
  try {
    // Fetch the maximum sequence number for the given boardId
    const maxSequenceCard = await Card.findOne({ boardId, columnId }).sort({
      sequence: -1,
    });

    let sequence = 1; // Default sequence if no card exist for the board

    if (maxSequenceCard) {
      sequence = maxSequenceCard.sequence + 1; // Increment sequence
    }
    const CardData = await Card.create({
      boardId,
      columnId,
      user_id: req.user.id,
      sequence,
    });
    res.status(201).json(CardData);
  } catch (err) {
    console.log(err, "err");
  }
});

const getAllCard = asyncHandler(async (req, res) => {
  const CardData = await Card.find({});
  res.status(200).json(CardData);
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
const updateCard = asyncHandler(async (req, res) => {
  const CardData = await Card.findById(req.params.id);

  if (!CardData) {
    res.status(404);
    throw new Error("Column not found");
  }

  if (CardData.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error("User don't have permission to update other user contacts");
  }

  const updatedCard = await Card.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedCard);
});

//@desc Delete contact
//@route DELETE /api/contacts/:id
//@access private
const deleteCard = asyncHandler(async (req, res) => {
  const cardData = await Card.findById(req.params.id);
  if (!cardData) {
    res.status(404);
    throw new Error("cardData not found");
  }
  if (cardData.user_id.toString() !== req.user.id) {
    res.status(403);
    throw new Error(
      "User don't have permission to update other user columnData"
    );
  }
  await cardData.deleteOne({ _id: req.params.id });
  res.status(200).json(cardData);
});

module.exports = {
  getCard,
  createCard,
  getAllCard,
  updateCard,
  deleteCard,
};
