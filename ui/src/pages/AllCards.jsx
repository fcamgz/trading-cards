import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "../components/Navbar";
import {
  Backdrop,
  Box,
  Button,
  Card,
  CardContent,
  CircularProgress,
  CardHeader,
  Chip,
  FormControl,
  Grid,
  InputLabel,
  MenuItem,
  Paper,
  Select,
  Stack,
  Table,
  TableCell,
  tableCellClasses,
  TableContainer,
  TableHead,
  TableRow,
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
import { styled } from "@mui/material/styles";

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

export default function AllCards() {
  const [cardData, setCardData] = useState([{}]);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [buttonClicked, setButtonClicked] = useState(false);
  const [searchKey, setSearchKey] = useState("");
  const [resetIsClicked, setResetIsClicked] = useState(false);
  const [orderBy, setOrderBy] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const handleReset = () => {
    setSearchKey("");
    setOrderBy("");
    setResetIsClicked(!resetIsClicked);
  };

  const handleSearch = (key) => {
    setCardData(
      cardData.filter(
        (card) =>
          card.firstname.toLowerCase().includes(key) ||
          card.lastname.toLowerCase().includes(key)
      )
    );
  };

  const handleDelete = (cardId) => {
    axios
      .delete(`http://localhost:5000/api/cards/${cardId}`)
      .then((res) => res.data)
      .then((res) => {
        console.log(res);
        setButtonClicked(!buttonClicked);
      })
      .catch((err) => console.log(err));
  };

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
      .catch((err) => console.log(err))
      .finally(() =>
        setTimeout(() => {
          setIsLoading(false);
        }, 500)
      );
  }, [buttonClicked, resetIsClicked]);
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
        sx={{
          color: "#fff",
          zIndex: (theme) => theme.zIndex.drawer + 1,
        }}
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
          <Typography variant="h3" mt={4} color="white" textAlign="center">
            Card Collection
          </Typography>
          <Typography
            variant="subtitle1"
            mt={4}
            color="white"
            textAlign="center"
            gutterBottom
          >
            See all the cards in the database
          </Typography>
          <Divider sx={{ color: "white", margin: "40px" }} />
          {!isLoading && (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  padding: "0 60px",
                }}
              >
                <TableContainer
                  sx={{ border: "4px solid #AFAFAF" }}
                  color="transparent"
                >
                  <Table sx={{ minWidth: 700 }} aria-label="customized table">
                    <TableHead>
                      <TableRow>
                        <StyledTableCell
                          sx={{
                            padding: "10px",
                            display: "flex",
                            justifyContent: "flex-start",
                            gap: "12px",
                            alignItems: "center",
                          }}
                        >
                          <TextField
                            label="Search Card by Name"
                            sx={{ backgroundColor: "#FAFAFA" }}
                            onChange={(e) => setSearchKey(e.target.value)}
                            value={searchKey}
                          />
                          <Box
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              gap: "4px",
                            }}
                          >
                            <Button
                              onClick={() => handleSearch(searchKey)}
                              variant="contained"
                            >
                              Search
                            </Button>
                            <Button
                              onClick={handleReset}
                              sx={{ color: "black" }}
                              size="small"
                              variant="contained"
                              color="inherit"
                            >
                              Reset
                            </Button>
                          </Box>
                        </StyledTableCell>
                        <StyledTableCell align="right">
                          <Box
                            sx={{
                              display: "flex",
                              justifyContent: "flex-end",
                              gap: "12px",
                            }}
                          >
                            <FormControl
                              sx={{ width: "140px", backgroundColor: "white" }}
                            >
                              <InputLabel id="demo-simple-select-label">
                                Order By
                              </InputLabel>
                              <Select
                                value={orderBy}
                                label="Order By"
                                onChange={(e) => setOrderBy(e.target.value)}
                              >
                                <MenuItem value="firstName">
                                  First Name
                                </MenuItem>
                                <MenuItem value="lastName">Last Name</MenuItem>
                                <MenuItem value="price">Price</MenuItem>
                                <MenuItem value="rating">Rating</MenuItem>
                              </Select>
                            </FormControl>
                          </Box>
                        </StyledTableCell>
                      </TableRow>
                    </TableHead>
                  </Table>
                </TableContainer>
              </Box>
              <Grid
                container
                spacing={2}
                direction="row"
                justify="flex-start"
                alignItems="flex-start"
                p={4}
              >
                {cardData.map((card) => (
                  <Grid key={card._id} item xs={12} sm={6} md={4} lg={3}>
                    <Box>
                      <Card>
                        <Box
                          sx={{
                            display: "flex",
                            justifyContent: "space-between",
                          }}
                        >
                          <CardHeader
                            title={`${card.firstname} ${card.lastname}`}
                            subheader={`Price: ${card.price} - Rating ${card.rating}`}
                          ></CardHeader>
                          <Box m={4}>
                            {card.owner === user?._id ? (
                              <Chip
                                label="Owned"
                                sx={{
                                  display: "flex",
                                  backgroundColor: "green",
                                  color: "white",
                                }}
                              />
                            ) : (
                              ""
                            )}
                          </Box>
                        </Box>
                        <CardContent>
                          <Stack>
                            <Button
                              href={`cards/${card._id}`}
                              variant="contained"
                              color="inherit"
                              sx={{ fontWeight: "600" }}
                            >
                              Go to Card
                            </Button>
                            {user?.isAdmin ? (
                              <Box mt={2}>
                                <Button
                                  color="error"
                                  onClick={() => handleDelete(card._id)}
                                  variant="contained"
                                >
                                  Delete Card
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
                              src={
                                card.tier === "Bronze"
                                  ? Bronzes
                                  : card.tier === "Silver"
                                  ? Silvers
                                  : card.tier === "Gold"
                                  ? Golds
                                  : card.tier === "Platinium"
                                  ? Platinum
                                  : card.tier === "Diamond"
                                  ? Diamonds
                                  : ""
                              }
                              width="226px"
                              alt="Forwards Pack"
                            />
                          </Box>
                        </CardContent>
                      </Card>
                    </Box>
                  </Grid>
                ))}
              </Grid>
            </Box>
          )}
        </Box>
        {!isLoading && <Footer />}
      </Box>
    </Box>
  );
}
