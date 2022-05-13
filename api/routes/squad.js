const router = require("express").Router();
const Squad = require("../models/Squad");
const SquadArray = require("../models/SquadArray");

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

// get all squads from the array
router.get("/getSquadArray/:userId", async (req, res) => {
  try {
    const squad = await SquadArray.find({ owner: req.params.userId });
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

// create squad array
router.post("/createSquadArray", async (req, res) => {
  try {
    const createdSquad = new SquadArray(req.body);
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

// modify squad array
router.post("/modifySquadArray/:squadId", async (req, res) => {
  try {
    const squad = await SquadArray.findByIdAndUpdate(
      req.params.squadId,
      req.body
    );
    res.status(200).send(`Squad: ${squad._id} updated`);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.get("/allowChallange/:squadId", async (req, res) => {
  try {
    await SquadArray.findByIdAndUpdate(req.params.squadId, {
      isChallenge: "true",
    });
    res.send("Squad is now allowing challenge");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/doNotAllowChallange/:squadId", async (req, res) => {
  try {
    await SquadArray.findByIdAndUpdate(req.params.squadId, {
      isChallenge: "false",
    });
    res.send("Squad is now not allowing challenge");
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/getSquadsAllowChallanges", async (req, res) => {
  try {
    const squads = await SquadArray.find({ isChallenge: { $eq: "true" } });
    res.send(squads);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get("/getStrikersRating/:ownerId", async (req, res) => {
  try {
    const squadRating = await SquadArray.aggregate([
      {
        $match: { owner: { $eq: req.params.ownerId } },
        $group: {
          _id: null,
          total: {
            $sum: {
              $convert: {
                input: "$strikers.rating",
                to: "int",
              },
            },
          },
        },
      },
    ]);
    res.send(squadRating);
  } catch (err) {
    res.send(err);
  }
});

router.get("/getMidfieldersRating/:ownerId", async (req, res) => {
  try {
    const squadRating = await SquadArray.aggregate([
      {
        $match: { owner: { $eq: req.params.ownerId } },
        $group: {
          _id: null,
          total: {
            $sum: {
              $convert: {
                input: "$midfielders.rating",
                to: "int",
              },
            },
          },
        },
      },
    ]);
    res.send(squadRating);
  } catch (err) {
    res.send(err);
  }
});

router.get("/getDefendersRating/:ownerId", async (req, res) => {
  try {
    const squadRating = await SquadArray.aggregate([
      {
        $match: { owner: { $eq: req.params.ownerId } },
        $group: {
          _id: null,
          total: {
            $sum: {
              $convert: {
                input: "$defenders.rating",
                to: "int",
              },
            },
          },
        },
      },
    ]);
    res.send(squadRating);
  } catch (err) {
    res.send(err);
  }
});

router.get("/getGoalkeeperRating/:ownerId", async (req, res) => {
  try {
    const squad = await SquadArray.find({ owner: req.params.ownerId });
    const rating = squad.goalkeeper.rating;
    res.send(rating);
  } catch (err) {
    res.send(err);
  }
});

module.exports = router;
