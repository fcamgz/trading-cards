const mongoose = require("mongoose");

const MatchSchema = mongoose.Schema(
  {
    challenger: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    challenged: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    score: { type: String },
    winner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    defeated: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    league: { type: String },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Match", MatchSchema);
