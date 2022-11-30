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
import IconButton from '@mui/material/IconButton';
import AccountCircle from '@mui/icons-material/AccountCircle';
import { useEffect, useState } from "react";
import Menu from "./Menu";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
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
    color: "inherit",
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
        handleAccount();
    }, []);
    const handleAccount = async() => {
        let token = sessionStorage.getItem('userId');
        if (token) {
            setAuth(true);
        }
        else {
            setAuth(false);
        }
    };
    const handleSignOut = async () => {
        let token = sessionStorage.getItem('userId');
        if (token) {
            sessionStorage.removeItem('userId');
            navigate("/");
            setAuth(false);
        }
        else {
            console.log("Error");
        }
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 0 }}
                        style={{ cursor: "pointer" }}
                        onClick={() => navigate("/")}
                    >
                        FAKEHASA
                    </Typography>
                    <Menu></Menu>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                    {!auth && (
                        <div>
                         <Button
                            color="inherit"
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
                            onClick={handleAccount}
                            color="inherit"
                            >
                            <AccountCircle />
                            </IconButton>
                            <Button
                                color="inherit"
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
