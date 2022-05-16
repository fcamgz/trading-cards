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
  const [teamRating, setTeamRating] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [goalkeeperRating, setGoalkeeperRating] = useState("");
  const [defendersRating, setDefendersRating] = useState(0);
  const [midfieldersRating, setMidfieldersRating] = useState(0);
  const [strikersRating, setStrikersRating] = useState(0);

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

    const fetchData = async () => {
      await axios
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
      await axios
        .get(`http://localhost:5000/api/cards/userCollection/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          setCardData(res);
          console.log(res);
          console.log("fetch card stuff");
        })
        .catch((err) => console.log(err));

      /*
        // get squad
      await axios
        .get(`http://localhost:5000/api/squad/getSquad/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          setSquad(res[0]);
          setSquadArray(res);
          console.log("Squad array " + squadArray);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };
    */
      // get squad array
      await axios
        .get(`http://localhost:5000/api/squad/getSquadArray/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          setSquad(res[0]);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));

      // get goalkeeper rating
      await axios
        .get(`http://localhost:5000/api/squad/getGoalkeeperRating/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          setGoalkeeperRating(res[0].goalkeeper?.rating);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));

      // get defenders rating
      await axios
        .get(`http://localhost:5000/api/squad/getDefendersRating/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          setDefendersRating(res.total);
          console.log(`Defenders rating ${res}`);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));

      // get midfielders rating
      await axios
        .get(
          `http://localhost:5000/api/squad/getMidfieldersRating/${user?._id}`
        )
        .then((res) => res.data)
        .then((res) => {
          setMidfieldersRating(res.total);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));

      // get strikers rating
      await axios
        .get(`http://localhost:5000/api/squad/getStrikersRating/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          setStrikersRating(res.total);
          setIsLoading(false);
        })
        .catch((err) => console.log(err));
    };

    /*
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
      .then(() => {
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
      })
      .then(() => {
        // get squad
        axios
          .get(`http://localhost:5000/api/squad/getSquad/${user?._id}`)
          .then((res) => res.data)
          .then((res) => {
            setSquad(res[0]);
            setSquadArray(res);
            console.log("Squad array " + squadArray);
            setIsLoading(false);
          })
          .catch((err) => console.log(err));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
      */
    // calculateTeamRating();

    fetchData();
  }, [user?._id, updated]);

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
    if (squad?._id !== "") {
      axios
        .post(
          `http://localhost:5000/api/squad/modifySquadArray/${squad?._id}`,
          {
            strikers: [squad.striker1, squad.striker2],
            midfields: [
              squad.midfield1,
              squad.midfield2,
              squad.midfield3,
              squad.midfield4,
            ],
            defenders: [
              squad.centerBack1,
              squad.centerBack2,
              squad.centerBack3,
              squad.centerBack4,
            ],
            goalkeeper: squad.goalkeeper,
            owner: user?._id,
          }
        )
        .then((res) => res.data)
        .then((res) => {
          console.log("Squad updated " + res);
        })
        .catch((err) => console.log(err));
    } else {
      axios
        .post(`http://localhost:5000/api/squad/createSquadArray`, {
          strikers: [squad.striker1, squad.striker2],
          midfields: [
            squad.midfield1,
            squad.midfield2,
            squad.midfield3,
            squad.midfield4,
          ],
          defenders: [
            squad.centerBack1,
            squad.centerBack2,
            squad.centerBack3,
            squad.centerBack4,
          ],
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
                  <Box mt={4} sx={{ flex: "1 160px" }}>
                    <Box
                      mt={4}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                      }}
                    >
                      <FormControl sx={{ m: 1, width: "20%" }}>
                        <InputLabel>Striker 1</InputLabel>
                        <Select
                          value={strikersInput.striker1}
                          onChange={(e) => {
                            setStrikersInput({
                              ...strikersInput,
                              striker1: e.target.value,
                            });
                          }}
                          sx={{ backgroundColor: "white" }}
                          input={<OutlinedInput label="Striker1" />}
                          fullWidth
                        >
                          {cardData?.map((card) => (
                            <MenuItem key={card._id} value={card}>
                              <ListItemText
                                primary={`${card.lastname} - ${card.position}`}
                                secondary={card.rating}
                              />
                            </MenuItem>
                          ))}
                        </Select>
                      </FormControl>
                      <FormControl sx={{ m: 1, width: "20%" }}>
                        <InputLabel>Striker 2</InputLabel>
                        <Select
                          value={strikersInput.striker2}
                          onChange={(e) => {
                            setStrikersInput({
                              ...strikersInput,
                              striker2: e.target.value,
                            });
                          }}
                          sx={{ backgroundColor: "white" }}
                          input={<OutlinedInput label="Striker2" />}
                          fullWidth
                        >
                          {cardData?.map((card) => (
                            <MenuItem key={card._id} value={card}>
                              <ListItemText
                                primary={`${card.lastname} - ${card.position}`}
                                secondary={card.rating}
                              />
                            </MenuItem>
                          ))}
                        </Select>
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
                      <InputLabel>Midfield 1</InputLabel>
                      <Select
                        value={midfieldsInput.midfield1}
                        onChange={(e) => {
                          setMidfieldsInput({
                            ...midfieldsInput,
                            midfield1: e.target.value,
                          });
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Midfield1" />}
                        fullWidth
                      >
                        {cardData?.map((card) => (
                          <MenuItem key={card._id} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>Midfield 2</InputLabel>
                      <Select
                        value={midfieldsInput.midfield2}
                        onChange={(e) => {
                          setMidfieldsInput({
                            ...midfieldsInput,
                            midfield2: e.target.value,
                          });
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Midfield2" />}
                        fullWidth
                      >
                        {cardData?.map((card) => (
                          <MenuItem key={card._id} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>Midfield 3</InputLabel>
                      <Select
                        value={midfieldsInput.midfield3}
                        onChange={(e) => {
                          setMidfieldsInput({
                            ...midfieldsInput,
                            midfield3: e.target.value,
                          });
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Midfield3" />}
                        fullWidth
                      >
                        {cardData?.map((card) => (
                          <MenuItem key={card._id} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                  </Box>
                  <Box
                    mt={2}
                    sx={{
                      flex: "1 160px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>Midfield 4</InputLabel>
                      <Select
                        value={midfieldsInput.midfield4}
                        onChange={(e) => {
                          setMidfieldsInput({
                            ...midfieldsInput,
                            midfield4: e.target.value,
                          });
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Midfield4" />}
                        fullWidth
                      >
                        {cardData?.map((card) => (
                          <MenuItem key={card._id} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </Select>
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
                      <InputLabel>Centerback 1</InputLabel>
                      <Select
                        value={defendersInput.defender1}
                        onChange={(e) => {
                          setDefendersInput({
                            ...defendersInput,
                            defender1: e.target.value,
                          });
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Centerback1" />}
                        fullWidth
                      >
                        {cardData?.map((card) => (
                          <MenuItem key={card._id} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>Centerback 2</InputLabel>
                      <Select
                        value={defendersInput.defender2}
                        onChange={(e) => {
                          setDefendersInput({
                            ...defendersInput,
                            defender2: e.target.value,
                          });
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Centerback2" />}
                        fullWidth
                      >
                        {cardData?.map((card) => (
                          <MenuItem key={card._id} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>Centerback 3</InputLabel>
                      <Select
                        value={defendersInput.defender3}
                        onChange={(e) => {
                          setDefendersInput({
                            ...defendersInput,
                            defender3: e.target.value,
                          });
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Centerback3" />}
                        fullWidth
                      >
                        {cardData?.map((card) => (
                          <MenuItem key={card._id} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </Select>
                    </FormControl>
                    <FormControl sx={{ m: 1, width: "20%" }}>
                      <InputLabel>Centerback 4</InputLabel>
                      <Select
                        value={defendersInput.defender4}
                        onChange={(e) => {
                          setDefendersInput({
                            ...defendersInput,
                            defender4: e.target.value,
                          });
                        }}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Centerback4" />}
                        fullWidth
                      >
                        {cardData?.map((card) => (
                          <MenuItem key={card._id} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </Select>
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
                      <InputLabel>Goalkeeper</InputLabel>
                      <Select
                        value={goalkeeperInput}
                        onChange={(e) => setGoalkeeperInput(e.target.value)}
                        sx={{ backgroundColor: "white" }}
                        input={<OutlinedInput label="Goalkeeper" />}
                        fullWidth
                        defaultValue={cardData[1]}
                      >
                        {cardData?.map((card) => (
                          <MenuItem key={card._id} value={card}>
                            <ListItemText
                              primary={`${card.lastname} - ${card.position}`}
                              secondary={card.rating}
                            />
                          </MenuItem>
                        ))}
                      </Select>
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
                    {cardData.map((card) => (
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          padding: "18px 6px",
                          borderBottom: "2px solid #AFAFAF",
                        }}
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
                  minWidth: "43%",
                  height: "900px",
                }}
                alt="background"
              />
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
                  {squad &&
                    squad.strikers?.map((striker) => (
                      <Box key={striker._id} sx={{ display: "flex" }}>
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
                    gap: "10px",
                  }}
                >
                  {squad &&
                    squad?.midfields?.map((midfield, idx) => (
                      <Box key={midfield._id} sx={{ display: "flex" }}>
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
                    squad.defenders?.map((defender) => (
                      <Box key={defender._id} sx={{ display: "flex" }}>
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
                          : Platinum
                      }
                      alt="goalkeeper"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
