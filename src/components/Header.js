import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import Popover from "@mui/material/Popover";
import SearchIcon from "@mui/icons-material/Search";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
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
            width: "20ch",
        },
    },
}));

export default function Header() {
    const navigate = useNavigate();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const handleMouseOverMenu = (event) => {
        if (anchorEl !== event.currentTarget) {
            setAnchorEl(event.currentTarget);
        }
    };

    const handleMouseOutMenu = () => {
        setAnchorEl(null);
    };
    const open = Boolean(anchorEl);
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
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                        aria-owns={open ? "menu" : undefined}
                        aria-haspopup="true"
                        onMouseOver={handleMouseOverMenu}
                        onMouseOut={handleMouseOutMenu}
                    >
                        <MenuIcon />
                        <Popover
                            id="menu"
                            open={open}
                            anchorEl={anchorEl}
                            anchorOrigin={{
                                vertical: "bottom",
                                horizontal: "left",
                            }}
                            transformOrigin={{
                                vertical: "top",
                                horizontal: "left",
                            }}
                            onClose={handleMouseOutMenu}
                            disableRestoreFocus
                        >
                            <Menu onMouseOut={handleMouseOutMenu}></Menu>
                        </Popover>
                    </IconButton>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search..."
                            inputProps={{ "aria-label": "search" }}
                        />
                    </Search>
                    <Button
                        color="inherit"
                        onClick={() => navigate("/sign-in")}
                    >
                        SIGN IN
                    </Button>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
