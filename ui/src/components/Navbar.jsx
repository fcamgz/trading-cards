import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
} from "@mui/material";
import { Box } from "@mui/system";
import { styled, alpha } from "@mui/material/styles";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import EditIcon from "@mui/icons-material/Edit";
import Divider from "@mui/material/Divider";
import ArchiveIcon from "@mui/icons-material/Archive";
import MenuIcon from "@mui/icons-material/Menu";

import FileCopyIcon from "@mui/icons-material/FileCopy";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import MonetizationOnIcon from "@mui/icons-material/MonetizationOn";
import PersonIcon from "@mui/icons-material/Person";
import LocalAtmIcon from "@mui/icons-material/LocalAtm";
import CollectionsIcon from "@mui/icons-material/Collections";
import LogoutIcon from "@mui/icons-material/Logout";
import AddIcon from "@mui/icons-material/Add";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import { Link } from "react-router-dom";

const StyledMenu = styled((props) => (
  <Menu
    elevation={0}
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    minWidth: 160,
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "0 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 14,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const userPages = [
  {
    name: "Dashboard",
    href: "/dashboard",
  },
  {
    name: "All Cards",
    href: "/cards",
  },
  {
    name: "Buy Coins",
    href: "/buyCoins",
  },
  {
    name: "Chat",
    href: "/chat",
  },
  {
    name: "Announcements",
    href: "/announcements",
  },
];

const adminPages = [
  {
    name: "Admin Dashboard",
    href: "/admin",
  },
  {
    name: "Announcements",
    href: "/announcements",
  },
  {
    name: "All Cards",
    href: "/cards",
  },
];

export default function Navbar(props) {
  const [anchorElNav, setAnchorElNav] = React.useState(null);
  const [anchorElUser, setAnchorElUser] = React.useState(null);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  // props contains boolean is user loggedIn, and username
  const navigate = useNavigate();

  function handleLogout() {
    console.log("logout clicked");
    localStorage.removeItem("token");
    navigate("/");
  }

  function handleAddFunds() {
    navigate("/addFunds");
  }

  function handleBuyCoins() {
    navigate("/buyCoins");
  }

  function handleProfile() {
    navigate("/profile");
  }

  return (
    <AppBar color="transparent" position="sticky">
      <Container maxWidth="xl">
        <Toolbar
          disableGutters
          sx={{ display: "flex", justifyContent: "space-between" }}
        >
          <Box sx={{ display: "flex", flexDirection: "column" }}>
            <Typography
              variant="h6"
              noWrap
              color="white"
              component="div"
              sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
            >
              Trading Cards Co.
            </Typography>
            {props.user?.isAdmin && (
              <Typography
                variant="body1"
                sx={{ fontWeight: "600", color: "red" }}
              >
                Admin
              </Typography>
            )}
          </Box>
          {props.isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleOpenNavMenu}
                sx={{ color: "white" }}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id="menu-appbar"
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: "bottom",
                  horizontal: "left",
                }}
                keepMounted
                transformOrigin={{
                  vertical: "top",
                  horizontal: "left",
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: "block", md: "none" },
                }}
              >
                {userPages.map((page, idx) => (
                  <MenuItem key={idx}>
                    <Button
                      sx={{ color: "black", fontWeight: "600" }}
                      onClick={() => navigate(page.href)}
                    >
                      {page.name}
                    </Button>
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
          <Typography
            variant="h6"
            noWrap
            component="div"
            color="white"
            sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
          >
            Trading Cards Co.
          </Typography>
          {props.isLoggedIn && (
            <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
              {userPages.map((page, idx) => (
                <Button
                  key={idx}
                  onClick={() => navigate(page.href)}
                  sx={{
                    my: 2,
                    color: "white",
                    display: "block",
                    fontWeight: "600",
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          )}

          {props.isLoggedIn ? (
            <Box>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-around",
                  width: "260px",
                }}
              >
                <Button
                  id="demo-customized-button"
                  variant="contained"
                  onClick={handleClick}
                  endIcon={<KeyboardArrowDownIcon />}
                  size="small"
                  color="inherit"
                  sx={{ fontWeight: "600" }}
                >
                  {props.user.username}
                </Button>
                <StyledMenu
                  id="demo-customized-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                >
                  {props.user.isAdmin ? (
                    <Box>
                      <MenuItem onClick={() => navigate("/admin")}>
                        Admin Dashboard
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/addAnnouncement")}>
                        <AddIcon />
                        Add Announcement
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/addCard")}>
                        <AddIcon />
                        Add Card
                      </MenuItem>
                      <MenuItem onClick={() => navigate("/addPack")}>
                        <AddIcon />
                        Add Pack
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem onClick={handleProfile}>
                        <PersonIcon />
                        Profile
                      </MenuItem>
                      <MenuItem onClick={handleLogout} disableRipple>
                        <LogoutIcon />
                        Logout
                      </MenuItem>
                    </Box>
                  ) : (
                    <Box>
                      <MenuItem onClick={handleProfile}>
                        <PersonIcon />
                        Profile
                      </MenuItem>
                      <MenuItem
                        onClick={() => navigate("/myCards")}
                        disableRipple
                      >
                        <CollectionsIcon />
                        My Collection
                      </MenuItem>
                      <MenuItem
                        onClick={() => navigate("/tradeOffers")}
                        disableRipple
                      >
                        <EditIcon />
                        Trade Offers
                      </MenuItem>
                      <Divider sx={{ my: 0.5 }} />
                      <MenuItem disableRipple onClick={handleAddFunds}>
                        <MonetizationOnIcon />
                        Add Funds
                      </MenuItem>
                      <MenuItem disableRipple onClick={handleBuyCoins}>
                        <MonetizationOnIcon />
                        Buy Coins
                      </MenuItem>
                      <MenuItem onClick={handleLogout} disableRipple>
                        <LogoutIcon />
                        Logout
                      </MenuItem>
                    </Box>
                  )}
                </StyledMenu>
                <Typography
                  variant="body1"
                  m={1}
                  sx={{
                    color: "yellow",
                    fontWeight: "600",
                    fontSize: "17px",
                  }}
                >
                  <MonetizationOnIcon />
                  {props.user?.coinBalance}
                </Typography>
              </Box>
            </Box>
          ) : (
            !props.isLoading && (
              <Box>
                <Button
                  color="inherit"
                  size="small"
                  variant="contained"
                  href="/login"
                >
                  Login
                </Button>
              </Box>
            )
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
