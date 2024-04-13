const mongoose = require("mongoose");

const bordSchema = mongoose.Schema(
  {
   
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    name: {
      type: String,
      required: [true, "Please add the bord name"],
    },
    backgroundImage: {
      type: String,
      default:"/boards/board-background.jpg"
    },
  },
  {
    timestamps: true,
  }
);



module.exports = mongoose.model("Bords", bordSchema);
