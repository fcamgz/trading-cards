import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  CircularProgress,
  Chip,
  Divider,
  Grid,
  Stack,
  TextField,
  Typography,
  Alert,
  Tooltip,
} from "@mui/material";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ThumbUpAltIcon from "@mui/icons-material/ThumbUpAlt";
import ThumbDownAltIcon from "@mui/icons-material/ThumbDownAlt";
import CancelIcon from "@mui/icons-material/Cancel";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";
import Bronzes from "../images/Bronze-Card.png";
import Silvers from "../images/Silver-Card.png";
import Golds from "../images/pack-background4.png";
import Platinum from "../images/Platinium-Card.png";
import Diamonds from "../images/pack-background2.png";
import { useNavigate } from "react-router";

export default function TradeOffers() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const acceptOffer = (
    offerFrom,
    offerTo,
    tradeId,
    wantedCard,
    offeredCard
  ) => {
    axios
      .post("http://localhost:5000/api/trades/acceptOffer", {
        offerFrom: offerFrom,
        offerTo: offerTo,
        tradeId: tradeId,
        wantedCard: wantedCard,
        offeredCard: offeredCard,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setButtonClicked(!buttonClicked);
        navigate("/myCards");
      })
      .catch((err) => console.log(err));
  };

  const refuseOffer = (tradeId) => {
    axios
      .post("http://localhost:5000/api/trades/refuseOffer", {
        tradeId: tradeId,
      })
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setButtonClicked(!buttonClicked);
      })
      .catch((err) => console.log(err));
  };

  const handleDelete = (cardId) => {
    axios
      .delete(`http://localhost:5000/api/cards/${cardId}`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setButtonClicked(!buttonClicked);
      })
      .catch((err) => console.log(err));
  };

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(`http://localhost:5000/api/trades/`)
      .then((res) => res.data)
      .then((res) => {
        setCardData(res);
        console.log(res);
      })
      .catch((err) => console.log(err));
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
        }
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      );
  }, [buttonClicked]);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        margin: 0,
        boxSizing: "border-box",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar user={user} isLoggedIn={isLoggedIn} isLoading={isLoading} />
      <Box
        container
        sx={{ position: "relative", margin: 0, height: "100%", width: "100%" }}
      >
        <img
          src={BackgroundImage}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "100%",
            height: "auto",
            zIndex: 0,
            minHeight: "100%",
            minWidth: "1024px",
          }}
          alt="background"
        />
        <Box
          sx={{
            position: "relative",
          }}
          mb={2}
        >
          <Typography
            gutterBottom
            variant="h3"
            mt={4}
            color="white"
            textAlign="center"
          >
            Trade Offers
          </Typography>
          <Divider sx={{ color: "white", margin: "40px" }} />
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Box sx={{ width: "auto" }}>
              <Alert severity="info">
                Pending trade offers are shown here. You can cancel sent offers
                by clicking the "X" button or accept by clicking thums up
                button.
              </Alert>
            </Box>
          </Box>
          {!isLoading && (
            <Grid
              container
              direction="row"
              alignItems="center"
              spacing={1}
              p={8}
              sx={{ display: "flex", justifyContent: "center" }}
            >
              {cardData?.map((offer) =>
                offer.offerTo === user?._id || offer.offerFrom === user?._id ? (
                  <>
                    <Grid key={offer._id} item sm={5} md={5} lg={4}>
                      <Box>
                        <Card>
                          <Typography p={2} variant="h5" textAlign="center">
                            Offer For the Card
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <CardHeader
                              title={`${offer.wantedCard?.firstname} ${offer.wantedCard?.lastname} - Value: ${offer.wantedCard?.price}`}
                              subheader={`Owner: ${
                                offer.wantedCard?.owner === user?._id
                                  ? "You"
                                  : offer.wantedCard?.owner
                              }`}
                            ></CardHeader>
                            <Box m={4}>
                              {offer.owner === user?._id ? (
                                <Chip
                                  label="Owned"
                                  sx={{
                                    display: "flex",
                                    backgroundColor: "green",
                                    color: "white",
                                  }}
                                />
                              ) : (
                                ""
                              )}
                            </Box>
                          </Box>
                          <CardContent>
                            <Stack>
                              <Button
                                href={`cards/${offer.wantedCard?._id}`}
                                variant="contained"
                                color="inherit"
                                sx={{ fontWeight: "600" }}
                              >
                                Go to Card
                              </Button>
                              {user?.isAdmin ? (
                                <Box mt={2}>
                                  <Button
                                    color="secondary"
                                    onClick={() =>
                                      handleDelete(offer.wantedCard?._id)
                                    }
                                    variant="contained"
                                  >
                                    Delete Card
                                  </Button>
                                </Box>
                              ) : (
                                ""
                              )}
                            </Stack>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={
                                  offer.wantedCard?.tier === "Bronze"
                                    ? Bronzes
                                    : offer.wantedCard?.tier === "Silver"
                                    ? Silvers
                                    : offer.wantedCard?.tier === "Gold"
                                    ? Golds
                                    : offer.wantedCard?.tier === "Platinium"
                                    ? Platinum
                                    : offer.wantedCard?.tier === "Diamond"
                                    ? Diamonds
                                    : ""
                                }
                                width="226px"
                                alt="Forwards Pack"
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>
                    <Box sx={{ display: "flex", flexDirection: "column" }}>
                      {offer.offerFrom === user?._id ? (
                        <Button onClick={() => refuseOffer(offer._id)}>
                          <Tooltip title="Cancel offer">
                            <CancelIcon
                              sx={{ color: "white", fontSize: "40px" }}
                            />
                          </Tooltip>
                        </Button>
                      ) : (
                        <Button
                          onClick={() =>
                            acceptOffer(
                              offer.offerFrom,
                              offer.offerTo,
                              offer._id,
                              offer.wantedCard,
                              offer.offeredCard
                            )
                          }
                        >
                          <Tooltip title="Accept offer" placement="top">
                            <ThumbUpAltIcon
                              sx={{ color: "white", fontSize: "40px" }}
                            />
                          </Tooltip>
                        </Button>
                      )}
                      <Divider sx={{ color: "white" }} />
                      {offer.offerFrom === user?._id ? (
                        ""
                      ) : (
                        <Button onClick={() => refuseOffer(offer._id)}>
                          <Tooltip title="Refuse offer">
                            <ThumbDownAltIcon
                              sx={{ color: "white", fontSize: "40px" }}
                            />
                          </Tooltip>
                        </Button>
                      )}
                    </Box>

                    <Grid key={offer._id} item sm={5} md={5} lg={4}>
                      <Box>
                        <Card>
                          <Typography p={2} variant="h5" textAlign="center">
                            Offered Card
                          </Typography>
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "space-between",
                            }}
                          >
                            <CardHeader
                              title={`${offer.offeredCard?.firstname} ${offer.offeredCard?.lastname} - Value: ${offer.offeredCard?.price}`}
                              subheader={`Offer From: ${
                                offer.offerFrom === user?._id
                                  ? "You"
                                  : offer.offerFrom
                              }`}
                            ></CardHeader>
                          </Box>
                          <CardContent>
                            <Stack>
                              <Button
                                href={`cards/${offer.offeredCard?._id}`}
                                variant="contained"
                                color="inherit"
                                sx={{ fontWeight: "600" }}
                              >
                                Go to Card
                              </Button>
                              {user?.isAdmin ? (
                                <Box mt={2}>
                                  <Button
                                    color="secondary"
                                    onClick={() =>
                                      handleDelete(offer.offeredCard?._id)
                                    }
                                    variant="contained"
                                  >
                                    Delete Card
                                  </Button>
                                </Box>
                              ) : (
                                ""
                              )}
                            </Stack>
                            <Box
                              sx={{
                                display: "flex",
                                justifyContent: "center",
                              }}
                            >
                              <img
                                src={
                                  offer.offeredCard?.tier === "Bronze"
                                    ? Bronzes
                                    : offer.offeredCard?.tier === "Silver"
                                    ? Silvers
                                    : offer.offeredCard?.tier === "Gold"
                                    ? Golds
                                    : offer.offeredCard?.tier === "Platinium"
                                    ? Platinum
                                    : offer.offeredCard?.tier === "Diamond"
                                    ? Diamonds
                                    : ""
                                }
                                width="226px"
                                alt="Forwards Pack"
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      </Box>
                    </Grid>
                  </>
                ) : (
                  ""
                )
              )}
            </Grid>
          )}
        </Box>
        {!isLoading && <Footer />}
      </Box>
    </Box>
  );
}
