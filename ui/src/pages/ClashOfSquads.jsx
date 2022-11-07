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
  ListItemText,
  MenuItem,
  OutlinedInput,
  Select,
  Typography,
} from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import GoldCard from "../images/pack-background4.png";
import PitchImage from "../images/Soccer_Field_Transparant.svg.png";
import Footer from "../components/Footer";
import Bronzes from "../images/Bronze-Card.png";
import Silvers from "../images/Silver-Card.png";
import Platinum from "../images/Platinium-Card.png";
import Diamonds from "../images/pack-background2.png";
import { useLocation, useParams } from "react-router";

export default function ClashOfSquads() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [userSquad, setUserSquad] = useState([]);
  const [opponentSquad, setOpponentSquad] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const location = useLocation();

  useEffect(() => {
    console.log(location.pathname.split("/")[[2]]);
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

    setIsLoading(true);

    axios
      .get(
        `http://localhost:5000/api/squad/getSquadArray/${
          location.pathname.split("/")[[2]]
        }`
      )
      .then((res) => res.data)
      .then((res) => {
        setOpponentSquad(res[0]);
        console.log("opp" + JSON.stringify(opponentSquad));
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));

    axios
      .get(`http://localhost:5000/api/squad/getSquadArray/${user?._id}`)
      .then((res) => res.data)
      .then((res) => {
        setUserSquad(res[0]);
        console.log(userSquad);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
  }, [user?._id]);

  return (
    <Box
      sx={{
        height: "100vh",
        width: "99%",
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
        <Box sx={{ position: "relative" }} mb={2}>
          <Typography
            gutterBottom
            variant="h3"
            mt={4}
            color="white"
            textAlign="center"
          >
            Clash of Squads
          </Typography>
          <Typography
            variant="subtitle1"
            color="white"
            textAlign="center"
            gutterBottom
          >
            Build your squad and challenge to other players!
          </Typography>
          <Divider sx={{ color: "white", margin: "40px" }} />
          <Box
            mt={8}
            sx={{
              flex: "1 180px",
              display: "flex",
              justifyContent: "center",
              gap: "50px",
            }}
          >
            <Box sx={{ flex: "1" }}>
              <Box mt={2} mb={2}>
                <Typography textAlign="center" variant="h5" color="white">
                  Your Squad
                </Typography>
              </Box>
              <img
                src={PitchImage}
                style={{
                  position: "absolute",
                  minWidth: "40%",
                  height: "900px",
                }}
                alt="background"
              />
              <Box sx={{ position: "relative" }}>
                <Box
                  mt={8}
                  sx={{
                    flex: "1 180px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "50px",
                  }}
                >
                  {userSquad &&
                    userSquad.strikers?.map((striker, idx) => (
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
                  {userSquad &&
                    userSquad?.midfields?.map((midfield, idx) => (
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
                    gap: "2px",
                  }}
                >
                  {userSquad &&
                    userSquad.defenders?.map((defender, idx) => (
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
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <Typography variant="h6" color="white">
                        {userSquad?.goalkeeper?.position}
                      </Typography>
                      <Typography variant="h6" color="white">
                        {userSquad?.goalkeeper?.rating}
                      </Typography>
                      <Typography color="white">
                        {userSquad?.goalkeeper?.lastname}
                      </Typography>
                    </Box>
                    <img
                      width="100px"
                      src={
                        userSquad?.goalkeeper?.tier === "Bronze"
                          ? Bronzes
                          : userSquad?.goalkeeper?.tier === "Silver"
                          ? Silvers
                          : userSquad?.goalkeeper?.tier === "Gold"
                          ? GoldCard
                          : userSquad?.goalkeeper?.tier === "Platinium"
                          ? Platinum
                          : userSquad?.goalkeeper?.tier === "Diamond"
                          ? Diamonds
                          : Platinum
                      }
                      alt="goalkeeper"
                    />
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box sx={{ flex: "0.44" }}>
              <Box mt={2}>
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h6"
                  color="white"
                >
                  Your Stats
                </Typography>
                <Divider sx={{ color: "white", marginBottom: "12px" }} />
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h5"
                  color="white"
                >
                  12W - 10L
                </Typography>
              </Box>
              <Box mt={4}>
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h6"
                  color="white"
                >
                  Opponent's Stats
                </Typography>
                <Divider sx={{ color: "white", marginBottom: "12px" }} />
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h5"
                  color="white"
                >
                  22W - 2L
                </Typography>
              </Box>
              <Box mt={6}>
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h6"
                  color="white"
                >
                  Your Squad Rating
                </Typography>
                <Divider sx={{ color: "white", marginBottom: "12px" }} />
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h5"
                  color="white"
                >
                  99
                </Typography>
              </Box>
              <Box mt={4}>
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h6"
                  color="white"
                >
                  Opponent's Squad Rating
                </Typography>
                <Divider sx={{ color: "white", marginBottom: "12px" }} />
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h5"
                  color="white"
                >
                  99
                </Typography>
              </Box>
              <Box mt={6}>
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h6"
                  color="white"
                >
                  Your Best Player
                </Typography>
                <Divider sx={{ color: "white", marginBottom: "12px" }} />
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h5"
                  color="white"
                >
                  Cristiano Ronaldo
                </Typography>
              </Box>
              <Box mt={4}>
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h6"
                  color="white"
                >
                  Opponent's Best Player
                </Typography>
                <Divider sx={{ color: "white", marginBottom: "12px" }} />
                <Typography
                  gutterBottom
                  textAlign="center"
                  variant="h5"
                  color="white"
                >
                  Lionel Messi
                </Typography>
              </Box>
              <Box
                mt={6}
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  flexDirection: "column",
                  gap: "12px",
                }}
              >
                <Button
                  sx={{ fontWeight: "600" }}
                  variant="contained"
                  color="inherit"
                >
                  Edit Squad
                </Button>
                <Button color="success" variant="contained">
                  Challenge the Opponent
                </Button>
              </Box>
            </Box>
            <Box
              sx={{
                flex: "1",
              }}
            >
              <Box mt={2}>
                <Box mt={2} mb={2}>
                  <Typography textAlign="center" variant="h5" color="white">
                    Your Opponent's Squad
                  </Typography>
                </Box>
                <img
                  src={PitchImage}
                  style={{
                    position: "absolute",
                    minWidth: "40%",
                    height: "900px",
                  }}
                  alt="background"
                />
                <Box sx={{ position: "relative" }}>
                  <Box
                    mt={8}
                    sx={{
                      flex: "1 180px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "50px",
                    }}
                  >
                    {opponentSquad &&
                      opponentSquad.strikers?.map((striker, idx) => (
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
                    {opponentSquad &&
                      opponentSquad?.midfields?.map((midfield, idx) => (
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
                      gap: "2px",
                    }}
                  >
                    {opponentSquad &&
                      opponentSquad.defenders?.map((defender, idx) => (
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
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Typography variant="h6" color="white">
                          {opponentSquad?.goalkeeper?.position}
                        </Typography>
                        <Typography variant="h6" color="white">
                          {opponentSquad?.goalkeeper?.rating}
                        </Typography>
                        <Typography color="white">
                          {opponentSquad?.goalkeeper?.lastname}
                        </Typography>
                      </Box>
                      <img
                        width="100px"
                        src={
                          opponentSquad?.goalkeeper?.tier === "Bronze"
                            ? Bronzes
                            : opponentSquad?.goalkeeper?.tier === "Silver"
                            ? Silvers
                            : opponentSquad?.goalkeeper?.tier === "Gold"
                            ? GoldCard
                            : opponentSquad?.goalkeeper?.tier === "Platinium"
                            ? Platinum
                            : opponentSquad?.goalkeeper?.tier === "Diamond"
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
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
