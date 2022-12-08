import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
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

export default function Payment() {

    //let addressShow = (data = addressInfo) => ()();
    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Item className="box payment box-address"></Item>
        </Box>
    );
}
