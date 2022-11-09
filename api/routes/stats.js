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
  try {
    if (req.body.wins) {
      await UserStats.findByIdAndUpdate(req.params.userId, {
        $inc: { wins: 1 },
      });
    } else {
      await UserStats.findByIdAndUpdate(req.params.userId, {
        $inc: { defeats: 1 },
      });
    }
  } catch (err) {
    res.send(err);
  }
});

// get all stats
router.get("/stats", async (req, res) => {
  try {
    const stats = await UserStats.find().sort({ wins: "desc" });
    res.send(stats);
  } catch (err) {
    res.send(err);
  }
});

// get user stats
router.get("/:userId/stats", async (req, res) => {
  try {
    const userStats = await UserStats.findById(req.params.userId);
    res.send(userStats);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
