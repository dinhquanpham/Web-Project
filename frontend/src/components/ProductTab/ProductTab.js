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
        <Box key={data.id} className="box">
            <Box
                className="box product-tab box-show-product"
                sx={{
                    height: "90%",
                }}
                style={{ cursor: "pointer" }}
                onClick={() => navigate(`/product/?id=${data.id}`)}
            >
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
                        height: "30%",
                    }}
                >
                    <Box className="box product-tab box-product-name">
                        {data.productName}
                    </Box>
                    <Box className="box product-tab box-product-price">
                        Giá: {data.price}
                    </Box>
                    <Box>Đã bán: {data.soldNumber}</Box>
                </Box>
            </Box>
            <Button
                className="box product-tab button-add-to-cart"
                variant="outlined"
                onClick={() => {
                    let amount = localStorage.getItem(data.id);
                    amount++;
                    localStorage.setItem(data.id, amount);
                }}
            >
                THÊM VÀO GIỎ
            </Button>
        </Box>
    ));
    return (
        <Box className="box product-tab box-product-tab">
            <Box className="box product-tab box-product-title">
                <Typography className="box product-tab text-product-title">
                    {productSetName}
                </Typography>
            </Box>
            <Box className="box product-tab box-product-info">
                {Array.from(Array(5)).map((_, index) => (
                    <Item className="box product-tab box-product-item">
                        {productShow[index]}
                    </Item>
                ))}
            </Box>
            <Box className="box product-tab box-button-watch-more">
                <Button
                    className="box product-tab button-watch-more"
                    variant="outlined"
                    onClick={() => {
                        let productsetId = productInfo[0].productsetId;
                        if (productSetName == "TRUYỆN HOT")
                            productsetId = "hot";
                        if (productSetName == "TRUYỆN MỚI")
                            productsetId = "new";
                        navigate(`/product-set/?id=${productsetId}`);
                    }}
                >
                    Xem thêm
                </Button>
            </Box>
        </Box>
    );
}
