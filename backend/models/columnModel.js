const mongoose = require("mongoose");

const columnSchema = mongoose.Schema({
  boardId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Bords",
  },
  boardName: {
    type: String,
    default: null,
    required: false,
  },
  columnName: {
    type: String,
    default: "Add title",
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
});

module.exports = mongoose.model("Column", columnSchema);
