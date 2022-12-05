import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import Header from "../../components/Header/Header";
import "./Cart.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function GetAllStorage() {
    var storage = [], // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        var obj = localStorage.getItem(keys[i]);
        storage.push(JSON.parse(obj));
    }
    return storage;
}

export default function Cart() {
    let cartInfo = GetAllStorage();
    let cartShow = <Box>Bạn không có sản phẩm nào trong giỏ</Box>;
    cartShow =
        Array.isArray(cartInfo) &&
        cartInfo.map((data) => (
            <Item className="box cart box-product-info">
                <Box className="box cart box-product-image">
                    <img
                        className="image"
                        src={data.image}
                        alt={data.productName}
                    />
                </Box>
                <Box className="box cart box-product-details">
                    <Box className="box cart box-product-productName">
                        {data.productName}
                    </Box>
                    <Box className="box cart box-product-price">
                        Giá: {data.price}
                    </Box>
                    <Box className="box cart box-product-quantity">
                        Số lượng: {data.quantity}
                    </Box>
                    <Box className="box cart box-product-total">
                        Tổng giá: {data.quantity * data.price}
                    </Box>
                </Box>
            </Item>
        ));

    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Box className="box cart box-list-product">{cartShow}</Box>
        </Box>
    );
}
