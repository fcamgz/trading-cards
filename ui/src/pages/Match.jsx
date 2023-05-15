import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import axios from "axios";
import { useLocation, useNavigate } from "react-router";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";

export default function Match() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState();
  const [userSquad, setUserSquad] = useState();
  const [opponentSquad, setOpponentSquad] = useState([]);
  const [userScore, setUserScore] = useState(0);
  const [opponentScore, setOpponentScore] = useState(0);
  const [userSquadArray, setUserSquadArray] = useState([]);
  const [opponentSquadArray, setOpponentSquadArray] = useState([]);
  const [goalScorers, setGoalScorers] = useState([]);
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

  const [isResult, setIsResult] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();

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
      .catch((err) => console.log(err));

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
      .catch((err) => console.log(err))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      );

    axios
      .get(`http://localhost:5000/api/squad/getSquadArray/${user?._id}`)
      .then((res) => res.data)
      .then((res) => {
        setUserSquad(res[0]);
      })
      .catch((err) => console.log(err));
  }, [user?._id]);

  // match outcome logic
  useEffect(() => {
    var userStrikerRating = 0;
    var userMidfielderRating = 0;
    var userDefenderRating = 0;
    var userGoalkeeperRating = 0;
    var userSquadRating = 0;
    var userChances = 0;

    var opponentStrikerRating = 0;
    var opponentMidfielderRating = 0;
    var opponentDefenderRating = 0;
    var opponentGoalkeeperRating = 0;
    var opponentSquadRating = 0;
    var opponentChances = 0;

    userSquad?.strikers?.map((striker) => {
      setUserSquadArray((player) => [...player, striker]);
      userStrikerRating += striker.rating;
    });

    userSquad?.midfields?.map((midfielder) => {
      setUserSquadArray((player) => [...player, midfielder]);
      userMidfielderRating += midfielder.rating;
    });

    userSquad?.defenders?.map((defender) => {
      setUserSquadArray((player) => [...player, defender]);
      userDefenderRating += defender.rating;
    });

    userGoalkeeperRating = userSquad?.goalkeeper?.rating;

    userSquadRating =
      userStrikerRating +
      userMidfielderRating +
      userDefenderRating +
      userGoalkeeperRating;

    opponentSquad?.strikers?.map((striker) => {
      setOpponentSquadArray((player) => [...player, striker]);
      opponentStrikerRating += striker.rating;
    });

    opponentSquad?.midfields?.map((midfielder) => {
      setOpponentSquadArray((player) => [...player, midfielder]);
      opponentMidfielderRating += midfielder.rating;
    });

    opponentSquad?.defenders?.map((defender) => {
      setOpponentSquadArray((player) => [...player, defender]);
      opponentDefenderRating += defender.rating;
    });

    opponentGoalkeeperRating = opponentSquad?.goalkeeper?.rating;

    opponentSquadRating =
      opponentStrikerRating +
      opponentMidfielderRating +
      opponentDefenderRating +
      opponentGoalkeeperRating;

    console.log(
      `opponent striker r: ${opponentStrikerRating} midfielder r: ${opponentMidfielderRating} defence r: ${opponentDefenderRating} goalkeeper: ${opponentGoalkeeperRating}`
    );

    // based off on overall rating

    // 10 chances to roll dice a game if strikers 90+
    // 8 chances 80-90
    // 6 chances 70-80
    // 5 chances rest
    if (userStrikerRating / 2 >= 90) {
      userChances += 12;
    } else if (userStrikerRating >= 80 && userStrikerRating <= 90) {
      userChances += 10;
    } else if (userStrikerRating >= 70 && userStrikerRating <= 80) {
      userChances += 8;
    } else {
      userChances += 6;
    }

    if (opponentStrikerRating / 2 >= 90) {
      opponentChances += 12;
    } else if (opponentStrikerRating >= 80 && opponentStrikerRating <= 90) {
      opponentChances += 10;
    } else if (opponentStrikerRating >= 70 && opponentStrikerRating <= 80) {
      opponentChances += 8;
    } else {
      opponentChances += 6;
    }

    // +3 more chances if midfielders 90+
    // +2 more chances if midfielders 80-90
    // 1 more chance if midfielders 70-80

    if (userMidfielderRating / 4 >= 90) {
      userChances += 3;
    } else if (
      userMidfielderRating / 4 >= 80 &&
      userMidfielderRating / 4 <= 90
    ) {
      userChances += 2;
    } else if (
      userMidfielderRating / 4 >= 70 &&
      userMidfielderRating / 4 <= 80
    ) {
      userChances += 1;
    }

    if (opponentMidfielderRating / 4 >= 90) {
      opponentChances += 3;
    } else if (
      opponentMidfielderRating / 4 >= 80 &&
      opponentMidfielderRating / 4 <= 90
    ) {
      opponentChances += 2;
    } else if (
      opponentMidfielderRating / 4 >= 70 &&
      opponentMidfielderRating / 4 <= 80
    ) {
      opponentChances += 1;
    }

    // -4 chances for defenders 90+
    // -3 chances for defenders 80-90
    // -2 chances for defenders 70-80

    if (userDefenderRating / 4 >= 90) {
      opponentChances -= 4;
    } else if (userDefenderRating / 4 >= 80 && userDefenderRating / 4 <= 90) {
      opponentChances -= 3;
    } else if (userDefenderRating / 4 >= 70 && userDefenderRating / 4 <= 80) {
      opponentChances -= 2;
    }

    if (opponentDefenderRating / 4 >= 90) {
      userChances -= 4;
    } else if (
      opponentDefenderRating / 4 >= 80 &&
      opponentDefenderRating / 4 <= 90
    ) {
      userChances -= 3;
    } else if (
      opponentDefenderRating / 4 >= 70 &&
      opponentDefenderRating / 4 <= 80
    ) {
      userChances -= 2;
    }

    // -3 chances if goalkeeper is 90+
    // -2 chances if goalkeeper is 80-90
    // -1 chance for rest
    if (userGoalkeeperRating >= 90) {
      opponentChances -= 3;
    } else if (userGoalkeeperRating >= 80 && userGoalkeeperRating <= 90) {
      opponentChances -= 2;
    } else if (userGoalkeeperRating >= 70 && userGoalkeeperRating <= 80) {
      opponentChances -= 1;
    }

    if (opponentGoalkeeperRating >= 90) {
      userChances -= 3;
    } else if (
      opponentGoalkeeperRating >= 80 &&
      opponentGoalkeeperRating <= 90
    ) {
      userChances -= 2;
    } else if (
      opponentGoalkeeperRating >= 70 &&
      opponentGoalkeeperRating <= 80
    ) {
      userChances -= 1;
    }
    console.log("user chances: " + userChances);
    console.log("opponent chances: " + opponentChances);

    // if number is 1 - 2 - 3 than it means goal
    console.log(Math.round(Math.random() * 10));

    // user chances
    setUserScore(calculateOutcome(userChances, "user"));
    // opponent chances
    setOpponentScore(calculateOutcome(opponentChances, "opp"));

    setIsResult(true);
  }, []);

  function shuffle(array) {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  }

  useEffect(() => {
    var userScoreCounter = 0;
    var opponentScoreCounter = 0;

    if (userScore && opponentScore) {
      for (var i = 1; i < userScore + opponentScore; i++) {
        // randomly add one goal scorer from user and opponent
        // in random order
        // choose players based on rating
        if (userScore > userScoreCounter) {
          console.log(player);
          var player =
            userSquadArray[Math.floor(Math.random() * userSquadArray.length)];
          setGoalScorers((scorer) => [...scorer, player]);
          userScoreCounter++;
          console.log("player " + JSON.stringify(player));
        }

        if (opponentScore > opponentScoreCounter) {
          var oppPlayer =
            opponentSquadArray[
              Math.floor(Math.random() * opponentSquadArray.length)
            ];
          setGoalScorers((scorer) => [...scorer, oppPlayer]);
          opponentScoreCounter++;
        }
        // at the end shuffle the array
        shuffle(goalScorers);
      }
    }
    console.log(goalScorers);
  }, [userScore, opponentScore, isResult]);

  const calculateOutcome = (chances, user) => {
    let goals = 0;

    console.log(`chances of ${user}, chances: ${chances}`);

    for (let i = 0; i < chances; i++) {
      let random = Math.round(Math.random() * 100);

      if (random <= 20) {
        goals += 1;
      } else if (random >= 95) {
        goals += 2;
      } else if (random >= 50 && random <= 52) {
        goals += 3;
      }
    }
    return goals;
  };

  const chancesCalculator = (rating, position) => {
    let chancesAmount = 0;

    if (position === "strikers") {
      if (rating / 2 >= 90) {
        chancesAmount += 10;
      } else if (rating >= 80 && rating <= 90) {
        chancesAmount += 8;
      } else if (rating >= 70 && rating <= 80) {
        chancesAmount += 6;
      } else {
        chancesAmount += 5;
      }
    } else if (position === "midfields") {
      if (rating / 4 >= 90) {
        chancesAmount += 3;
      } else if (rating / 4 >= 80 && rating / 4 <= 90) {
        chancesAmount += 2;
      } else if (rating / 4 >= 70 && rating / 4 <= 80) {
        chancesAmount += 1;
      }
    } else if (position === "defenders") {
      if (rating / 4 >= 90) {
        chancesAmount -= 4;
      } else if (rating / 4 >= 80 && rating / 4 <= 90) {
        chancesAmount -= 3;
      } else if (rating / 4 >= 70 && rating / 4 <= 80) {
        chancesAmount -= 2;
      }
    } else {
      if (rating >= 90) {
        chancesAmount -= 3;
      } else if (rating >= 80 && rating <= 90) {
        chancesAmount -= 2;
      } else if (rating >= 70 && rating <= 80) {
        chancesAmount -= 1;
      }
    }

    return chancesAmount;
  };

  const midfieldsChances = () => {};

  const defendersChance = () => {};

  const goalKeepersChance = () => {};

  const handleAdvance = () => {
    var userOutcome = {};
    var opponentOutcome = {};

    if (userScore > opponentScore) {
      userOutcome = { wins: true };
      opponentOutcome = { defeats: true };
    } else if (userScore === opponentScore) {
      userOutcome = { draws: true };
      opponentOutcome = { draws: true };
    } else {
      userOutcome = { defeats: true };
      opponentOutcome = { wins: true };
    }

    axios
      .put(
        `http://localhost:5000/api/stats/${user?._id}/modifyStat`,
        userOutcome
      )
      .then((data) => console.log(data));

    axios
      .put(
        `http://localhost:5000/api/stats/${
          location.pathname.split("/")[2]
        }/modifyStat`,
        opponentOutcome
      )
      .then((data) => console.log(data));

    navigate("/stats");
  };

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
            Result
          </Typography>
          <Divider sx={{ color: "white", margin: "40px" }} />
          <Box mt={8}>
            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <Box sx={{ width: "50%" }}>
                <Box sx={{ display: "flex", justifyContent: "space-around" }}>
                  <Box>
                    <Typography sx={{ color: "white" }} variant="h2">
                      {userScore}
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: "white" }} variant="h2">
                      -
                    </Typography>
                  </Box>
                  <Box>
                    <Typography sx={{ color: "white" }} variant="h2">
                      {opponentScore}
                    </Typography>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box textAlign="center" mt={6}>
              <Button onClick={handleAdvance}>Advance</Button>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
