import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import Radio from "@mui/material/Radio";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import "./Payment.css";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

async function GetAddressByUserId(userId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/address/by-user/` + userId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

function GetAllStorage(userId) {
    var storage = [], // Notice change here
        keys = Object.keys(localStorage),
        i = keys.length;
    while (i--) {
        let id = parseInt(keys[i]);
        let thisUserId = parseInt(id / 1000);
        if (thisUserId == userId) {
            var obj = JSON.parse(localStorage.getItem(keys[i]));
            storage.push({ ...obj, id });
        }
    }
    return storage;
}

function PostOrder() {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/address/by-user/` + userId;
    let data = fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function Payment() {
    let userId = sessionStorage.getItem("userId");
    let [addressInfo, setAddressInfo] = useState([]);
    const [open, setOpen] = React.useState(false);
    useEffect(() => {
        handleData();
    }, []);
    let handleData = async () => {
        let response = await GetAddressByUserId(userId);
        setAddressInfo(response);
    };

    function deleteAddress(index) {
        if (Array.isArray(addressInfo)) {
            let nextAddressInfo = addressInfo.map((data, idx) => {
                if (idx == index) {
                    return null;
                } else return data;
            });
            let idx = nextAddressInfo.indexOf(null);
            nextAddressInfo.splice(idx, 1);
            setAddressInfo(nextAddressInfo);
        }
    }
    let [selectedValue, setSelectedValue] = useState(0);
    let handleChange = (event) => {
        setSelectedValue(event.target.value);
    };
    let addressShow =
        Array.isArray(addressInfo) &&
        addressInfo.map((data, index) => (
            <Item className="box payment box-address">
                <Box className="box payment box-checkbox">
                    <Radio
                        name="address-radio-buttons"
                        className="box payment address-radio-buttons"
                        checked={selectedValue == index}
                        onChange={handleChange}
                        value={index}
                    />
                </Box>
                <Box className="box payment box-address-info">
                    <Box className="box payment text-address-info">
                        Địa chỉ: {data.homeAddress}, {data.street},{" "}
                        {data.district}, {data.province}
                    </Box>
                </Box>
                <Box className="box payment box-address-change">
                    <Box className="box payment box-address-edit">
                        <IconButton
                            className="box payment button-address-edit"
                            onClick={() => {
                                changeAddress(index);
                            }}
                        >
                            <EditIcon />
                        </IconButton>
                    </Box>
                    <Box className="box payment box-address-delete">
                        <IconButton
                            className="box payment button-address-delete"
                            onClick={() => {
                                deleteAddress(index);
                            }}
                        >
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Item>
        ));
    userId = parseInt(userId);
    let [cartInfo, setCartInfo] = useState([]);
    useEffect(() => {
        handleData2();
    }, []);
    let handleData2 = () => {
        let response = GetAllStorage(userId);
        setCartInfo(response);
    };
    let totalPayment = 0;
    if (Array.isArray(cartInfo)) {
        for (let i in cartInfo) {
            let product = cartInfo[i];
            totalPayment += product.quantity * product.price;
        }
    }
    let cartShow =
        Array.isArray(cartInfo) &&
        cartInfo.map((data, index) => (
            <Item className="box payment box-product-info">
                <Box className="box payment box-product-image">
                    <img
                        className="image"
                        src={data.image}
                        alt={data.productName}
                    />
                </Box>
                <Box className="box payment box-product-details">
                    <Box className="box payment box-product-productInfo">
                        <Box className="box payment box-product-productName">
                            {data.productName}
                        </Box>
                        <Box className="box payment box-product-price">
                            Giá: {data.price}
                        </Box>
                    </Box>
                    <Box className="box payment box-quantity">
                        Số lượng: {data.quantity}
                    </Box>
                    <Box className="box payment box-product-total">
                        Tổng giá: {data.quantity * data.price}
                    </Box>
                </Box>
            </Item>
        ));
    const handleClose = () => {
        setOpen(false);
    };
    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Item className="box payment box-all-address">
                <Box className="box payment box-address-title">
                    <Box className="box payment text-address-title">
                        ĐỊA CHỈ GIAO HÀNG
                    </Box>
                </Box>
                {addressShow}
            </Item>
            <Item className="box payment box-all-order">
                <Box className="box payment box-order-title">
                    <Box className="box payment text-order-title">ĐƠN HÀNG</Box>
                </Box>
                {cartShow}
            </Item>
            <Item className="box payment box-order-detail">
                <Box className="box payment box-order-cost">
                    <Box className="box payment text-order-cost">
                        TỔNG SỐ TIỀN: {totalPayment}
                    </Box>
                </Box>
                <Box className="box payment box-order-confirm">
                    <Button
                        className="box payment button-order-confirm"
                        onClick={() => {
                            // PostOrder();
                            setOpen(true);
                        }}
                    >
                        XÁC NHẬN THANH TOÁN
                    </Button>
                </Box>
                <Dialog open={open} onClose={handleClose}>
                    <DialogContent>
                        <DialogContentText>
                            ĐẶT HÀNG THÀNH CÔNG
                        </DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleClose}>Đồng ý</Button>
                    </DialogActions>
                </Dialog>
            </Item>
        </Box>
    );
}