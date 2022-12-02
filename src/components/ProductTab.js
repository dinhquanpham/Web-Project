import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

export default function ProductTab(productSetName, productInfo) {
    let navigate = useNavigate();
    const productShow = productInfo.map((data) => (
        <Box
            key={data.productId}
            sx={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
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
                    }}
                />
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    height: "20%",
                }}
            >
                {data.productName} <br></br>
                <Box>Giá: {data.price}</Box>
            </Box>
        </Box>
    ));
    return (
        <Box
            sx={{
                flexGrow: 1,
                width: "100%",
                height: "100%",
                boxSizing: "border-box",
            }}
        >
            <Typography
                width="100%"
                float="left"
                backgroundColor="green"
                style={{ cursor: "pointer" }}
                onClick={() =>
                    navigate(`/product-set/?id=${productInfo[0].productsetId}`)
                }
            >
                {productSetName}
            </Typography>
            <Box
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box",
                }}
            >
                <Grid
                    container
                    columns={10}
                    sx={{
                        flexGrow: 1,
                        width: "100%",
                        height: "100%",
                        boxSizing: "border-box",
                    }}
                >
                    {Array.from(Array(5)).map((_, index) => (
                        <Grid
                            item
                            xs={2}
                            key={index}
                            sx={{
                                flexGrow: 1,
                                width: "100%",
                                height: "100%",
                                boxSizing: "border-box",
                            }}
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
                                    boxSizing: "border-box",
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
