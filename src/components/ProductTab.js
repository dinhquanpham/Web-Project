import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function GetProduct(url) {
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(url)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);
    return data;
}

export default function ProductTab(name, url) {
    const navigate = useNavigate();
    const productInfo = GetProduct(url);
    const productShow = productInfo.map((data) => (
        <Box
            sx={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
            }}
        >
            <Box
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    height: "80%",
                }}
            >
                <img
                    src={data.image}
                    alt={data.productName}
                    style={{
                        width: "100%",
                        height: "100%",
                        display: "block",
                        objectFit: "contain",
                        marginLeft: "auto",
                        marginRight: "auto",
                    }}
                />
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    maxHeight: "20%",
                }}
            >
                {data.productName} <br></br>
                <Box>Giá: {data.price}</Box>
            </Box>
        </Box>
    ));

    return (
        <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
            <Typography
                width="100%"
                float="left"
                backgroundColor="green"
                style={{ cursor: "pointer" }}
                onClick={() =>
                    navigate(`/product-set/?id=${productInfo[0].productsetId}`)
                }
            >
                {name}
            </Typography>
            <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2}
                    columns={10}
                    sx={{ flexGrow: 1, width: "100%", height: "100%" }}
                >
                    {Array.from(Array(5)).map((_, index) => (
                        <Grid
                            item
                            xs={2}
                            key={index}
                            sx={{ flexGrow: 1, width: "100%", height: "100%" }}
                        >
                            <Item
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    navigate(
                                        `/product/?id=${productInfo[index].id}`
                                    )
                                }
                                sx={{
                                    flexGrow: 1,
                                    width: "100%",
                                    height: "100%",
                                }}
                            >
                                {productShow[index]}
                            </Item>
                        </Grid>
                    ))}
                </Grid>
            </Box>
        </Box>
    );
}
