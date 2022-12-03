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
    let url = "http://localhost:3030/models/product/by-id/" + productId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function GetProductBySet(url) {
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
    useEffect(() => {
        handleData();
        window.scrollTo(0, 0);
    }, [productId]);
    let handleData = async () => {
        let response = await GetProductById(productId);
        setProductInfo(response.product[0]);
        setProductSetInfo(response.productBySet);
    };
    let [productSetHot, setproductSetHot] = useState([]);
    let [productSetNew, setproductSetNew] = useState([]);
    useEffect(() => {
        handleData2();
    }, []);
    let handleData2 = async () => {
        let responseProductSetHot = await GetProductBySet(
            "http://localhost:3030/models/product/get-by-sold/sort"
        );
        setproductSetHot(responseProductSetHot);
        let responseProductSetNew = await GetProductBySet(
            "http://localhost:3030/models/product/by-time"
        );
        setproductSetNew(responseProductSetNew);
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
                    width: "40%",
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
                    width: "60%",
                    height: "100%",
                    justifyContent: "flex-end",
                    alignItems: "flex-center",
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
        </Box>
    ))();
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
                    width: "100%",
                    height: 400,
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                <Item>{productShow}</Item>
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
                {ProductTab("TRUYỆN CÙNG THỂ LOẠI", productSetInfo)}
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
                {ProductTab("TRUYỆN HOT", productSetHot)}
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
                {ProductTab("TRUYỆN MỚI", productSetNew)}
            </Box>
        </Box>
    );
}
