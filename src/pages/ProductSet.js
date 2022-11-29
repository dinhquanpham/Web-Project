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

async function GetProductSetById(productSetId) {
    let url = "http://localhost:3030/models/product-set/by-id/" + productSetId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function ProductSet() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let productSetId = params.get("id");
    let [productSetInfo, setProductSetInfo] = useState([]);
    useEffect(() => {
        handleData();
    }, []);
    let handleData = async () => {
        let productSetInfo = await GetProductSetById(productSetId);
        setProductSetInfo(productSetInfo);
    };
    let navigate = useNavigate();

    // const productSetShow = ((data = productSetInfo) => (
    //     <Box width="100%" display="flex">
    //         <Box
    //             width="30%"
    //             height="100%"
    //             justifyContent="flex-start"
    //             alignItems="flex-start"
    //         >
    //             <img
    //                 src={data.image}
    //                 alt={data.productName}
    //                 style={{ maxWidth: "100%", maxHeight: "100%" }}
    //             />
    //         </Box>
    //         <Box
    //             width="70%"
    //             height="100%"
    //             justifyContent="flex-end"
    //             alignItems="flex-center"
    //         >
    //             <Box>{data.productName}</Box> <br></br>
    //             <Box>Giá: {data.price}</Box>
    //         </Box>
    //     </Box>
    // ))();

    return (
        <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
            <Box width="100%">{Header()}</Box>
            <Typography width="100%" float="left" backgroundColor="green">
                {productSetInfo.name}
            </Typography>
            {/* <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
                <Grid
                    container
                    rowSpacing={1}
                    columnSpacing={2}
                    columns={1}
                    sx={{ flexGrow: 1, width: "100%", height: "100%" }}
                >
                    {Array.from(Array(5)).map((_, index) => (
                        <Grid
                            item
                            xs={1}
                            key={index}
                            sx={{ flexGrow: 1, width: "100%", height: "100%" }}
                        >
                            <Item
                                style={{ cursor: "pointer" }}
                                onClick={() =>
                                    navigate(
                                        `/product/?id=${productSetInfo[index].id}`
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
            </Box> */}
        </Box>
    );
}
