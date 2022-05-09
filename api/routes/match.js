const router = require("express").Router();
const Match = require("../models/Match");

// get matches
router.get("/", async (req, res) => {
  try {
    const match = await Match.find();
    res.send(match);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// get match
router.get("/:id", async (req, res) => {
  try {
    const match = await Match.findById(req.params.id);
    res.send(match);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// create match
router.post("/create", async (req, res) => {
  try {
    const createdMatch = new Match(req.body);
    const savedMatch = createdMatch.save();
    res.send(savedMatch);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

module.exports = router;
