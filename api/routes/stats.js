const mongoose = require("mongoose");
const UserStats = require("../models/UserStats");

const router = require("express").Router();

// create a stat record
router.post("/createStat", async (req, res) => {
  try {
    const newSquad = new UserStats({
      userId: req.body.userId,
      username: req.body.username,
    });
    const savedSquad = await newSquad.save();
    res.send("New user stat has been created");
  } catch (err) {
    res.send(err);
  }
});

// modify user stats
router.put("/:userId/modifyStat", async (req, res) => {
  console.log(req.body);
  console.log(mongoose.Types.ObjectId(req.params.userId));
  try {
    if (req.body.wins) {
      await UserStats.findOneAndUpdate(
        { userId: mongoose.Types.ObjectId(req.params.userId) },
        { $inc: { "wins": 1 } }
      ).exec();
    } else if (req.body.draws) {
      await UserStats.findOneAndUpdate(
        { userId: mongoose.Types.ObjectId(req.params.userId) },
        { $inc: { "draws": 1 } }
      ).exec();
    } else {
      await UserStats.findOneAndUpdate(
        { userId: mongoose.Types.ObjectId(req.params.userId) },
        { $inc: { "defeats": 1 } }
      ).exec();
    }
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// get all stats
router.get("/", async (req, res) => {
  try {
    // get stats that have equal or more than 1 wins
    const stats = await UserStats.find()
      .sort({
        wins: "desc",
        draws: "desc",
      })
      .exec();
    console.log(stats);
    res.send(stats);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// get user stats
router.get("/:username", async (req, res) => {
  try {
    const userStats = await UserStats.find({ username: req.params.username });
    console.log(userStats);
    res.send(userStats);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
