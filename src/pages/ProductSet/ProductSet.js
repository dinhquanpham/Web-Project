import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

async function GetProductBySet(productSetId) {
    let url = "http://localhost:3030/models/product/by-set/" + productSetId;
    if (productSetId == "hot") {
        url = "http://localhost:3030/models/product/get-by-sold/sort";
    }
    if (productSetId == "new") {
        url = "http://localhost:3030/models/product/by-time";
    }
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

async function GetProductSetById(productSetId) {
    let url = "http://localhost:3030/models/product-set/by-id/" + productSetId;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function ProductSet() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let productsetId = params.get("id");
    let [productSetInfo, setProductSetInfo] = useState([]);
    let [productSetName, setProductSetName] = useState("");
    let [productInSetInfo, setProductInSetInfo] = useState([]);
    useEffect(() => {
        handleData();
        window.scrollTo(0, 0);
    }, [productsetId]);
    let handleData = async () => {
        let response = await GetProductSetById(productsetId);
        setProductSetInfo(response[0]);
        setProductSetName(response[0].name);
    };
    useEffect(() => {
        handleData1();
    }, [productsetId]);
    let handleData1 = async () => {
        let response = await GetProductBySet(productsetId);
        setProductInSetInfo(response);
    };
    let name = "BỘ: " + productSetName.toUpperCase();
    let productSetShow = ((data = productSetInfo) => (
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
                    alt={data.name}
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
                <Box>Bộ: {data.name}</Box>
                <Box>Tác giả: {data.authorName}</Box>
                <Box>Nhà xuất bản: {data.providerName}</Box>
                <Box>Tập mới nhất: {data.newestChap}</Box>
            </Box>
        </Box>
    ))();
    return (
        <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
            <Box width="100%">{Header()}</Box>
            <Box
                sx={{
                    width: "100%",
                    height: 400,
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {productSetShow}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: 300,
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductGrid(name, productInSetInfo)}
            </Box>
        </Box>
    );
}
