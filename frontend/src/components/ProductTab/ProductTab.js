import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Paper from "@mui/material/Paper";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
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
        <Box key={data.productId} className="box">
            <Box
                className="box"
                sx={{
                    height: "70%",
                }}
            >
                <img
                    className="image"
                    src={data.image}
                    alt={data.productName}
                />
            </Box>
            <Box
                className="box"
                sx={{
                    height: "20%",
                }}
            >
                <Box>{data.productName}</Box>
                <Box>Giá: {data.price}</Box>
                <Box>Đã bán: {data.soldNumber}</Box>
            </Box>
            <Button
                className="box button-add-to-cart"
                sx={{
                    height: "10%",
                }}
                variant="outlined"
                onClick={() => {}}
            >
                MUA
            </Button>
        </Box>
    ));
    return (
        <Box className="box product-tab">
            <Typography
                className="box product-title"
                sx={{
                    height: "10%",
                    float: "left",
                }}
            >
                {productSetName}
            </Typography>

            <Grid
                className="box"
                container
                columns={10}
                sx={{
                    height: "80%",
                }}
            >
                {Array.from(Array(5)).map((_, index) => (
                    <Grid className="box" item xs={2} key={index}>
                        <Item
                            className="box"
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                navigate(
                                    `/product/?id=${productInfo[index].id}`
                                )
                            }
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
