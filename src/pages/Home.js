import * as React from "react";
import { styled, alpha } from "@mui/material/styles";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import MenuIcon from "@mui/icons-material/Menu";
import SearchIcon from "@mui/icons-material/Search";
import Paper from "@mui/material/Paper";
import Grid from "@mui/material/Grid";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Search = styled("div")(({ theme }) => ({
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    "&:hover": {
        backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    //marginLeft: 0,
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
        [theme.breakpoints.up("sm")]: {
            width: "12ch",
            "&:focus": {
                width: "20ch",
            },
        },
    },
}));

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function GetAllProduct() {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch("http://localhost:3030/models/product")
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);
    //return data.map((data) => <div>{data.username}</div>);
    return data;
}

export default function Home() {
    const productInfo = GetAllProduct().map((data) => (
        <div>
            <div>
                <img
                    src={data.image}
                    alt={data.productName}
                    style={{
                        display: "block",
                        margin: "0 auto",
                        backgroundSize: "contain",
                        maxWidth: 250,
                        maxHeight: 250,
                    }}
                />
            </div>
            <div>
                {data.productName} <br></br>
                <div>Giá: {data.price}</div>
            </div>
        </div>
    ));
    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <Typography
                        variant="h6"
                        component="div"
                        sx={{ flexGrow: 0 }}
                    >
                        FAKEHASA
                    </Typography>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Search>
                        <SearchIconWrapper>
                            <SearchIcon />
                        </SearchIconWrapper>
                        <StyledInputBase
                            placeholder="Search…"
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

            <Grid
                container
                rowSpacing={1}
                columnSpacing={{ xs: 1, sm: 2, md: 3 }}
                columns={10}
            >
                <Grid item xs={2}>
                    <Item>{productInfo[0]}</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>{productInfo[1]}</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>{productInfo[2]}</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>{productInfo[3]}</Item>
                </Grid>
                <Grid item xs={2}>
                    <Item>{productInfo[4]}</Item>
                </Grid>
            </Grid>
        </Box>
    );
}
