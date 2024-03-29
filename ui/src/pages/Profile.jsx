import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Grid,
  Typography,
} from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import ProfilePicture from "../images/pack-background4.png";
import IconPicture1 from "../images/fifa-background2.png";
import IconPicture2 from "../images/red-card.png";
import IconPicture3 from "../images/fifa-background6.png";
import PersonIcon from "@mui/icons-material/Person";
import AlternateEmailIcon from "@mui/icons-material/AlternateEmail";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import HistoryIcon from "../images/history-icon.png";
import TradeIcon from "../images/trade-ıcon.png";
import Footer from "../components/Footer";
import ProfilePicture1 from "../images/pack-background4.png";
import ProfilePicture2 from "../images/Bronze-Card.png";
import ProfilePicture3 from "../images/Silver-Card.png";
import { makeStyles, useTheme } from "@mui/styles";
import { useNavigate } from "react-router";

const useStyles = makeStyles((theme) => ({
  mainContainer: {
    display: "flex",
    justifyContent: "space-around",
    flexDirection: "column",
    alignItems: "center",
    "@media screen and (max-width: 960px)": {},
  },
  pictureBlock: {
    width: "40%",
    height: "auto",
    display: "flex",
    justifyContent: "space-around",
    "@media screen and (max-width: 960px)": {
      flexDirection: "column",
      width: "90%",
      margin: "20px",
    },
  },
  infoBlock: {
    width: "40%",
    height: "auto",
    "@media screen and (max-width: 960px)": {
      width: "90%",
      margin: "20px",
    },
  },
}));

export default function Profile() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const classes = useStyles();
  const theme = useTheme();

  useEffect(() => {
    setIsLoading(true);
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
      .catch((err) => console.log(err))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1000)
      );
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100vw",
        overflowX: "hidden",
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
        sx={{
          position: "relative",
          height: "100vh",
          width: "100%",
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
            width: "99.2vw",
            height: "auto",
            zIndex: 0,
            margin: 0,
            minHeight: "100%",
            minWidth: "1024px",
          }}
          alt="background"
        />
        <Box sx={{ position: "relative" }} mb={2}>
          <Typography
            gutterBottom
            mt={6}
            variant="h3"
            color="white"
            textAlign="center"
          >
            Profile
          </Typography>
          <Divider sx={{ color: "white", margin: "40px" }} />
          {!isLoading && (
            <Box mt={4} className={classes.mainContainer}>
              <Box className={classes.pictureBlock}>
                <Box>
                  <Box
                    mt={2}
                    sx={{ display: "flex", justifyContent: "flex-start" }}
                  >
                    <Box mb={2}>
                      <Button
                        onClick={() => navigate("/editProfile")}
                        size="small"
                        variant="contained"
                        color="inherit"
                        sx={{ fontWeight: "600" }}
                      >
                        Edit Profile
                      </Button>
                    </Box>
                  </Box>
                  <img
                    src={
                      user?.img === "1"
                        ? ProfilePicture1
                        : user?.img === "2"
                        ? ProfilePicture2
                        : user?.img === "3"
                        ? ProfilePicture3
                        : ""
                    }
                    width="200px"
                  />
                </Box>
                <Box mt={2}>
                  <Box
                    sx={{
                      display: "flex",
                      alignItems: "center",
                      flexDirection: "column",
                      width: "100%",
                    }}
                  >
                    <Box
                      mt={2}
                      sx={{ display: "flex", justifyContent: "space-around" }}
                    >
                      <Box>
                        <Typography color="white">
                          Status - {user?.isAdmin ? "Admin" : "User"}
                        </Typography>
                        <Typography mt={1} color="white">
                          <PersonIcon />
                          {user?.username}
                        </Typography>
                        <Typography variant="subtitle2" mt={1} color="white">
                          <AlternateEmailIcon />
                          {user?.email}
                        </Typography>
                        <Typography variant="subtitle1" mt={1} color="white">
                          <MonetizationOnIcon />
                          {user?.coinBalance} TCC
                        </Typography>
                        <Typography variant="subtitle1" mt={1} color="white">
                          <LocalAtmIcon />${user?.moneyBalance}
                        </Typography>
                      </Box>
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
