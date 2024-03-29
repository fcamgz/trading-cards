const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const Card = require("../models/Card").Card;
const UserCollection = require("../models/UserCollection");
const User = require("../models/User");
const path = require("path");
const Pack = require("../models/Pack");
const BaseCard = require("../models/BaseCard").BaseCard;

const { Console } = require("console");
const ObjectId = require("mongodb").ObjectId;

router.get("/trades", async (req, res) => {
  try {
    // const cards = await Card.find({ $match: { availableToTrade: "true" } });
    const cards = await Card.find({ availableToTrade: { $eq: "true" } });
    console.log(cards);
    res.send(cards);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

// show card
router.get("/:id", async (req, res) => {
  try {
    const card = await Card.findById(req.params.id);
    console.log(card);
    res.status(200).send(card);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// base card
router.get("/getBaseCards", async (req, res) => {
  try {
    const cards = await BaseCard.find({ owner: { $eq: "TCC" } });
    console.log(cards);
    res.status(200).send(cards);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// get all the cards on the homepage
router.get("/", async (req, res) => {
  try {
    const cards = await Card.find({ owner: { $eq: "TCC" } });
    res.status(200).send(cards);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get all the cards on the homepage
router.get("/getCards/:orderBy", async (req, res) => {
  switch (req.params.orderBy) {
    case "getByPrice":
      try {
        const cards = await Card.find({ owner: { $eq: "TCC" } }).sort({
          price: -1,
        });
        res.status(200).send(cards);
      } catch (err) {
        res.send(err);
      }
      break;
    case "getByRating":
      try {
        const cards = await Card.find({ owner: { $eq: "TCC" } }).sort({
          rating: -1,
        });
        res.status(200).send(cards);
      } catch (err) {
        res.send(err);
      }
      break;
    default:
      try {
        const cards = await Card.find({ owner: { $eq: "TCC" } });
        res.status(200).send(cards);
      } catch (err) {
        res.status(500).send(err);
      }
      break;
  }
});

router.get("/findByLastName", async (req, res) => {
  console.log(req.body.lastName);
  try {
    const card = await Card.find({ lastname: req.body.lastName });
    if (card) {
      res.status(200).send("Card already exist");
    } else {
      res.status(200).send("Card does not exist");
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// get cards by id
router.get("/pack/:id", async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.id);
    if (pack) {
      const cards = await Card.find({ pack: pack.name });
      console.log("done");
      res.statusCode = 200;
      res.send(cards);
    } else {
      res.status(500).send({ err: "Pack not found" });
    }
  } catch (err) {
    res.status(500).send(err);
  }
});

// name image matches with the input name image
router.post("/add", (req, res) => {
  try {
    const newCard = new Card(req.body);
    const savedCard = newCard.save();
    res.status(200).send(savedCard);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get cards by names
router.get("/:name", async (req, res) => {
  const cardName = req.params.name;
  let regex = new RegExp("/" + cardName + "/");
  try {
    let cards = await Card.find({
      $or: [{ $regex: { firstname: regex } }, { $regex: { lastname: regex } }],
    });
    res.status(200).send(cards);
  } catch (err) {
    console.log(" new error");
    console.log(err);
    res.status(500).send(err);
  }
});

// delete card
router.delete("/:id", async (req, res) => {
  try {
    await Card.findByIdAndDelete(req.params.id);
    res.status(200).send(`Card Id: ${req.params.id} has been deleted`);
  } catch (err) {
    res.status(500).send(err);
  }
});

// buy card
router.get("/:cardId/buy/:ownerId", async (req, res) => {
  try {
    const copyCard = await Card.findById(req.params.cardId);
    const user = await User.findById(req.params.ownerId);
    copyCard.owner = req.params.ownerId;
    var id = new ObjectId();
    copyCard._id = id;
    await Card.insertMany(copyCard);
    const newUserBalance = user.coinBalance - copyCard.price;
    await User.findByIdAndUpdate(user._id, {
      $set: { coinBalance: newUserBalance },
    });
    res.status(200).send(`Card now owned by ${user._id}`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.post("/sell", async (req, res) => {
  try {
    const card = await Card.findById(req.body.cardId);
    const user = await User.findById(req.body.userId);
    const newUserBalance = user.coinBalance + card.price;
    await User.findByIdAndUpdate(user._id, {
      $set: { coinBalance: newUserBalance },
    });
    await Card.findByIdAndDelete(req.body.cardId);
    res.send(`Card is sold`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/putCardForTrade", async (req, res) => {
  console.log(req.body);
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.body.cardId },
      { availableToTrade: "true", price: req.body.price },
      { new: true }
    );
    res.send(`is now available to trade`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.post("/removeFromTrade", async (req, res) => {
  try {
    const card = await Card.findOneAndUpdate(
      { _id: req.body.cardId },
      { availableToTrade: "false" },
      { new: true }
    );
    res.send(`is now not available to trade`);
  } catch (err) {
    console.log(err);
    res.send(err);
  }
});

router.get(`/userCollection/:userId`, async (req, res) => {
  try {
    const cards = await Card.find({ owner: req.params.userId }).sort({
      rating: "desc",
    });
    res.status(200).send(cards);
  } catch (err) {
    res.send(err);
  }
});

router.get(`/userCollection/:userId/:orderBy`, async (req, res) => {
  switch (req.params.orderBy) {
    case "getByPrice":
      try {
        const cards = await Card.find({ owner: req.params.userId }).sort({
          price: -1,
        });
        res.status(200).send(cards);
      } catch (err) {
        res.send(err);
      }
      break;
    case "getByRating":
      try {
        const cards = await Card.find({ owner: req.params.userId }).sort({
          rating: -1,
        });
        res.status(200).send(cards);
      } catch (err) {
        res.send(err);
      }
      break;
    default:
      try {
        const cards = await Card.find({ owner: req.params.userId }).sort({
          rating: -1,
        });
        res.status(200).send(cards);
      } catch (err) {
        res.send(err);
      }
      break;
  }
});

// buy card from trades
router.get("/:cardId/buyTrades/:ownerId", async (req, res) => {
  try {
    const card = await Card.findById(req.params.cardId);
    const user = await User.findById(req.params.ownerId);
    card.owner = req.params.ownerId;
    const newUserBalance = user.coinBalance - card.price;
    await Card.findByIdAndUpdate(req.params.cardId, {
      $set: { owner: req.params.ownerId, availableToTrade: "false" },
    });
    await User.findByIdAndUpdate(req.params.ownerId, {
      $set: { coinBalance: newUserBalance },
    });
    res.status(200).send(`Card bought`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

router.get("/getTotalCardValue", async (req, res) => {
  const cardValue = await Card.aggregate({
    $group: { _id: null, amount: { $sum: "$price" } },
  });
  console.log(cardValue.amount);
  res.send(cardValue.amount);
});

router.post("/addCardsToMyCollection", async (req, res) => {
  try {
    const cards = req.body.cards;
    for (let card of cards) {
      const copyCard = await Card.findById(card._id);
      copyCard.owner = req.body.userId;
      var id = new ObjectId();
      copyCard._id = id;
      await Card.insertMany(copyCard);
    }
    res.status(200).send(`Cards added to the collection`);
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

/*
// add card to the collection
// basically change the ownership of the card
router.post("buy/:id", async (req, res) => {
  try {
    const Card = await Card.findByIdAndUpdate(
      req.params.id,
      { owner: { $set: req.body } },
      { new: true }
    );
  } catch (err) {
    res.status(500).send(err);
  }
});
*/

module.exports = router;
