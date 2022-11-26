import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Header from "../components/Header";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

function GetProductById() {
    let { productId } = useParams();
    const [data, setData] = useState([]);
    useEffect(() => {
        fetch(`http://localhost:3030/models/product/by-id/${productId}`)
            .then((res) => res.json())
            .then((data) => setData(data));
    }, []);
    //return data.map((data) => <div>{data.username}</div>);
    return data;
}

export default function Product() {
    const productInfo = GetProductById();
    const productShow = ((data = GetProductById()) => (
        <Box width="100%" display="flex">
            <Box
                width="30%"
                height="100%"
                justifyContent="flex-start"
                alignItems="flex-start"
            >
                <img
                    src={data.image}
                    alt={data.productName}
                    style={{ maxWidth: "100%", maxHeight: "100%" }}
                />
            </Box>
            <Box
                width="70%"
                height="100%"
                justifyContent="flex-end"
                alignItems="flex-center"
            >
                <Box>{data.productName}</Box> <br></br>
                <Box>Giá: {data.price}</Box>
            </Box>
        </Box>
    ))();

    const navigate = useNavigate();
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box width="100%">{Header()}</Box>
            <Box width="100%">
                <Item style={{ cursor: "pointer" }}>{productShow}</Item>
            </Box>
        </Box>
    );
}
