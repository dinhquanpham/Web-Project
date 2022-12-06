import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
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

export default function Cart() {
    let navigate = useNavigate();
    let userId = sessionStorage.getItem("userId");
    userId = parseInt(userId);
    let cartInfo = GetAllStorage(userId);
    let totalPayment = 0;
    let [amount, setAmount] = useState(1);

    if (Array.isArray(cartInfo)) {
        for (let i in cartInfo) {
            let product = cartInfo[i];
            totalPayment += product.quantity * product.price;
        }
    }

    function changeAmount(value) {
        setAmount((counter) => Math.max(1, counter + value));
    }

    let cartShow =
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
                    <Box className="box cart box-product-productInfo">
                        <Box className="box cart box-product-productName">
                            {data.productName}
                        </Box>
                        <Box className="box cart box-product-price">
                            Giá: {data.price}
                        </Box>
                    </Box>
                    <Box className="box cart box-product-quantity">
                        <Box className="box product box-quantity-control">
                            <Button
                                className="box product button-quantity-change"
                                onClick={() => {
                                    changeAmount(-1);
                                }}
                            >
                                -
                            </Button>
                            <Box className="box product box-quantity-num">
                                {amount}
                            </Box>
                            <Button
                                className="box product button-quantity-change"
                                onClick={() => {
                                    changeAmount(1);
                                }}
                            >
                                +
                            </Button>
                        </Box>
                    </Box>
                    <Box className="box cart box-product-total">
                        Tổng giá: {data.quantity * data.price}
                    </Box>
                    <Box className="box cart box-product-delete">
                        <IconButton className="box cart button-product-delete">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Item>
        ));

    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Box className="box cart box-cart-info">
                <Item className="box cart box-list-product">{cartShow}</Item>
                <Item className="box cart box-payment">
                    <Box className="box cart box-total-payment">
                        Tổng số tiền: {totalPayment}
                    </Box>
                    <Button
                        className="box cart button-payment"
                        onClick={() => {
                            navigate(`/payment`);
                        }}
                    >
                        Thanh toán
                    </Button>
                </Item>
            </Box>
            <Box className="box">
                <Item>Bạn không có sản phẩm nào trong giỏ</Item>
            </Box>
        </Box>
    );
}
