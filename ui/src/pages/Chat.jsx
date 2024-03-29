import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import io from "socket.io-client";
import Navbar from "../components/Navbar";
import {
  Backdrop,
  Box,
  Button,
  CircularProgress,
  Divider,
  List,
  TextField,
  Typography,
} from "@mui/material";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";
import Footer from "../components/Footer";

export default function Chat() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [state, setState] = useState({ message: "", name: "" });
  const [chat, setChat] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const socketRef = useRef(null);
  const [name, setName] = useState("");
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true);
    // get cards
    axios
      .get("http://localhost:5000/api/cards/")
      .then((res) => res.data)
      .then((res) => {
        setCardData(res);
        console.log(res);
      })
      .catch((err) => console.log(err))
      .finally(() => setIsLoading(false));
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
          setName(user?.username);
          setIsLoggedIn(true);
        }
      })
      .catch((err) => console.log(err));

    socketRef.current = io("http://localhost:5000");
    socketRef.current.on("message", ({ name, message }) => {
      console.log(`current on ${name} ${message}`);
      setChat([...chat, { name, message }]);
    });

    return () => {
      socketRef.current.off("message", ({ name, message }) => {
        console.log(`current on ${name} ${message}`);
        setChat([...chat, { name, message }]);
      });
    };
  }, [isClicked, chat, user?.username]);

  useEffect(() => {}, [chat]);

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(chat);
    const name = user?.username;
    setIsClicked(!isClicked);
    console.log(`clicked ${name} ${message}`);
    socketRef.current.emit("message", { name, message });
    setMessage("");
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
          <Box>
            <Typography
              mt={4}
              mb={4}
              textAlign="center"
              color="white"
              variant="h3"
              gutterBottom
            >
              Live Chat
            </Typography>
            <Divider sx={{ color: "white", margin: "40px" }} />
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                flexDirection: "column",
                alignItems: "center",
                height: "70vh",
              }}
            >
              <Box>
                {chat.map((chat) => (
                  <Box
                    sx={{
                      border: "1px solid white",
                      width: "50vw",
                      padding: "20px",
                    }}
                  >
                    <Typography textAlign="center" color="white">
                      {chat.name}: {chat.message}
                    </Typography>
                  </Box>
                ))}
                <form onSubmit={handleSubmit}>
                  <Box
                    mt={4}
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      width: "15vw",
                    }}
                  >
                    <TextField
                      name="name"
                      onChange={(e) => setName(e.target.value)}
                      value={name}
                      label="Name"
                      disabled
                      sx={{ backgroundColor: "white" }}
                    />
                    <TextField
                      name="message"
                      onChange={(e) => setMessage(e.target.value)}
                      value={message}
                      variant="outlined"
                      label="Message"
                      sx={{ backgroundColor: "white" }}
                    />
                  </Box>
                  <Box mt={2}>
                    <Button
                      color="inherit"
                      sx={{ fontWeight: "600" }}
                      variant="contained"
                      type="submit"
                    >
                      Send Message
                    </Button>
                  </Box>
                </form>
              </Box>
            </Box>
          </Box>
        </Box>
        <Footer />
      </Box>
    </Box>
  );
}
