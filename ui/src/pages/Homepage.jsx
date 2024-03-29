import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import { Box, Button, Typography } from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import TCCLogo1 from "../images/Bronze-Card.png";
import TCCLogo4 from "../images/Silver-Card.png";
import TCCLogo2 from "../images/pack-background4.png";
import TCCLogo5 from "../images/Platinium-Card.png";
import TCCLogo3 from "../images/pack-background2.png";

import Footer from "../components/Footer";
import { useNavigate } from "react-router";

export default function Homepage() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();

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
        width: "100vw",
        margin: 0,
        overflowX: "hidden",
      }}
    >
      <Navbar user={user} isLoggedIn={isLoggedIn} />
      <Box sx={{ position: "relative", height: "100%", width: "100vw" }}>
        <img
          src={BackgroundImage}
          style={{
            opacity: "0.95",
            position: "fixed",
            left: 0,
            top: 0,
            width: "99vw",
            height: "auto",
            zIndex: 0,
            margin: 0,
            minHeight: "100%",
            minWidth: "1024px",
          }}
          alt="background"
        />
        <Box sx={{ position: "relative" }} mb={2}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Box
              mt={6}
              sx={{ display: "flex", justifyContent: "space-around" }}
            >
              <img width="18%" src={TCCLogo1} />
              <img width="18%" src={TCCLogo4} />
              <img width="18%" src={TCCLogo2} />
              <img width="18%" src={TCCLogo5} />
              <img width="18%" src={TCCLogo3} />
            </Box>
            <Typography mt={2} variant="h2" color="white">
              Trading Cards Co.
            </Typography>
            <Typography variant="body2" mt={2} color="white">
              Buy, Collect, Trade Cards. Start Now!
            </Typography>
            <Box mt={2}>
              {!isLoggedIn ? (
                <Button href="/register" variant="contained" color="inherit">
                  Get Started
                </Button>
              ) : (
                <Button
                  onClick={() => navigate("/dashboard")}
                  color="inherit"
                  variant="contained"
                  sx={{ fontWeight: "600" }}
                >
                  Go to Dashboard
                </Button>
              )}
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
