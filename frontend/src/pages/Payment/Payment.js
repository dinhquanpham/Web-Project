import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import "./Cart.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function GetAllStorage(userId) {
    var storage = [], // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        let id = parseInt(keys[i]);
        let curUserId = parseInt(id / 1000);
        if (curUserId == userId) {
            var obj = localStorage.getItem(keys[i]);
            storage.push(JSON.parse(obj));
        }
    }
    return storage;
}

export default function Payment() {
    let navigate = useNavigate();
    let userId = sessionStorage.getItem("userId");
    userId = parseInt(userId);
    let cartInfo = GetAllStorage(userId);
    let cartShow =
        Array.isArray(cartInfo) &&
        cartInfo.map((data) => (
            <Item className="box payment box-product-info">
                <Box className="box payment box-product-image">
                    <img
                        className="image"
                        src={data.image}
                        alt={data.productName}
                    />
                </Box>
                <Box className="box payment box-product-details">
                    <Box className="box payment box-product-productName">
                        {data.productName}
                    </Box>
                    <Box className="box payment box-product-price">
                        Giá: {data.price}
                    </Box>
                    <Box className="box payment box-product-quantity">
                        Số lượng: {data.quantity}
                    </Box>
                    <Box className="box payment box-product-total">
                        Tổng giá: {data.quantity * data.price}
                    </Box>
                </Box>
            </Item>
        ));
    let payment = (() => (
        <Button
            className="box payment button-payment"
            onClick={}
        >
            Xác nhận
        </Button>
    ))();
    if (cartInfo.length == 0) {
        cartShow = (
            <Box>
                <Box>Bạn không có sản phẩm nào trong giỏ</Box>
            </Box>
        );
    }

    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Item className="box payment box-list-product">{cartShow}</Item>
            <Item className="box payment box-payment">{payment}</Item>
        </Box>
    );
}
