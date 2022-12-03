import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductGrid from "../../components/ProductGrid/ProductGrid";

async function GetProductSetById(productSetId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/product/by-set/` +
        productSetId;
    if (productSetId == "hot") {
        url = `${process.env.REACT_APP_SV_HOST}/models/product/get-by-sold/sort`;
    }
    if (productSetId == "new") {
        url = `${process.env.REACT_APP_SV_HOST}/models/product/by-time`;
    }
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
    useEffect(() => {
        handleData();
        window.scrollTo(0, 0);
    }, [productsetId]);
    let handleData = async () => {
        let response = await GetProductSetById(productsetId);
        setProductSetInfo(response);
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
                {ProductGrid(productSetInfo.name, productSetInfo)}
            </Box>
        </Box>
    );
}
