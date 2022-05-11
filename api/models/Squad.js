const mongoose = require("mongoose");

const SquadSchema = mongoose.Schema(
  {
    // striker1: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    // striker2: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    // midfield1: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    // midfield2: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    // midfield3: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    // midfield4: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    // centerBack1: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    // centerBack2: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    // centerBack3: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    // centerBack4: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    // goalkeeper: [{ type: mongoose.Schema.Types.ObjectId, ref: "Card" }],
    // owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    striker1: { type: Object },
    striker2: { type: Object },
    midfield1: { type: Object },
    midfield2: { type: Object },
    midfield3: { type: Object },
    midfield4: { type: Object },
    centerBack1: { type: Object },
    centerBack2: { type: Object },
    centerBack3: { type: Object },
    centerBack4: { type: Object },
    goalkeeper: { type: Object },
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    isChallenge: {
      type: String,
      default: "false",
    },
    wins: {
      type: String,
      default: "0",
    },
    defeats: {
      type: String,
      default: "0",
    },
    rating: {
      type: String,
      default: 0,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("Squad", SquadSchema);
