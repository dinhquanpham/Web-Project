import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProductTab from "../../components/ProductTab/ProductTab";

const Item = styled(Paper)(({ theme }) => ({
    backgroundColor: theme.palette.mode === "dark" ? "#1A2027" : "#fff",
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
}));

async function GetProductById(productId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/product/by-id/` + productId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function GetProductBySet(productsetId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/product/by-set/` +
        productsetId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function GetProductSetById(productsetId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/product-set/by-id/` +
        productsetId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function Product() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let productId = params.get("id");
    let [productInfo, setProductInfo] = useState([]);
    let [productSetInfo, setProductSetInfo] = useState([]);
    let [productInSetInfo, setProductInSetInfo] = useState([]);
    useEffect(() => {
        handleData();
        window.scrollTo(0, 0);
    }, [productId]);
    let handleData = async () => {
        let response = await GetProductById(productId);
        setProductInfo(response.product[0]);
        let response2 = await GetProductSetById(
            response.product[0].productsetId
        );
        setProductSetInfo(response2[0]);
        let response3 = await GetProductBySet(response.product[0].productsetId);
        setProductInSetInfo(response3);
    };
    let navigate = useNavigate();
    let productShow = ((data = productInfo) => (
        <Box
            sx={{
                flexGrow: 1,
                width: "100%",
                height: 400,
                boxSizing: "border-box",
                display: "flex",
            }}
        >
            <Box
                sx={{
                    width: "30%",
                    height: "100%",
                    justifyContent: "flex-start",
                    alignItems: "flex-start",
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
                    width: "70%",
                    height: "100%",
                    justifyContent: "flex-end",
                    alignItems: "flex-center",
                }}
            >
                <Box>{data.productName}</Box>
                <Box>Giá: {data.price}</Box>
                <Box>
                    Bộ:
                    <Box
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            navigate(`/product-set/?id=${data.productsetId}`)
                        }
                    >
                        {data.setName}
                    </Box>
                </Box>
            </Box>
        </Box>
    ))();
    console.log("productInSetInfo: " + productInSetInfo);
    return (
        <Box
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
                    height: "100%",
                    boxSizing: "border-box",
                }}
            >
                {Header()}
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    height: 400,
                    boxSizing: "border-box",
                }}
            >
                <Item style={{ cursor: "pointer" }}>{productShow}</Item>
            </Box>
            <Box
                sx={{
                    flexGrow: 1,
                    width: "100%",
                    height: 400,
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab("TRUYỆN CÙNG THỂ LOẠI", productInSetInfo)}
            </Box>
        </Box>
    );
}
