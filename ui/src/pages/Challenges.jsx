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
  Grid,
  Modal,
  Stack,
  TextField,
  Typography,
  Divider,
} from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";
import Bronzes from "../images/Bronze-Card.png";
import Silvers from "../images/Silver-Card.png";
import Golds from "../images/pack-background4.png";
import Platinum from "../images/Platinium-Card.png";
import Diamonds from "../images/pack-background2.png";
import PitchImage from "../images/Soccer_Field_Transparant.svg.png";
import SportsSoccerIcon from "@mui/icons-material/SportsSoccer";
import { makeStyles } from "@mui/styles";

export default function Challenges() {
  const [challengeData, setChallengeData] = useState([]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [updated, setUpdated] = useState(false);
  const [userSquad, setUserSquad] = useState([]);

  useEffect(() => {
    setIsLoading(true);
    const fetchData = async () => {
      // get user
      await axios
        .get("/api/getUsername", {
          headers: {
            "x-access-token": localStorage.getItem("token"),
          },
        })
        .then((res) => res.data)
        .then((data) => {
          if (data.isLoggedIn) {
            setUser(data.user);
            setIsLoggedIn(true);
          }
        })
        .catch((err) => console.log(err));

      // get challenges
      await axios
        .get("http://localhost:5000/api/squad/getSquadsAllowChallanges")
        .then((res) => res.data)
        .then((res) => {
          setChallengeData(res);
        })
        .catch((err) => console.log(err))
        .finally(() =>
          setTimeout(() => {
            setIsLoading(false);
          }, 500)
        );

      await axios
        .get(`http://localhost:5000/api/squad/getSquad/${user?._id}`)
        .then((res) => res.data)
        .then((res) => {
          console.log(res);
          setUserSquad(res[0]);
        });
    };
    fetchData();
  }, [updated]);

  const handleDoNotAllowPlayersToChallengeSquad = (squadId) => {
    axios
      .get(`http://localhost:5000/api/squad/doNotAllowChallange/${squadId}`)
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
            Challenges
          </Typography>
          <Typography
            variant="subtitle1"
            color="white"
            textAlign="center"
            gutterBottom
          >
            Challenge to other players and see who has the best squad!
          </Typography>
          <Divider sx={{ color: "white", margin: "40px" }} />
          {!isLoading && (
            <Grid
              container
              spacing={2}
              direction="row"
              justify="flex-start"
              alignItems="flex-start"
              p={8}
            >
              {challengeData &&
                challengeData?.map((challenge) => (
                  <Grid key={challenge._id} item xs={12} sm={6} md={4} lg={3}>
                    <Box>
                      {user?._id === challenge.owner ? (
                        <Card>
                          <CardHeader
                            title={`Your Squad - W0-L0`}
                            subheader={`Squad Owner: ${user?.username}`}
                          ></CardHeader>
                          <CardContent>
                            <Stack>
                              {user?.isAdmin ? (
                                <Box mb={2}>
                                  <Button
                                    onClick={() =>
                                      handleDoNotAllowPlayersToChallengeSquad(
                                        challenge._id
                                      )
                                    }
                                    color="error"
                                    variant="contained"
                                  >
                                    Remove Challenge From Challenges
                                  </Button>
                                </Box>
                              ) : (
                                ""
                              )}
                            </Stack>
                            <Box
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <img
                                src={PitchImage}
                                width="226px"
                                alt="Forwards Pack"
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      ) : (
                        <Card>
                          <CardHeader
                            title={`${challenge.ownerUsername}'s Squad 
                        W0-L0 `}
                            subheader={`Squad owner: ${challenge.ownerUsername} - Squad Rating ${challenge.rating} `}
                          ></CardHeader>

                          <CardContent>
                            <Stack>
                              <Button
                                href={`challenges/${challenge.owner}`}
                                variant="contained"
                                color="inherit"
                                sx={{ fontWeight: "600" }}
                              >
                                Challenge Player
                              </Button>
                              {user?.isAdmin ||
                              user?._id === challenge.owner ? (
                                <Box mt={2}>
                                  <Button color="error" variant="contained">
                                    Remove Card From Challenges
                                  </Button>
                                </Box>
                              ) : (
                                ""
                              )}
                            </Stack>
                            <Box
                              mt={2}
                              sx={{ display: "flex", justifyContent: "center" }}
                            >
                              <img
                                src={PitchImage}
                                width="226px"
                                alt="Forwards Pack"
                              />
                            </Box>
                          </CardContent>
                        </Card>
                      )}
                    </Box>
                  </Grid>
                ))}
            </Grid>
          )}
        </Box>
        {!isLoading && <Footer />}
      </Box>
    </Box>
  );
}
