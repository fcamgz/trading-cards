const mongoose = require("mongoose");

const SquadArraySchema = mongoose.Schema({
  strikers: { type: Array },
  midfields: { type: Array },
  defenders: { type: Array },
  goalkeeper: { type: Object },
  owner: { type: String },
});

module.exports = mongoose.model("SquadArray", SquadArraySchema);
