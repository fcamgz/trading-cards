import React, { useEffect, useState } from "react";
import axios from "axios";
import StripeCheckout from "react-stripe-checkout";
import Navbar from "../components/Navbar";
import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Typography,
  Divider,
  Backdrop,
  CircularProgress,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import ViewCarouselIcon from "@mui/icons-material/ViewCarousel";
import HandshakeIcon from "@mui/icons-material/Handshake";
import CelebrationIcon from "@mui/icons-material/Celebration";
import CurrencyExchangeIcon from "@mui/icons-material/CurrencyExchange";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import ChatIcon from "@mui/icons-material/Chat";
import CampaignIcon from "@mui/icons-material/Campaign";
import DashboardIcon from "@mui/icons-material/Dashboard";
import DirectionsRunIcon from "@mui/icons-material/DirectionsRun";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import LeaderboardIcon from "@mui/icons-material/Leaderboard";

import Footer from "../components/Footer";
import { useNavigate } from "react-router";
import { withStyles } from "@mui/styles";

const styles = {
  box: {
    "&:hover": {
      background: "#E5E4E2",
    },
  },
};

function UserDashboard(props) {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(true);

  const navigate = useNavigate();

  const onOpened = () => {
    console.log("opened");
  };

  const onClosed = () => {
    console.log("Closed");
  };

  useEffect(() => {
    setIsLoading(true);
    try {
      // get cards
      axios
        .get("http://localhost:5000/api/cards/")
        .then((res) => res.data)
        .then((res) => {
          setCardData(res);
          console.log(res);
        })
        .catch((err) => console.log(err));
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
          }
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        margin: 0,
        overflowX: "hidden",
      }}
    >
      <Backdrop
        sx={{ color: "#fff", zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={isLoading}
      >
        <CircularProgress color="inherit" />
      </Backdrop>
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Box
        container
        sx={{ position: "relative", margin: 0, height: "auto", width: "100vw" }}
      >
        <img
          src={BackgroundImage}
          style={{
            opacity: "0.95",
            position: "fixed",
            left: 0,
            top: 0,
            width: "100vw",
            height: "auto",
            zIndex: 0,
            margin: 0,
            minHeight: "100%",
            minWidth: "1024px",
            overflow: "hidden",
          }}
          alt="background"
        />
        <Box sx={{ position: "relative" }} mb={2}>
          <Typography
            gutterBottom
            color="white"
            variant="h3"
            textAlign="center"
            mt={4}
          >
            Dashboard
          </Typography>
          <Divider sx={{ color: "white", margin: "40px" }} />
          {!isLoading && (
            <Box>
              <Typography mt={2} textAlign="center" variant="h6" color="white">
                Available Funds: ${user?.moneyBalance}
              </Typography>
              <Typography mt={1} textAlign="center" variant="h6" color="white">
                Coins: {user?.coinBalance} TCC
              </Typography>
            </Box>
          )}
          <Grid
            mt={6}
            sx={{
              display: "flex",
              justifyContent: "space-around",
              width: "100%",
              height: "100%",
            }}
            container
          >
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/myCards")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      My Cards
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <ViewCarouselIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/modifySquad")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      My Squad
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <DirectionsRunIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/challenges")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Challenge Players
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <SportsSoccerIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/stats")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Leaderboard
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <LeaderboardIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/trades")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Trade Market
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <StorefrontIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/tradeOffers")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Trade Offers
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <HandshakeIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/packs")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Open Packs
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CelebrationIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/announcements")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Announcements
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CampaignIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/chat")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Chat
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <ChatIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/buyCoins")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Buy Coins
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <CurrencyExchangeIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/addFunds")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      Add Funds
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <LocalAtmIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
            <Box sx={{ padding: "20px" }}>
              <Card sx={{ width: "300px" }} className={props.classes.box}>
                <CardActionArea onClick={() => navigate("/cards")}>
                  <CardContent>
                    <Typography
                      textAlign="center"
                      gutterBottom
                      variant="h5"
                      component="div"
                    >
                      All Cards
                    </Typography>
                    <Box sx={{ display: "flex", justifyContent: "center" }}>
                      <DashboardIcon sx={{ fontSize: "140px" }} />
                    </Box>
                  </CardContent>
                </CardActionArea>
              </Card>
            </Box>
          </Grid>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}

export default withStyles(styles)(UserDashboard);
