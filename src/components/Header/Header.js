import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useEffect, useState } from "react";
import Menu from "../Menu/Menu";
import "./Header.css";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
        margin: "auto",
        width: "auto",
    },
    margin: "auto",
}));

const SearchIconWrapper = styled("div")(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
}));

const StyledInputBase = styled(InputBase)(({ theme }) => ({
    //color: "inherit",
    "& .MuiInputBase-input": {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)})`,
        transition: theme.transitions.create("width"),
        width: "100%",
        [theme.breakpoints.up("md")]: {
            width: "50ch", // search bar width
        },
    },
}));

export default function Header() {
    const navigate = useNavigate();
    const [auth, setAuth] = useState(false);
    useEffect(() => {
        handleLogin();
    }, []);
    const handleLogin = async () => {
        let token = sessionStorage.getItem("userId");
        if (token) {
            setAuth(true);
        } else {
            setAuth(false);
        }
    };
    const handleUser = async () => {
        let userId = sessionStorage.getItem("userId");
        let path = "/user/?id=" + userId;
        navigate(path);
    };
    const handleSignOut = async () => {
        let token = sessionStorage.getItem("userId");
        if (token) {
            sessionStorage.removeItem("userId");
            navigate("/");
            setAuth(false);
        } else {
            console.log("Error");
        }
    };
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar className="header-bar" position="static">
                <Toolbar>
                    <Typography
                        className="logo"
                        variant="h6"
                        component="div"
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        FAKEHASA
                    </Typography>
                    <Menu></Menu>
                    <Search className="Search">
                        <SearchIconWrapper className="SearchIconWrapper">
                            <SearchIcon className="SearchIcon" />
                        </SearchIconWrapper>
                        <StyledInputBase
                            className="StyledInputBase"
                            placeholder="Tìm kiếm sản phẩm..."
                            inputProps={{ "aria-label": "search" }}
                            autoComplete="off"
                        />
                    </Search>
                    {!auth && (
                        <div>
                            <Button
                                className="button-signin"
                                onClick={() => navigate("/sign-in")}
                            >
                                SIGN IN
                            </Button>
                        </div>
                    )}
                    {auth && (
                        <div>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleUser}
                                color="inherit"
                            >
                                <AccountCircle />
                            </IconButton>
                            <Button
                                className="button-signin"
                                onClick={handleSignOut}
                            >
                                Sign out
                            </Button>
                        </div>
                    )}
                </Toolbar>
            </AppBar>
        </Box>
    );
}
