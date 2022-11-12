import {
  Backdrop,
  Box,
  CircularProgress,
  Divider,
  List,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, { useEffect, useState } from "react";
import Footer from "../components/Footer";
import Navbar from "../components/Navbar";
import BackgroundImage from "../images/page-backgrounds/stadium-image.jpg";

export default function Stats() {
  const [statsData, setStatsData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // create stats
    setIsLoading(true);
    axios
      .get("http://localhost:5000/api/stats")
      .then((res) => res.data)
      .then((res) => {
        setStatsData(res);
      })
      .catch((err) => console.log(err))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 1500)
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
            Leaderboard
          </Typography>
          <Typography
            variant="subtitle1"
            color="white"
            textAlign="center"
            gutterBottom
          >
            Leaderboard descending by users that have most wins
          </Typography>
          <Divider sx={{ color: "white", margin: "40px" }} />
          {!isLoading && (
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Box sx={{ width: "60%" }}>
                <TableContainer pageSize={5} component={Paper}>
                  <Box sx={{ maxHeight: 320, overflow: "auto" }}>
                    <List>
                      <Table sx={{ minWidth: 740 }}>
                        <TableHead
                          sx={{
                            backgroundColor: "#FAFAFA",
                            borderBottom: "2px solid #AFAFAF",
                          }}
                        >
                          <TableRow>
                            <TableCell
                              sx={{ fontWeight: "600", fontSize: "18px" }}
                              align="left"
                            >
                              Ranking
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "600", fontSize: "18px" }}
                            >
                              Username
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "600", fontSize: "18px" }}
                            >
                              Wins
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "600", fontSize: "18px" }}
                            >
                              Draws
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "600", fontSize: "18px" }}
                              align="left"
                            >
                              Defeats
                            </TableCell>
                            <TableCell
                              sx={{ fontWeight: "600", fontSize: "18px" }}
                              align="right"
                            >
                              Points
                            </TableCell>
                          </TableRow>
                        </TableHead>
                        <TableBody>
                          {statsData &&
                            statsData.map((stat, idx) => (
                              <TableRow
                                key={stat.userId}
                                sx={{
                                  "&:last-child td, &:last-child th": {
                                    border: 0,
                                  },
                                }}
                              >
                                <TableCell
                                  sx={{ fontSize: "16px" }}
                                  component="th"
                                  scope="row"
                                >
                                  {idx + 1}
                                </TableCell>
                                <TableCell
                                  sx={{ fontSize: "16px" }}
                                  component="th"
                                  scope="row"
                                >
                                  {stat.username}
                                </TableCell>
                                <TableCell
                                  sx={{ fontSize: "16px" }}
                                  align="left"
                                >
                                  {stat.wins}
                                </TableCell>
                                <TableCell
                                  sx={{ fontSize: "16px" }}
                                  align="left"
                                >
                                  {stat.draws}
                                </TableCell>
                                <TableCell
                                  sx={{ fontSize: "16px" }}
                                  align="left"
                                >
                                  {stat.defeats}
                                </TableCell>
                                <TableCell
                                  sx={{ fontSize: "16px", fontWeight: "600" }}
                                  align="right"
                                >
                                  {stat.wins * 3 + stat.draws}
                                </TableCell>
                              </TableRow>
                            ))}
                        </TableBody>
                      </Table>
                    </List>
                  </Box>
                </TableContainer>
              </Box>
            </Box>
          )}
        </Box>
        {!isLoading && <Footer />}
      </Box>
    </Box>
  );
}
