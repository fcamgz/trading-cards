const mongoose = require("mongoose");

const UserStatsSchema = mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
    username: { type: String },
    wins: { type: Number, default: 0 },
    draws: { type: Number, default: 0 },
    defeats: { type: Number, default: 0 },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserStats", UserStatsSchema);
