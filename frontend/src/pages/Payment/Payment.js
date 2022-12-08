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

export default function Payment() {
    let userId = sessionStorage.getItem("userId");
    let [addressInfo, setAddressInfo] = useState([]);
    useEffect(() => {
        handleData();
    }, []);
    let handleData = async () => {
        let response = await GetAddressByUserId(userId);
        setAddressInfo(response);
    };

    let [selectedValue, setSelectedValue] = React.useState("a");
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
                        <IconButton className="box payment button-address-edit">
                            <EditIcon />
                        </IconButton>
                    </Box>
                    <Box className="box payment box-address-delete">
                        <IconButton className="box payment button-address-delete">
                            <DeleteIcon />
                        </IconButton>
                    </Box>
                </Box>
            </Item>
        ));

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
        </Box>
    );
}
