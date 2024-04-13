const mongoose = require("mongoose");

const cardSchema = mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Bords",
  },
  columnId: {
    type: mongoose.Schema.Types.ObjectId,
    require: true,
    ref: "Column",
  },
  title: {
    type: String,
    default: "Add title",
    required: false,
  },
  type: {
    type: String,
    default: "",
    required: false,
  },
  dateCreated: {
    type: String,
    default: new Date(),
    require: false,
  },
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  sequence: {
    type: Number,
    required: false,
  },
  description: {
    type: String,
    default: "",
    required: false,
  },
  assignedTo: {
    type: mongoose.Schema.Types.ObjectId,
    require: false,
  },
  label: {
    type: {
      type: String,
      required: false,
    },
    bg: {
      type: String,
      required: false,
    },
  },
});

module.exports = mongoose.model("Cards", cardSchema);
