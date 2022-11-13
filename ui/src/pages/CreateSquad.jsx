import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  FormControl,
  InputLabel,
  List,
  ListItemText,
  MenuItem,
  OutlinedInput,
  Paper,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import GoldCard from "../images/pack-background4.png";
import Bronzes from "../images/Bronze-Card.png";
import Silvers from "../images/Silver-Card.png";
import Platinum from "../images/Platinium-Card.png";
import Diamonds from "../images/pack-background2.png";
import PitchImage from "../images/Soccer_Field_Transparant.svg.png";
import Footer from "../components/Footer";
import { platform } from "os";

export default function CreateSquad() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [squad, setSquad] = useState([]);
  const [squadArray, setSquadArray] = useState([]);
  const [strikersInput, setStrikersInput] = useState([
    {
      striker1: {},
      striker2: {},
    },
  ]);
  const [midfieldsInput, setMidfieldsInput] = useState([
    {
      midfield1: {},
      midfield2: {},
      midfield3: {},
      midfield4: {},
    },
  ]);
  const [defendersInput, setDefendersInput] = useState([
    {
      defender1: {},
      defender2: {},
      defender3: {},
      defender4: {},
    },
  ]);
  const [goalkeeperInput, setGoalkeeperInput] = useState({});
  const [updated, setUpdated] = useState(false);
  const [modified, setModified] = useState(false);
  const [teamRating, setTeamRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [goalkeeperRating, setGoalkeeperRating] = useState("");
  const [defendersRating, setDefendersRating] = useState(0);
  const [midfieldersRating, setMidfieldersRating] = useState(0);
  const [strikersRating, setStrikersRating] = useState(0);
  const [squadExist, setSquadExist] = useState(false);

  /*
  const calculateTeamRating = () => {
    let rating = 0;
    for (const player of squadArray) {
      rating += player.rating;
    }
    setTeamRating(rating / squad.length);
    return teamRating;
  };
  */

  const data = [
    { id: 1 },
    { id: 2 },
    { id: 3 },
    { id: 4 },
    { id: 5 },
    { id: 6 },
    { id: 7 },
    { id: 8 },
    { id: 9 },
    { id: 10 },
    { id: 11 },
  ];

  useEffect(() => {
    setIsLoading(true);
    try {
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

      // get cards
      axios
        .get(`http://localhost:5000/api/cards/userCollection/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          setCardData(res);
          console.log(res);
          console.log("fetch card stuff");
        })
        .catch((err) => console.log(err));

      // get squad array
      axios
        .get(`http://localhost:5000/api/squad/getSquadArray/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          setSquad(res[0]);
          setSquadExist(true);
          // setStrikersInput({
          //   striker1: res[0].strikers[0],
          //   striker2: res[0].strikers[1],
          // });
          setStrikersInput({
            striker1: res[0]?.strikers[0],
            striker2: res[0]?.strikers[1],
          });
          setMidfieldsInput({
            midfield1: res[0]?.midfields[0],
            midfield2: res[0]?.midfields[1],
            midfield3: res[0]?.midfields[2],
            midfield4: res[0]?.midfields[3],
          });
          setDefendersInput({
            defender1: res[0]?.defenders[0],
            defender2: res[0]?.defenders[1],
            defender3: res[0]?.defenders[2],
            defender4: res[0]?.defenders[3],
          });
          setGoalkeeperInput(res[0]?.goalkeeper);
        })
        .catch((err) => console.log(err));

      // get goalkeeper rating
      axios
        .get(`http://localhost:5000/api/squad/getGoalkeeperRating/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          setGoalkeeperRating(res[0]?.goalkeeper?.rating);
        })
        .catch((err) => console.log(err));
    } catch (err) {
      console.log(err);
    } finally {
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    }
    if (squadExist) {
      // get goalkeeper rating
      axios
        .get(`http://localhost:5000/api/squad/getGoalkeeperRating/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          console.log(`goalkeeper ${res[0].goalkeeper}`);
          setGoalkeeperRating(res[0].goalkeeper?.rating);
        })
        .catch((err) => console.log(err));

      // get defenders rating
      axios
        .get(`http://localhost:5000/api/squad/getDefendersRating/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          setDefendersRating(res.total);
          console.log(`Defenders rating ${res}`);
        })
        .catch((err) => console.log(err));
    }
    // get midfielders rating
    axios
      .get(`http://localhost:5000/api/squad/getMidfieldersRating/${user?._id}`)
      .then((res) => res.data)
      .then((res) => {
        setMidfieldersRating(res.total);
      })
      .catch((err) => console.log(err));

    // get strikers rating
    axios
      .get(`http://localhost:5000/api/squad/getStrikersRating/${user?._id}`)
      .then((res) => res.data)
      .then((res) => {
        setStrikersRating(res.total);
      })
      .catch((err) => console.log(err));

    setModified(true);
    // if squad exist then set card data to chosen squad excluding
  }, [user?._id, updated]);

  useEffect(() => {
    setCardData(
      cardData.filter(
        (item) =>
          item._id !== strikersInput?.striker1?._id ||
          item._id !== strikersInput?.striker2?._id ||
          item._id !== midfieldsInput?.midfield1?._id ||
          item._id !== midfieldsInput?.midfield2?._id ||
          item._id !== midfieldsInput?.midfield3?._id ||
          item._id !== midfieldsInput?.midfield4?._id ||
          item._id !== defendersInput?.defender1?._id ||
          item._id !== defendersInput?.defender2?._id ||
          item._id !== defendersInput?.defender3?._id ||
          item._id !== defendersInput?.defender4?._id ||
          item._id !== goalkeeperInput?._id
      )
    );
    console.log("squadArray " + JSON.stringify(midfieldsInput));
  }, []);

  /*
  const handleSubmit = () => {
    if (squad?._id !== "") {
      axios
        .post(`http://localhost:5000/api/squad/modify/${squad?._id}`, squad)
        .then((res) => res.data)
        .then((res) => {
          console.log("Squad updated " + res);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`http://localhost:5000/api/squad/create`, {
          striker1: squad.striker1,
          striker2: squad.striker2,
          midfield1: squad.midfield1,
          midfield2: squad.midfield2,
          midfield3: squad.midfield3,
          midfield4: squad.midfield4,
          centerBack1: squad.centerBack1,
          centerBack2: squad.centerBack2,
          centerBack3: squad.centerBack3,
          centerBack4: squad.centerBack4,
          goalkeeper: squad.goalkeeper,
          owner: user?._id,
        })
        .then((res) => res.data)
        .then((res) => {
          console.log("Squad created " + res);
        })
        .catch((err) => console.log(err));
    }
    setUpdated(!updated);
  };
  */

  const handleSubmit = () => {
    if (squad?._id !== undefined) {
      console.log("modify squad");
      if (
        strikersInput.striker1.position !== "ST" ||
        strikersInput.striker2.position !== "ST"
      ) {
        console.log("Player can't play here");
      } else if (
        midfieldsInput.midfield1.position !== "MD" ||
        midfieldsInput.midfield2.position !== "MD" ||
        midfieldsInput.midfield3.position !== "MD" ||
        midfieldsInput.midfield4.position !== "MD"
      ) {
        console.log("Player for midfield can't play here");
      } else if (
        defendersInput.defender1.position !== "DEF" ||
        defendersInput.defender2.position !== "DEF" ||
        defendersInput.defender3.position !== "DEF" ||
        defendersInput.defender4.position !== "DEF"
      ) {
        console.log("Player for defender can't play here");
      } else if (goalkeeperInput.position !== "GL") {
        console.log("Player cannot play here");
      }
      axios
        .post(
          `http://localhost:5000/api/squad/modifySquadArray/${squad?._id}`,
          {
            strikers: [strikersInput.striker1, strikersInput.striker2],
            midfields: [
              midfieldsInput.midfield1,
              midfieldsInput.midfield2,
              midfieldsInput.midfield3,
              midfieldsInput.midfield4,
            ],
            defenders: [
              defendersInput.defender1,
              defendersInput.defender2,
              defendersInput.defender3,
              defendersInput.defender4,
            ],
            goalkeeper: goalkeeperInput,
            owner: user?._id,
          }
        )
        .then((res) => res.data)
        .then((res) => {
          console.log("Squad updated " + res);
        })
        .catch((err) => console.log(err));
    } else {
      console.log("create squad");
      console.log(squad);
      axios
        .post(`http://localhost:5000/api/squad/createSquadArray`, {
          strikers: [strikersInput.striker1, strikersInput.striker2],
          midfields: [
            midfieldsInput.midfield1,
            midfieldsInput.midfield2,
            midfieldsInput.midfield3,
            midfieldsInput.midfield4,
          ],
          defenders: [
            defendersInput.defender1,
            defendersInput.defender2,
            defendersInput.defender3,
            defendersInput.defender4,
          ],
          goalkeeper: goalkeeperInput,
          owner: user?._id,
          ownerUsername: user?.username,
        })
        .then((res) => res.data)
        .then((res) => {
          console.log("Squad created " + res);
          axios.post("http://localhost:5000/api/stats/createStat", {
            userId: user?._id,
            username: user?.username,
          });
        })
        .catch((err) => console.log(err));
    }
    setUpdated(!updated);
  };

  const handleAllowPlayersToChallengeSquad = () => {
    axios
      .get(`http://localhost:5000/api/squad/allowChallange/${squad._id}`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setUpdated(!updated);
      })
      .catch((err) => console.log(err));
  };

  const handleDoNotAllowPlayersToChallengeSquad = () => {
    axios
      .get(`http://localhost:5000/api/squad/doNotAllowChallange/${squad._id}`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setUpdated(!updated);
      })
      .catch((err) => console.log(err));
  };

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
      <Navbar user={user} isLoggedIn={isLoggedIn} />
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
        <Box sx={{ position: "relative" }} mb={8}>
          <Typography
            gutterBottom
            variant="h3"
            mt={4}
            color="white"
            textAlign="center"
          >
            Costumize Squad
          </Typography>
          <Typography
            variant="subtitle1"
            color="white"
            textAlign="center"
            gutterBottom
          >
            Customize your squad and challenge other players!
          </Typography>
          <Divider sx={{ color: "white", margin: "40px" }} />

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-around",
              height: "100vh",
              padding: "0 60px",
            }}
          >
            <Box sx={{ flex: "0.9" }}>
              {squad?.isChallenge === "true" ? (
                <Box>
                  <Button
                    onClick={handleDoNotAllowPlayersToChallengeSquad}
                    variant="contained"
                    color="error"
                  >
                    Don't Allow Players to Challenge your Squad
                  </Button>
                </Box>
              ) : (
                <Box>
                  <Button
                    onClick={handleAllowPlayersToChallengeSquad}
                    variant="contained"
                    color="success"
                  >
                    Allow Players to Challenge your Squad
                  </Button>
                </Box>
              )}
              <Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    flexWrap: "wrap",
                    flexDirection: "column",
                    alignItems: "space-between",
                  }}
                >
                  <Box mt={4} sx={{ flex: "1 140px" }}>
                    <Box
                      mt={4}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <FormControl sx={{ m: 1, width: "20%" }}>
                        <InputLabel>
                          {strikersInput.striker1?.lastname}
                        </InputLabel>
                        <TextField
                          select
                          value={
                            strikersInput.striker1 ? strikersInput.striker1 : ""
                          }
                          onChange={(e) => {
                            setStrikersInput({
                              ...strikersInput,
                              striker1: e.target.value,
                            });
                            setCardData(
                              cardData.filter((item) => item !== e.target.value)
                            );
                          }}
                          sx={{ backgroundColor: "white" }}
                          input={<OutlinedInput label="Striker1" />}
                          fullWidth
                          defaultValue={strikersInput.striker1}
                        >
                          {cardData?.map((card, idx) => (
                            <MenuItem key={idx} value={card}>
                              <ListItemText
                                primary={`${card.lastname} - ${card.position}`}
                                secondary={card.rating}
                              />
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                      <FormControl sx={{ m: 1, width: "20%" }}>
                        <InputLabel>
                          {strikersInput.striker2?.lastname}
                        </InputLabel>
                        <TextField
                          select
                          value={
                            strikersInput.striker2 ? strikersInput.striker2 : ""
                          }
                          onChange={(e) => {
                            setStrikersInput({
                              ...strikersInput,
                              striker2: e.target.value,
                            });
                            setCardData(
                              cardData.filter((item) => item !== e.target.value)
                            );
                          }}
                          sx={{ backgroundColor: "white" }}
                          input={<OutlinedInput />}
                          fullWidth
                          defaultValue={strikersInput.striker2}
                        >
                          {cardData?.map((card, idx) => (
                            <MenuItem key={idx + 10} value={card}>
                              <ListItemText
                                primary={`${card.lastname} - ${card.position}`}
                                secondary={card.rating}
                              />
                            </MenuItem>
                          ))}
                        </TextField>
                      </FormControl>
                    </Box>
                  </Box>
                  <Box
                    mt={6}
                    sx={{
                      flex: "1 160px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>
                        {midfieldsInput.midfield1?.lastname}
                      </InputLabel>
                      <TextField
                        select
                        value={
                          midfieldsInput.midfield1
                            ? midfieldsInput.midfield1
                            : ""
                        }
                        onChange={(e) => {
                          setMidfieldsInput({
                            ...midfieldsInput,
                            midfield1: e.target.value,
                          });
                          setCardData(
                            cardData.filter((item) => item !== e.target.value)
                          );
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Midfield1" />}
                        fullWidth
                        defaultValue={midfieldsInput.midfield1}
                      >
                        {cardData?.map((card, idx) => (
                          <MenuItem key={idx + 20} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>
                        {midfieldsInput.midfield2?.lastname}
                      </InputLabel>
                      <TextField
                        select
                        value={
                          midfieldsInput.midfield2
                            ? midfieldsInput.midfield2
                            : ""
                        }
                        onChange={(e) => {
                          setMidfieldsInput({
                            ...midfieldsInput,
                            midfield2: e.target.value,
                          });
                          setCardData(
                            cardData.filter((item) => item !== e.target.value)
                          );
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Midfield2" />}
                        fullWidth
                        defaultValue={midfieldsInput.midfield2}
                      >
                        {cardData?.map((card, idx) => (
                          <MenuItem key={idx + 30} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>
                        {midfieldsInput.midfield3?.lastname}
                      </InputLabel>
                      <TextField
                        select
                        value={
                          midfieldsInput.midfield3
                            ? midfieldsInput.midfield3
                            : ""
                        }
                        onChange={(e) => {
                          setMidfieldsInput({
                            ...midfieldsInput,
                            midfield3: e.target.value,
                          });
                          setCardData(
                            cardData.filter((item) => item !== e.target.value)
                          );
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Midfield3" />}
                        fullWidth
                        required
                        defaultValue={midfieldsInput.midfield3}
                      >
                        {cardData?.map((card, idx) => (
                          <MenuItem key={idx + 40} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>
                        {midfieldsInput.midfield4?.lastname}
                      </InputLabel>
                      <TextField
                        select
                        value={
                          midfieldsInput.midfield4
                            ? midfieldsInput.midfield4
                            : ""
                        }
                        onChange={(e) => {
                          setMidfieldsInput({
                            ...midfieldsInput,
                            midfield4: e.target.value,
                          });
                          setCardData(
                            cardData.filter((item) => item !== e.target.value)
                          );
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Midfield4" />}
                        fullWidth
                        required
                        defaultValue={midfieldsInput.midfield4}
                      >
                        {cardData?.map((card, idx) => (
                          <MenuItem key={idx + 50} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Box>
                  <Box
                    sx={{
                      flex: "1 160px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>
                        {defendersInput.defender1?.lastname}
                      </InputLabel>
                      <TextField
                        select
                        value={
                          defendersInput.defender1
                            ? defendersInput.defender1
                            : ""
                        }
                        onChange={(e) => {
                          setDefendersInput({
                            ...defendersInput,
                            defender1: e.target.value,
                          });
                          setCardData(
                            cardData.filter((item) => item !== e.target.value)
                          );
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Centerback1" />}
                        fullWidth
                        required
                        defaultValue={defendersInput?.defender1}
                      >
                        {cardData?.map((card, idx) => (
                          <MenuItem key={idx + 60} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>
                        {defendersInput.defender2?.lastname}
                      </InputLabel>
                      <TextField
                        select
                        value={
                          defendersInput.defender2
                            ? defendersInput.defender2
                            : ""
                        }
                        onChange={(e) => {
                          setDefendersInput({
                            ...defendersInput,
                            defender2: e.target.value,
                          });
                          setCardData(
                            cardData.filter((item) => item !== e.target.value)
                          );
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Centerback2" />}
                        fullWidth
                        required
                        defaultValue={defendersInput?.defender2}
                      >
                        {cardData?.map((card, idx) => (
                          <MenuItem key={idx + 70} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>
                        {defendersInput.defender3?.lastname}
                      </InputLabel>
                      <TextField
                        select
                        value={
                          defendersInput.defender3
                            ? defendersInput.defender3
                            : ""
                        }
                        onChange={(e) => {
                          setDefendersInput({
                            ...defendersInput,
                            defender3: e.target.value,
                          });
                          setCardData(
                            cardData.filter((item) => item !== e.target.value)
                          );
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Centerback3" />}
                        fullWidth
                        required
                        defaultValue={defendersInput?.defender3}
                      >
                        {cardData?.map((card, idx) => (
                          <MenuItem key={idx + 80} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>
                        {defendersInput.defender4?.lastname}
                      </InputLabel>
                      <TextField
                        value={
                          defendersInput.defender4
                            ? defendersInput.defender4
                            : ""
                        }
                        onChange={(e) => {
                          setDefendersInput({
                            ...defendersInput,
                            defender4: e.target.value,
                          });
                          setCardData(
                            cardData.filter((item) => item !== e.target.value)
                          );
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Centerback4" />}
                        fullWidth
                        required
                        defaultValue={defendersInput?.defender4}
                        select
                      >
                        {cardData?.map((card, idx) => (
                          <MenuItem key={idx + 90} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Box>
                  <Box
                    sx={{
                      flex: "1 160px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>{goalkeeperInput?.lastname}</InputLabel>
                      <TextField
                        value={goalkeeperInput ? goalkeeperInput : ""}
                        onChange={(e) => {
                          setGoalkeeperInput(e.target.value);
                          setCardData(
                            cardData.filter((item) => item !== e.target.value)
                          );
                        }}
                        sx={{ backgroundColor: "white" }}
                        select
                        fullWidth
                        defaultValue={cardData[1]}
                        required
                      >
                        {cardData?.map((card, idx) => (
                          <MenuItem key={idx + 100} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </TextField>
                    </FormControl>
                  </Box>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Button
                      onClick={handleSubmit}
                      size="large"
                      color="inherit"
                      variant="contained"
                    >
                      Done
                    </Button>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: "0.28" }}>
              <Box mt={6}>
                <Typography
                  gutterBottom
                  variant="h6"
                  textAlign="center"
                  color="white"
                >
                  Squad Rating
                </Typography>
                <Divider sx={{ color: "white" }} />
                <Typography
                  gutterBottom
                  variant="h6"
                  textAlign="center"
                  color="white"
                >
                  {Math.floor(
                    (strikersRating / 2 +
                      midfieldersRating / 4 +
                      defendersRating / 4 +
                      goalkeeperRating) /
                      4
                  )}
                </Typography>
              </Box>
              <Box mt={6}>
                <Typography
                  gutterBottom
                  variant="h6"
                  textAlign="center"
                  color="white"
                >
                  Strikers Rating
                </Typography>
                <Divider sx={{ color: "white" }} />
                <Typography
                  gutterBottom
                  variant="h6"
                  textAlign="center"
                  color="white"
                >
                  {Math.floor(strikersRating / 2)}
                </Typography>
              </Box>
              <Box mt={6}>
                <Typography
                  gutterBottom
                  variant="h6"
                  textAlign="center"
                  color="white"
                >
                  Midfielders Rating
                </Typography>
                <Divider sx={{ color: "white" }} />
                <Typography
                  gutterBottom
                  variant="h6"
                  textAlign="center"
                  color="white"
                >
                  {Math.floor(midfieldersRating / 4)}
                </Typography>
              </Box>
              <Box mt={6}>
                <Typography
                  gutterBottom
                  variant="h6"
                  textAlign="center"
                  color="white"
                >
                  Defenders Rating
                </Typography>
                <Divider sx={{ color: "white" }} />
                <Typography
                  gutterBottom
                  variant="h6"
                  textAlign="center"
                  color="white"
                >
                  {Math.floor(defendersRating / 4)}
                </Typography>
              </Box>
              <Box mt={6}>
                <Typography
                  gutterBottom
                  variant="h6"
                  textAlign="center"
                  color="white"
                >
                  Cards List
                </Typography>
                <Paper style={{ maxHeight: 320, overflow: "auto" }}>
                  <List>
                    {cardData.map((card, idx) => (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "18px 6px",
                          borderBottom: "2px solid #AFAFAF",
                        }}
                        key={idx + 110}
                      >
                        <Typography>{card.lastname}</Typography>
                        <Typography>{card.position}</Typography>
                        <Typography>{card.rating}</Typography>
                      </Box>
                    ))}
                  </List>
                </Paper>
              </Box>
            </Box>
            <Box
              sx={{
                flex: "1",
              }}
            >
              <img
                src={PitchImage}
                style={{
                  position: "absolute",
                  minWidth: "46%",
                  height: "900px",
                }}
                alt="background"
              />
              {!isLoading && (
                <Box sx={{ position: "relative" }}>
                  <Box
                    mt={6}
                    sx={{
                      flex: "1 160px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "40px",
                    }}
                  >
                    {!isLoading &&
                      squad.strikers?.map((striker, idx) => (
                        <Box key={idx + 120} sx={{ display: "flex" }}>
                          <Box>
                            <Typography variant="h6" color="white">
                              {striker.position}
                            </Typography>
                            <Typography variant="h6" color="white">
                              {striker.rating}
                            </Typography>
                            <Typography color="white">
                              {striker.lastname}
                            </Typography>
                          </Box>
                          <img
                            width="100px"
                            src={
                              striker.tier === "Bronze"
                                ? Bronzes
                                : striker.tier === "Silver"
                                ? Silvers
                                : striker.tier === "Gold"
                                ? GoldCard
                                : striker.tier === "Platinium"
                                ? Platinum
                                : striker.tier === "Diamond"
                                ? Diamonds
                                : Platinum
                            }
                            alt="Striker"
                          />
                        </Box>
                      ))}
                  </Box>
                  <Box
                    mt={10}
                    sx={{
                      flex: "1 160px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "2px",
                    }}
                  >
                    {squad &&
                      squad?.midfields?.map((midfield, idx) => (
                        <Box key={idx + 130} sx={{ display: "flex" }}>
                          <Box>
                            <Typography variant="h6" color="white">
                              {midfield.position}
                            </Typography>
                            <Typography variant="h6" color="white">
                              {midfield.rating}
                            </Typography>
                            <Typography color="white">
                              {midfield.lastname}
                            </Typography>
                          </Box>
                          <img
                            width="100px"
                            src={
                              midfield.tier === "Bronze"
                                ? Bronzes
                                : midfield.tier === "Silver"
                                ? Silvers
                                : midfield.tier === "Gold"
                                ? GoldCard
                                : midfield.tier === "Platinium"
                                ? Platinum
                                : midfield.tier === "Diamond"
                                ? Diamonds
                                : Platinum
                            }
                            alt="midfield"
                          />
                        </Box>
                      ))}
                  </Box>
                  <Box
                    mt={12}
                    sx={{
                      flex: "1 160px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "10px",
                    }}
                  >
                    {squad &&
                      squad.defenders?.map((defender, idx) => (
                        <Box key={idx + 140} sx={{ display: "flex" }}>
                          <Box>
                            <Typography variant="h6" color="white">
                              {defender.position}
                            </Typography>
                            <Typography variant="h6" color="white">
                              {defender.rating}
                            </Typography>
                            <Typography color="white">
                              {defender.lastname}
                            </Typography>
                          </Box>
                          <img
                            width="100px"
                            src={
                              defender.tier === "Bronze"
                                ? Bronzes
                                : defender.tier === "Silver"
                                ? Silvers
                                : defender.tier === "Gold"
                                ? GoldCard
                                : defender.tier === "Platinium"
                                ? Platinum
                                : defender.tier === "Diamond"
                                ? Diamonds
                                : Platinum
                            }
                            alt="centerBack1"
                          />
                        </Box>
                      ))}
                  </Box>
                  <Box
                    mt={10}
                    sx={{
                      flex: "1 160px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "120px",
                    }}
                  >
                    {squad?.goalkeeper?.lastname !== "" && (
                      <Box sx={{ display: "flex" }}>
                        <Box>
                          <Typography variant="h6" color="white">
                            {squad?.goalkeeper?.position}
                          </Typography>
                          <Typography variant="h6" color="white">
                            {squad?.goalkeeper?.rating}
                          </Typography>
                          <Typography color="white">
                            {squad?.goalkeeper?.lastname}
                          </Typography>
                        </Box>
                        {squad?.goalkeeper?.lastname !== "" ? (
                          <Box>
                            <img
                              width="100px"
                              src={
                                squad?.goalkeeper?.tier === "Bronze"
                                  ? Bronzes
                                  : squad?.goalkeeper?.tier === "Silver"
                                  ? Silvers
                                  : squad?.goalkeeper?.tier === "Gold"
                                  ? GoldCard
                                  : squad?.goalkeeper?.tier === "Platinium"
                                  ? Platinum
                                  : squad?.goalkeeper?.tier === "Diamond"
                                  ? Diamonds
                                  : ""
                              }
                              alt="goalkeeper"
                            />
                          </Box>
                        ) : (
                          ""
                        )}
                      </Box>
                    )}
                  </Box>
                </Box>
              )}
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
