import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  Typography,
} from "@mui/material";
import Bronzes from "../images/Bronze-Card.png";
import Silvers from "../images/Silver-Card.png";
import Golds from "../images/pack-background4.png";
import Diamonds from "../images/pack-background2.png";
import PackLogo4 from "../images/soccer-player-cards/rare/De Bruyne.png";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";

export default function Packs() {
  const [packData, setPackData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [user, setUser] = useState();
  const [buttonValue, setButtonValue] = useState("");
  const [isClicked, setIsClicked] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // get packs
    axios
      .get("http://localhost:5000/api/packs")
      .then((res) => res.data)
      .then((res) => {
        setPackData(res);
        console.log("Pack data" + res);
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      );

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
          setIsAdmin(data.user.isAdmin);
        }
      })
      .catch((err) => console.log(err));
  }, [isClicked]);

  const deletePack = (id) => {
    axios
      .delete(`http://localhost:5000/api/packs/${id}`)
      .then((res) => res.data)
      .then((res) => console.log(res))
      .catch((err) => console.log(err))
      .finally(() => setIsClicked(!isClicked));
  };

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
        mb={6}
        sx={{
          height: "100%",
          width: "100vw",
          position: "relative",
          margin: 0,
        }}
      >
        <img
          src={BackgroundImage}
          style={{
            position: "fixed",
            left: 0,
            top: 0,
            width: "99.1vw",
            height: "auto",
            zIndex: 0,
            margin: 0,
            minHeight: "100%",
            minWidth: "1024px",
            overflow: "hidden",
          }}
          alt="background"
        />
        <Box mt={6} mb={6} sx={{ position: "relative" }}>
          <Box>
            <Typography variant="h3" textAlign="center" color="white">
              Buy Packs
            </Typography>
            <Typography
              gutterBottom
              variant="body1"
              mt={2}
              textAlign="center"
              color="white"
            >
              Open packs and get 5 random cards per pack!
            </Typography>
            <Divider sx={{ color: "white", margin: "40px" }} />
          </Box>
          {!isLoading && (
            <Box>
              <Box>
                <Box
                  mt={4}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    flexDirection: "column",
                  }}
                >
                  <Typography color="white" variant="h6">
                    Money Amount: ${user?.moneyBalance}
                  </Typography>
                  <Typography color="white" variant="h6">
                    Coin Amount: {user?.coinBalance} TCC
                  </Typography>
                </Box>
              </Box>
              <Box
                component="form"
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box sx={{ zIndex: 1, width: "95%" }} mt={6}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-around",
                    }}
                  >
                    {packData.map((pack) => (
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          height: "100%",
                          width: "18%",
                        }}
                      >
                        <Typography
                          variant="h5"
                          color="white"
                          textAlign="center"
                        >
                          {pack.price} TCC
                        </Typography>
                        <img
                          src={
                            pack.packRarity === 1
                              ? Bronzes
                              : pack.packRarity === 2
                              ? Silvers
                              : pack.packRarity === 3
                              ? Golds
                              : Diamonds
                          }
                          sx={{ position: "relative" }}
                          alt="Forwards Pack"
                        />
                        <Button
                          variant="contained"
                          value={buttonValue}
                          href={`packs/${pack._id}`}
                          type="submit"
                          color="inherit"
                          sx={{ fontWeight: "600" }}
                        >
                          {pack.name}
                        </Button>
                        {user?.isAdmin && (
                          <Box mt={2}>
                            <Button
                              color="error"
                              variant="contained"
                              onClick={() => deletePack(pack._id)}
                            >
                              Delete {pack.name}
                            </Button>
                          </Box>
                        )}
                      </Box>
                    ))}
                  </Box>
                </Box>
              </Box>
            </Box>
          )}
          <br />
          {!isLoading && <Footer />}
        </Box>
      </Box>
    </Box>
  );
}
