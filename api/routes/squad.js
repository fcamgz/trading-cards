const router = require("express").Router();
const Squad = require("../models/Squad");

// get all squads
router.get("/", async (req, res) => {
  try {
    const squad = await Squad.find();
    res.send(squad);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// get squad by user id
router.get("/getSquad/:userId", async (req, res) => {
  try {
    const squad = await Squad.find({ owner: req.params.userId });
    res.send(squad);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// create squad
router.post("/create", async (req, res) => {
  try {
    const createdSquad = new Squad(req.body);
    const savedSquad = createdSquad.save();
    res.send(savedSquad);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// modify squad
router.post("/modify/:squadId", async (req, res) => {
  try {
    const squad = await Squad.findByIdAndUpdate(req.params.squadId, req.body);
    res.status(200).send(`Squad: ${squad._id} updated`);
  } catch (err) {
    res.status(500).send(err);
  }
});

module.exports = router;
