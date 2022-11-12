const router = require("express").Router();
const multer = require("multer");
const fs = require("fs");
const UiPack = require("../models/UiPack");
const LowTierPack = require("../models/LowTierPack");
const MidTierPack = require("../models/MidTierPack");
const HighTierPack = require("../models/HighTierPack");
const UserCollection = require("../models/UserCollection");
const User = require("../models/User");
const Card = require("../models/Card").Card;
const Pack = require("../models/Pack");
const PackOpened = require("../models/PackOpened");

// Sets up where to store POST images
const storage = multer.diskStorage({
  destination: (request, file, callback) => {
    callback(null, "../public/uploads/images");
  },
  // add back the extension that multer removed
  filename: (request, file, callback) => {
    callback(null, Date.now() + file.originalname);
  },
});

// upload parameter for multer
// defining the storage and the upload limit
const upload = multer({
  storage: storage,
  destination: function (req, res, cb) {
    cb(null, "uploads/");
  },
});

// get all packs
router.get("/", async (req, res) => {
  try {
    const packs = await Pack.find();
    res.status(200).send(packs);
  } catch (err) {
    res.status(500).send(err);
  }
});

// get all cards that are in the pack
router.get("/:packid", async (req, res) => {
  try {
    const pack = await Pack.findById(req.params.packid);
    res.status(200).send(pack);
  } catch (err) {
    res.status(500).send(err);
  }
});

// create pack
router.post("/addPack", async (req, res) => {
  try {
    const pack = new Pack(req.body);
    pack.datecreated = new Date();
    console.log(pack);
    const newPack = pack.save();
    res.status(200).send("Pack created");
  } catch (err) {
    res.status(500).send(err);
  }
});

// delete pack
router.delete("/:id", async (req, res) => {
  try {
    await Pack.findByIdAndDelete(req.params.id);
    res.status(200).send(`Pack: ${req.params.id} has been deleted`);
  } catch (err) {
    res.status(500).send(err);
  }
});

router.post("/:packid/open/:cardnum", async (req, res) => {
  try {
    // get username :(
    const user = await User.findOne({ username: req.body.username });
    // get pack and card numbers
    const pack = await Pack.findById(req.params.packid);
    // const numCards = req.params.cardnum;
    // // get cards that are in pack
    // const allCards = await Card.find({
    //   pack: pack.name,
    // });

    // const cardLength = allCards.length;
    // get a random card from all the cards in pack, send those cards, are duplicates

    // const baseCards = Card.find({ owner: { $eq: "TCC" } });
    if (user.coinBalance > pack.price) {
      console.log(`pack data ${pack}`);
      let cardsToSend;
      if (pack.packRarity === 1) {
        cardsToSend = await Card.aggregate([
          {
            $match: {
              owner: { $eq: "TCC" },
              pack: { $eq: pack.name },
              tier: { $in: ["Silver", "Bronze", "Gold"] },
            },
          },
          { $sample: { size: 5 } },
        ]);
      } else if (pack.packRarity === 2) {
        cardsToSend = await Card.aggregate([
          {
            $match: {
              owner: { $eq: "TCC" },
              pack: { $eq: pack.name },
              tier: { $in: ["Silver", "Platinium", "Gold"] },
            },
          },
          { $sample: { size: 5 } },
        ]);
      } else {
        cardsToSend = await Card.aggregate([
          {
            $match: {
              owner: { $eq: "TCC" },
              pack: { $eq: pack.name },
              tier: { $in: ["Diamond", "Platinium", "Gold"] },
            },
          },
          { $sample: { size: 5 } },
        ]);
      }
      const newUserBalance = user.coinBalance - pack.price;
      console.log("User coin balance: " + user.coinBalance);

      await User.findByIdAndUpdate(user._id, {
        $set: { coinBalance: newUserBalance },
      });
      res.send(cardsToSend);
    } else {
      console.log("not enough funds");
    }
    // switch (pack.tier) {
    //   case "LOW":
    //     cardsToSend = await Card.aggregate([
    //       {
    //         $match: {
    //           owner: { $eq: "TCC" },
    //           pack: { $eq: pack.name },
    //           tier: { $eq: "Bronze" },
    //         },
    //       },
    //       {
    //         $sample: {
    //           size: numCards == "5" ? 2 : numCards == "10" ? 4 : 8,
    //         },
    //       },
    //       {
    //         $match: {
    //           owner: { $eq: "TCC" },
    //           pack: { $eq: pack.name },
    //           tier: { $eq: "Silver" },
    //         },
    //       },
    //       {
    //         $sample: {
    //           size: numCards == "5" ? 2 : numCards == "10" ? 4 : 8,
    //         },
    //       },
    //       {
    //         $match: {
    //           owner: { $eq: "TCC" },
    //           pack: { $eq: pack.name },
    //           tier: { $eq: "Gold" },
    //         },
    //       },
    //       {
    //         $sample: {
    //           size: numCards == "5" ? 1 : numCards == "10" ? 2 : 4,
    //         },
    //       },
    //     ]);
    //     break;
    //   case "MID":
    //     cardsToSend = await Card.aggregate([
    //       {
    //         $match: {
    //           owner: { $eq: "TCC" },
    //           pack: { $eq: pack.name },
    //           tier: { $eq: "Silver" },
    //         },
    //       },
    //       { $sample: { size: 2 } },
    //       {
    //         $match: {
    //           owner: { $eq: "TCC" },
    //           pack: { $eq: pack.name },
    //           tier: { $eq: "Gold" },
    //         },
    //       },
    //       { $sample: { size: 2 } },
    //       {
    //         $match: {
    //           owner: { $eq: "TCC" },
    //           pack: { $eq: pack.name },
    //           tier: { $eq: "Platinium" },
    //         },
    //       },
    //       { $sample: { size: 1 } },
    //     ]);
    //     break;
    //   case "HIGH":
    //     cardsToSend = await Card.aggregate([
    //       {
    //         $match: {
    //           owner: { $eq: "TCC" },
    //           pack: { $eq: pack.name },
    //           tier: { $eq: "Gold" },
    //         },
    //       },
    //       { $sample: { size: 2 } },
    //     ]);
    //     break;
    //   default:
    //     cardsToSend = await Card.aggregate([
    //       {
    //         $match: {
    //           owner: { $eq: "TCC" },
    //           pack: { $eq: pack.name },
    //           tier: { $eq: "Bronze" },
    //         },
    //       },
    //       { $sample: { size: 2 } },
    //       {
    //         $match: {
    //           owner: { $eq: "TCC" },
    //           pack: { $eq: pack.name },
    //           tier: { $eq: "Silver" },
    //         },
    //       },
    //       { $sample: { size: 2 } },
    //       {
    //         $match: {
    //           owner: { $eq: "TCC" },
    //           pack: { $eq: pack.name },
    //           tier: { $eq: "Gold" },
    //         },
    //       },
    //       { $sample: { size: 1 } },
    //     ]);
    //     break;
    // }
  } catch (err) {
    console.log(err);
    res.status(500).send(err);
  }
});

// router.post("/showcase/:packid", async (req, res) => {
//   const packId = req.params.packid;
//   const userId = req.body.userId;
//   var drawnCards = [];
//   try {
//     // get the package details that user chose
//     const pack = await Pack.findById(packId);
//     const user = await User.findById(userId);
//     // adjust user's coin balance
//     const newUserBalance = user.coinBalance - pack.price;
//     await User.findByIdAndUpdate(userId, {
//       $set: { coinBalance: newUserBalance },
//     });
//     // depending of pack rarity draw it from one of the card models
//     //eg. LowTierPack = has 18 non rare 2 rare
//     //eg. MidTierPack = has 15 non rare 5 rare
//     //eg. HighTierPack = has 10 non rare 10 rare
//     switch (pack.tier) {
//       case 1:
//         drawnCards = drawCards(6, LowTierPack, 20, userId);
//         break;
//       case 2:
//         drawnCards = drawCards(6, MidTierPack, 20, userId);
//         break;
//       case 3:
//         drawnCards = drawCards(6, HighTierPack, 20, userId);
//         break;
//     }
//     res.status(200).send(drawnCards);
//   } catch (err) {
//     res.status(500).send(err);
//   }
//   /*
//   // TODO: Creating 6 brand new random cards, assign them to the user and return them
//   const userId = req.body.userId;
//   try {
//     // * find the pack and user
//     const pack = await Pack.findById(req.params.packid);
//     const user = await User.findById(userId);
//     // * set new user money balance
//     const newUserBalance = user.moneyBalance - pack.price;
//     await User.findByIdAndUpdate(userId, {
//       $set: { coinBalance: newUserBalance },
//     });
//     // * assign unpackedCards and return it to the user
//     const unpackedCards = generateNewCards(req.params.packid);
//     res.status(200).send(unpackedCards);
//   } catch (err) {
//     res.status(500).send(err);
//   }
//   */
// });

module.exports = router;
