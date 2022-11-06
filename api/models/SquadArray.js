const mongoose = require("mongoose");

const SquadArraySchema = mongoose.Schema({
  strikers: { type: Array },
  midfields: { type: Array },
  defenders: { type: Array },
  goalkeeper: { type: Object },
  owner: { type: String },
  ownerUsername: { type: String },
  isChallenge: {
    type: String,
    default: "false",
  },
  rating: {
    type: Number,
    default: 0,
  },
});

module.exports = mongoose.model("SquadArray", SquadArraySchema);
