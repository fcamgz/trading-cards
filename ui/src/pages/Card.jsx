import React, { useEffect, useState } from "react";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Grid,
  Modal,
  TextField,
  Typography,
} from "@mui/material";
import { makeStyles } from "@mui/styles";
import axios from "axios";
import { useLocation, useNavigate, useParams } from "react-router";
import Navbar from "../components/Navbar";
import Forwards from "../images/pack-background3.png";
import PackLogo4 from "../images/fifa-background2.png";
import sampleCard1 from "../images/soccer-player-cards/rare/Haaland.png";
import sampleCard2 from "../images/soccer-player-cards/rare/Kylian Mbappe.png";
import sampleCard3 from "../images/soccer-player-cards/rare/Lewandowski.png";
import Bronzes from "../images/Bronze-Card.png";
import Silvers from "../images/Silver-Card.png";
import Golds from "../images/pack-background4.png";
import Platinium from "../images/Platinium-Card.png";
import Diamonds from "../images/pack-background2.png";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";
import Carousel from "react-material-ui-carousel";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";

const useStyles = makeStyles({
  modal: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    backgroundColor: "white",
    border: "2px solid #afafaf",
    boxShadow: 24,
    padding: "20px",
    borderRadius: "10px",
  },
  mainStructure: {
    display: "flex",
    justifyContent: "space-around",
    padding: "40px",
    width: "60%",
    "@media screen and (max-width: 960px)": {
      flexDirection: "column",
    },
  },
});

export default function Card() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [pack, setPack] = useState({});
  const [apiMessage, setApiMessage] = useState("");
  const [cardData, setCardData] = useState({});
  const [buttonValue, setButtonValue] = useState("");
  const [open, setOpen] = React.useState(false);
  const [openTradeIt, setOpenTradeIt] = useState(false);
  const [listPrice, setListPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  const handleDelete = (cardId) => {
    axios
      .delete(`http://localhost:5000/api/cards/${cardId}`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        navigate("/myCards");
      })
      .catch((err) => console.log(err));
  };

  const handleOpen = (e) => {
    e.preventDefault();
    setOpen(true);
  };

  const handleClose = () => setOpen(false);

  const location = useLocation();

  const classes = useStyles();

  const navigate = useNavigate();

  const cardSamples = [sampleCard1, sampleCard2, sampleCard3];

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:5000/api/cards/${location.pathname.split("/")[[2]]}`
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(cardData);
        setCardData(res);
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      );
    // get user
    axios
      .get("/api/getUsername", {
        headers: {
          "x-access-token": localStorage.getItem("token"),
        },
      })
      .then((res) => res.data)
      .then((data) => {
        console.log(data);
        console.log(data.isLoggedIn);
        if (data.isLoggedIn) {
          setUser(data.user);
          setIsLoggedIn(true);
        } else {
          navigate("/");
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  const handleBuy = () => {
    axios
      .get(
        `http://localhost:5000/api/cards/${
          location.pathname.split("/")[[2]]
        }/buy/${user._id}`
      )
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        navigate("/myCards");
      });
  };

  const handleSell = () => {
    axios
      .post("http://localhost:5000/api/cards/sell", {
        cardId: cardData._id,
        userId: user._id,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        navigate("/myCards");
      });
  };

  const handleOpenTradeIt = () => {
    setOpenTradeIt(true);
  };

  const handleCloseTradeIt = () => {
    setOpenTradeIt(false);
  };

  const handleTradeNow = () => {
    axios
      .post("http://localhost:5000/api/cards/putCardForTrade", {
        cardId: cardData._id,
        price: cardData.price,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        navigate("/trades");
      })
      .catch((err) => console.log(err))
      .finally(() => handleCloseTradeIt());
  };

  return (
    <Box
      sx={{ height: "100vh", width: "100vw", margin: 0, overflowX: "hidden" }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar user={user} isLoggedIn={isLoggedIn} isLoading={isLoading} />
      <Box
        mb={6}
        sx={{
          height: "100%",
          width: "100vw",
          margin: 0,
          position: "relative",
        }}
      >
        <img
          src={BackgroundImage}
          style={{
            opacity: "0.95",
            position: "fixed",
            left: 0,
            top: 0,
            width: "99.1vw",
            height: "auto",
            zIndex: 0,
            margin: 0,
            minHeight: "100%",
            minWidth: "1024px",
          }}
          alt="background"
        />
        <Box
          mt={6}
          mb={6}
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Modal open={openTradeIt} onClose={handleCloseTradeIt}>
            <Box className={classes.modal}>
              <Typography textAlign="center" variant="h4" component="h2">
                Trade your Card
              </Typography>
              <Typography variant="h5" mt={1} textAlign="center">
                {cardData?.firstname} {cardData?.lastname}
              </Typography>
              <Typography variant="h6" mt={1} textAlign="center">
                Rating: {cardData?.rating}
              </Typography>
              <Typography variant="h6" mt={1} textAlign="center">
                Sell Now Price: {cardData?.price}
              </Typography>

              <Box
                mt={4}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                <Button onClick={handleTradeNow} variant="contained">
                  List on Trade Market
                </Button>
                <Button
                  onClick={handleCloseTradeIt}
                  variant="contained"
                  color="inherit"
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>

          <Modal open={open} onClose={handleClose}>
            <Box className={classes.modal}>
              {cardData.owner === user._id ? (
                <Typography textAlign="center" variant="h4" component="h2">
                  Sell the Card
                </Typography>
              ) : (
                <Typography textAlign="center" variant="h4" component="h2">
                  Buy the Card
                </Typography>
              )}
              <Typography variant="body1" mt={1} textAlign="center">
                Confirm your action
              </Typography>
              {cardData.owner === user._id ? (
                <Typography variant="h6" mt={2} textAlign="center">
                  Sell it for {cardData.price} TCC
                  {" ?"}
                </Typography>
              ) : (
                <Typography variant="h6" mt={2} textAlign="center">
                  Buy it for {cardData.price} TCC
                  {" ?"}
                </Typography>
              )}
              <Box
                mt={4}
                sx={{ display: "flex", justifyContent: "space-around" }}
              >
                {cardData.owner === user._id ? (
                  <>
                    {" "}
                    <Button
                      color="warning"
                      onClick={handleSell}
                      variant="contained"
                    >
                      Sell It
                    </Button>
                  </>
                ) : (
                  <Button onClick={handleBuy} variant="contained">
                    Buy
                  </Button>
                )}
                <Button
                  onClick={handleClose}
                  variant="contained"
                  color="inherit"
                >
                  Cancel
                </Button>
              </Box>
            </Box>
          </Modal>
          {!isLoading && (
            <Box
              className={classes.mainStructure}
              sx={{
                display: "flex",
                justifyContent: "space-around",
                padding: "40px",
                width: "60%",
                gap: "42px",
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "column",
                  height: "100%",
                  minWidth: "20vw",
                  maxWidth: "20vw",
                }}
              >
                <Typography
                  variant="h4"
                  sx={{ color: "yellow" }}
                  textAlign="center"
                >
                  <MonetizationOnIcon />
                  {cardData.price}
                </Typography>
                <img
                  className={classes.cardHover}
                  src={
                    cardData.tier === "Platinium"
                      ? Platinium
                      : cardData.tier === "Diamond"
                      ? Diamonds
                      : cardData.tier === "Gold"
                      ? Golds
                      : cardData.tier === "Silver"
                      ? Silvers
                      : Bronzes
                  }
                  alt="cardimage"
                  sx={{ position: "relative" }}
                />
              </Box>

              <Box
                component="form"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                }}
              >
                <Typography
                  variant="h4"
                  mb={4}
                  color="white"
                  textAlign="center"
                >
                  {cardData.firstname} {cardData.lastname}
                </Typography>
                <Typography mt={1} variant="h6" color="white">
                  Rating: {cardData.rating}
                </Typography>
                <Typography mt={1} variant="h6" color="white">
                  Team: {cardData.team}
                </Typography>
                <Typography mt={1} variant="h6" color="white">
                  Nationality: {cardData.nationality}
                </Typography>
                <Typography mt={1} variant="h6" color="white">
                  Card Tier: {cardData.tier}
                </Typography>
                <Typography mt={1} variant="h6" color="white">
                  Package: {cardData.pack}
                </Typography>
                <Typography mt={1} variant="h6" color="white">
                  Card Category: {cardData.category}
                </Typography>
                <Typography mt={1} variant="h6" color="white">
                  Speed: {cardData.speed}
                </Typography>
                <Typography mt={1} variant="h6" color="white">
                  Power: {cardData.power}
                </Typography>
                <Typography mt={1} variant="h6" color="white">
                  Vision: {cardData.vision}
                </Typography>
                <Typography mt={1} variant="h6" color="white">
                  Passing: {cardData.passing}
                </Typography>
                <Typography mt={1} variant="h6" color="white">
                  Defending: {cardData.defending}
                </Typography>
                <Typography mt={1} mb={4} variant="h6" color="white">
                  Stamina: {cardData.stamina}
                </Typography>
                {user._id === cardData.owner ? (
                  <Box>
                    <Box mb={2}>
                      <Button
                        color="success"
                        onClick={handleOpen}
                        variant="contained"
                      >
                        Sell now for {cardData.price} TCC
                      </Button>
                    </Box>
                    <Button
                      onClick={handleOpenTradeIt}
                      variant="contained"
                      color="warning"
                    >
                      List on Trade Market
                    </Button>
                  </Box>
                ) : (
                  <Button onClick={handleOpen} variant="contained">
                    Buy it for {cardData.price} TCC
                  </Button>
                )}
                {user.isAdmin ? (
                  <Box mt={2}>
                    <Button
                      color="error"
                      onClick={() => handleDelete(cardData._id)}
                      variant="contained"
                    >
                      Delete Card
                    </Button>
                  </Box>
                ) : (
                  ""
                )}
              </Box>
            </Box>
          )}
        </Box>
        <br />
        {!isLoading && <Footer />}
      </Box>
    </Box>
  );
}
