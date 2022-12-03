import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import Typography from "@mui/material/Typography";
import { useNavigate } from "react-router-dom";
import "./ProductTab.css";

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
                    width: "100%",
                    height: "20%",
                }}
            >
                <Box>{data.productName}</Box>
                <Box>Giá: {data.price}</Box>
                <Box>Đã bán: {data.soldNumber}</Box>
            </Box>
        </Box>
    ));
    return (
        <Box className="box product-tab">
            <Typography
                className="product-title"
                sx={{
                    width: "100%",
                    height: "10%",
                    float: "left",
                }}
                style={{ cursor: "pointer" }}
            >
                {productSetName}
            </Typography>

            <Grid
                container
                columns={10}
                className="box"
                sx={{
                    height: "80%",
                }}
            >
                {Array.from(Array(5)).map((_, index) => (
                    <Grid item xs={2} key={index} className="box">
                        <Item
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                navigate(
                                    `/product/?id=${productInfo[index].id}`
                                )
                            }
                            className="box"
                        >
                            {productShow[index]}
                        </Item>
                    </Grid>
                ))}
            </Grid>
            <Button
                className="box button-more"
                sx={{
                    height: "10%",
                }}
                variant="outlined"
                onClick={() => {
                    let productsetId = productInfo[0].productsetId;
                    if (productSetName == "TRUYỆN HOT") productsetId = "hot";
                    if (productSetName == "TRUYỆN MỚI") productsetId = "new";
                    navigate(`/product-set/?id=${productsetId}`);
                }}
            >
                Xem thêm
            </Button>
        </Box>
    );
}
