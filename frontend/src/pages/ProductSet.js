import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";

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
    let productSetId = params.get("id");
    let [productSetInfo, setProductSetInfo] = useState([]);
    useEffect(() => {
        handleData();
    }, []);
    let handleData = async () => {
        let productSetInfo = await GetProductSetById(productSetId);
        setProductSetInfo(productSetInfo);
    };

    return (
        <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
            <Box width="100%">{Header()}</Box>
            <Box
                sx={{
                    width: "100%",
                    height: 300,
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductGrid(
                    productSetInfo.name,
                    `http://localhost:3030/models/product/by-set/${productSetInfo.id}`
                )}
            </Box>
        </Box>
    );
}