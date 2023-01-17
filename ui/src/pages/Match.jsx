import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import axios from "axios";
import { useLocation } from "react-router";

export default function Match() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [opponentSquad, setOpponentSquad] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [matchMinute, setMatchMinute] = useState(0);
  const [matchData, setMatchData] = useState({
    minute: 0,
    userScore: 0,
    opponentScore: 0,
    userPossesion: 50,
    opponentPossesion: 50,
    userFouls: 0,
    opponentFouls: 0,
    userYellowCards: 0,
    opponentYellowCards: 0,
    userYellowCardPlayers: [],
    opponentYellowCardPlayers: [],
    userRedCards: 0,
    opponentRedCards: 0,
    userRedCardPlayers: [],
    opponentRedCardPlayers: [],
    userShotsOnTarget: 0,
    opponentShotsOnTarget: 0,
    userShots: 0,
    opponentShots: 0,
    userPlayers: [],
    opponentPlayers: [],
  });

  const location = useLocation();

  useEffect(() => {
    setIsLoading(true);
    axios
      .get(
        `http://localhost:5000/api/squad/getSquadArray/${
          location.pathname.split("/")[2]
        }`
      )
      .then((res) => res.data)
      .then((res) => {
        setOpponentSquad(res[0]);
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
      .catch((err) => console.log(err))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      );
  }, []);

  const matchMinutes = [
    "0'",
    "5'",
    "10'",
    "15'",
    "20'",
    "25'",
    "30'",
    "35'",
    "40'",
    "45'",
    "50'",
    "55'",
    "60'",
    "65'",
    "70'",
    "75'",
    "80'",
    "85'",
    "90'",
  ];

  const extraTime = ["1'", "2'", "3'", "4'", "5'", "6'", "7'", "8'", "9'"];

  const shootingScripts = [
    " Shoots",
    " Sends a rocket",
    " Sends a very powerful shot",
    " Shoots from distance",
    " Shoots in the box",
  ];

  const passingScripts = [
    " Passing the ball around",
    " Sends a great pass",
    " Sends great cross",
    " Sending a good cross",
    " Sends the ball in",
  ];

  const defendingScripts = [
    " Great defending",
    " Tackles the ball",
    " Kicks out the ball",
    " Slide tackles",
  ];

  const keeperScripts = [" Saves the ball", " Great save", " Stops the ball"];

  const goalScripts = [" Goalllllll!", " Scores!", " Great goal!"];

  const winningScripts = [" Wins the game"];

  const defeatScripts = [" Lost the game"];

  const delay = 2500;

  return (
    <Box
      sx={{
        height: "100vh",
        width: "98%",
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
            opacity: "0.95",
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
        <Box sx={{ position: "relative" }} mb={2}>
          <Typography
            gutterBottom
            variant="h3"
            mt={4}
            color="white"
            textAlign="center"
          >
            Match Day
          </Typography>
          <Divider sx={{ color: "white", margin: "40px" }} />
        </Box>
      </Box>
    </Box>
  );
}
