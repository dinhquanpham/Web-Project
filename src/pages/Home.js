import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";

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
    const productInfo = GetAllProduct();
    const productShow = GetAllProduct().map((data) => (
        <Box>
            <Box>
                <img
                    src={data.image}
                    alt={data.productName}
                    style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                    }}
                />
            </Box>
            <Box>
                {data.productName} <br></br>
                <Box>Giá: {data.price}</Box>
            </Box>
        </Box>
    ));

    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box width="100%">{Header()}</Box>
            <Box width="100%" marginTop="2%">
                <Typography
                    width="100%"
                    style={{ float: "left", backgroundColor: "green" }}
                >
                    TRUYỆN HOT
                </Typography>
                <Box>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={2}
                        columns={10}
                    >
                        {Array.from(Array(5)).map((_, index) => (
                            <Grid item xs={2} key={index}>
                                <Item
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        navigate(
                                            `/product/${productInfo[index].id}`
                                        )
                                    }
                                >
                                    {productShow[index]}
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
            <Box width="100%" marginTop="2%">
                <Box width="100%">
                    <Typography style={{ float: "left" }}>
                        MANGA COMIC
                    </Typography>
                </Box>
                <Box>
                    <Grid
                        container
                        rowSpacing={1}
                        columnSpacing={2}
                        columns={10}
                    >
                        {Array.from(Array(5)).map((_, index) => (
                            <Grid item xs={2} key={index}>
                                <Item
                                    style={{ cursor: "pointer" }}
                                    onClick={() =>
                                        navigate(
                                            `/product/${productInfo[index].id}`
                                        )
                                    }
                                >
                                    {productShow[index]}
                                </Item>
                            </Grid>
                        ))}
                    </Grid>
                </Box>
            </Box>
        </Box>
    );
}
