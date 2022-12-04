import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import ProductTab from "../../components/ProductTab/ProductTab";
import "./Product.css";

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
        <Box className="box product box-product">
            <Box className="box product box-product-image">
                <img
                    className="image"
                    src={data.image}
                    alt={data.productName}
                />
            </Box>
            <Box className="box product box-product-info">
                <Box
                    className="box "
                    sx={{
                        height: "80%",
                        justifyContent: "flex-left",
                        alignItems: "flex-left",
                    }}
                >
                    <Box>{data.productName}</Box>
                    <Box>Giá: {data.price}</Box>
                    <Box
                        style={{ cursor: "pointer" }}
                        onClick={() =>
                            navigate(`/product-set/?id=${data.productsetId}`)
                        }
                    >
                        Bộ: {data.setName}
                    </Box>
                </Box>
                <Box className="box quantity-box" sx={{ height: "10%" }}></Box>
                <Button
                    className="box add-to-cart"
                    sx={{
                        height: "10%",
                        justifyContent: "flex-center",
                        alignItems: "flex-center",
                    }}
                    variant="outlined"
                    onClick={() => {
                        let amount = localStorage.getItem(data.id);
                        amount++;
                        localStorage.setItem(data.id, {
                            ok: 1,
                            ok: amount,
                        });
                    }}
                >
                    THÊM VÀO GIỎ
                </Button>
            </Box>
        </Box>
    ))();
    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Box className="box">
                <Item style={{ cursor: "pointer" }}>{productShow}</Item>
            </Box>
            <Box
                className="box"
                sx={{
                    height: 400,
                    marginTop: "2%",
                }}
            >
                {ProductTab("TRUYỆN CÙNG THỂ LOẠI", productInSetInfo)}
            </Box>
        </Box>
    );
}
