import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Box,
  Button,
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

export default function ClashOfSquads() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [yourData, setYourData] = useState([]);
  const [opponentData, setOpponentData] = useState({
    striker: "",
    midfield1: "",
    midfield2: "",
    midfield3: "",
    midfield4: "",
    midfield5: "",
    centerBack1: "",
    centerBack2: "",
    centerBack3: "",
    centerBack4: "",
    goalKeeper: "",
  });

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
      .catch((err) => console.log(err));
  }, []);
  return (
    <Box
      sx={{
        height: "100vh",
        width: "100%",
        margin: 0,
        boxSizing: "border-box",
      }}
    >
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
            sx={{
              display: "flex",
              justifyContent: "space-around",
              height: "120vh",
              padding: "0 20px",
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
                    flex: "1 160px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "40px",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <Typography variant="h6" color="white">
                        ST
                      </Typography>
                      <Typography variant="h6" color="white">
                        99
                      </Typography>
                      <Typography color="white">Maguire</Typography>
                    </Box>
                    <img width="100px" src={GoldCard} />
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <Typography variant="h6" color="white">
                        ST
                      </Typography>
                      <Typography variant="h6" color="white">
                        99
                      </Typography>
                      <Typography color="white">Maguire</Typography>
                    </Box>
                    <img width="100px" src={GoldCard} />
                  </Box>
                </Box>
                <Box
                  mt={4}
                  sx={{
                    flex: "1 160px",
                    display: "flex",
                    justifyContent: "center",
                    gap: "80px",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <Typography variant="h6" color="white">
                        ST
                      </Typography>
                      <Typography variant="h6" color="white">
                        99
                      </Typography>
                      <Typography color="white">Maguire</Typography>
                    </Box>
                    <img width="100px" src={GoldCard} />
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <Typography variant="h6" color="white">
                        ST
                      </Typography>
                      <Typography variant="h6" color="white">
                        99
                      </Typography>
                      <Typography color="white">Maguire</Typography>
                    </Box>
                    <img width="100px" src={GoldCard} />
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <Typography variant="h6" color="white">
                        ST
                      </Typography>
                      <Typography variant="h6" color="white">
                        99
                      </Typography>
                      <Typography color="white">Maguire</Typography>
                    </Box>
                    <img width="100px" src={GoldCard} />
                  </Box>
                </Box>
                <Box
                  mt={4}
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
                        ST
                      </Typography>
                      <Typography variant="h6" color="white">
                        99
                      </Typography>
                      <Typography color="white">Maguire</Typography>
                    </Box>
                    <img width="100px" src={GoldCard} />
                  </Box>
                </Box>
                <Box
                  mt={4}
                  sx={{
                    flex: "1 160px",
                    display: "flex",
                    justifyContent: "center",
                  }}
                >
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <Typography variant="h6" color="white">
                        ST
                      </Typography>
                      <Typography variant="h6" color="white">
                        99
                      </Typography>
                      <Typography color="white">Maguire</Typography>
                    </Box>
                    <img width="100px" src={GoldCard} />
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <Typography variant="h6" color="white">
                        ST
                      </Typography>
                      <Typography variant="h6" color="white">
                        99
                      </Typography>
                      <Typography color="white">Maguire</Typography>
                    </Box>
                    <img width="100px" src={GoldCard} />
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <Typography variant="h6" color="white">
                        ST
                      </Typography>
                      <Typography variant="h6" color="white">
                        99
                      </Typography>
                      <Typography color="white">Maguire</Typography>
                    </Box>
                    <img width="100px" src={GoldCard} />
                  </Box>
                  <Box sx={{ display: "flex" }}>
                    <Box>
                      <Typography variant="h6" color="white">
                        ST
                      </Typography>
                      <Typography variant="h6" color="white">
                        99
                      </Typography>
                      <Typography color="white">Maguire</Typography>
                    </Box>
                    <img width="100px" src={GoldCard} />
                  </Box>
                </Box>
                <Box
                  mt={4}
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
                        ST
                      </Typography>
                      <Typography variant="h6" color="white">
                        99
                      </Typography>
                      <Typography color="white">Maguire</Typography>
                    </Box>
                    <img width="100px" src={GoldCard} />
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
                      flex: "1 160px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "40px",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Typography variant="h6" color="white">
                          ST
                        </Typography>
                        <Typography variant="h6" color="white">
                          99
                        </Typography>
                        <Typography color="white">Maguire</Typography>
                      </Box>
                      <img width="100px" src={GoldCard} />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Typography variant="h6" color="white">
                          ST
                        </Typography>
                        <Typography variant="h6" color="white">
                          99
                        </Typography>
                        <Typography color="white">Maguire</Typography>
                      </Box>
                      <img width="100px" src={GoldCard} />
                    </Box>
                  </Box>
                  <Box
                    mt={4}
                    sx={{
                      flex: "1 160px",
                      display: "flex",
                      justifyContent: "center",
                      gap: "80px",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Typography variant="h6" color="white">
                          ST
                        </Typography>
                        <Typography variant="h6" color="white">
                          99
                        </Typography>
                        <Typography color="white">Maguire</Typography>
                      </Box>
                      <img width="100px" src={GoldCard} />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Typography variant="h6" color="white">
                          ST
                        </Typography>
                        <Typography variant="h6" color="white">
                          99
                        </Typography>
                        <Typography color="white">Maguire</Typography>
                      </Box>
                      <img width="100px" src={GoldCard} />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Typography variant="h6" color="white">
                          ST
                        </Typography>
                        <Typography variant="h6" color="white">
                          99
                        </Typography>
                        <Typography color="white">Maguire</Typography>
                      </Box>
                      <img width="100px" src={GoldCard} />
                    </Box>
                  </Box>
                  <Box
                    mt={4}
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
                          ST
                        </Typography>
                        <Typography variant="h6" color="white">
                          99
                        </Typography>
                        <Typography color="white">Maguire</Typography>
                      </Box>
                      <img width="100px" src={GoldCard} />
                    </Box>
                  </Box>
                  <Box
                    mt={4}
                    sx={{
                      flex: "1 160px",
                      display: "flex",
                      justifyContent: "center",
                    }}
                  >
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Typography variant="h6" color="white">
                          ST
                        </Typography>
                        <Typography variant="h6" color="white">
                          99
                        </Typography>
                        <Typography color="white">Maguire</Typography>
                      </Box>
                      <img width="100px" src={GoldCard} />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Typography variant="h6" color="white">
                          ST
                        </Typography>
                        <Typography variant="h6" color="white">
                          99
                        </Typography>
                        <Typography color="white">Maguire</Typography>
                      </Box>
                      <img width="100px" src={GoldCard} />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Typography variant="h6" color="white">
                          ST
                        </Typography>
                        <Typography variant="h6" color="white">
                          99
                        </Typography>
                        <Typography color="white">Maguire</Typography>
                      </Box>
                      <img width="100px" src={GoldCard} />
                    </Box>
                    <Box sx={{ display: "flex" }}>
                      <Box>
                        <Typography variant="h6" color="white">
                          ST
                        </Typography>
                        <Typography variant="h6" color="white">
                          99
                        </Typography>
                        <Typography color="white">Maguire</Typography>
                      </Box>
                      <img width="100px" src={GoldCard} />
                    </Box>
                  </Box>
                  <Box
                    mt={4}
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
                          ST
                        </Typography>
                        <Typography variant="h6" color="white">
                          99
                        </Typography>
                        <Typography color="white">Maguire</Typography>
                      </Box>
                      <img width="100px" src={GoldCard} />
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
