import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductTab from "../../components/ProductTab/ProductTab";

async function GetProductBySet(url) {
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function Home() {
    let [productSetHot, setproductSetHot] = useState([]);
    let [productSetNew, setproductSetNew] = useState([]);
    let [productSet5, setproductSet5] = useState([]);
    let [productSet6, setproductSet6] = useState([]);
    let [productSet7, setproductSet7] = useState([]);
    let [productSet8, setproductSet8] = useState([]);
    useEffect(() => {
        handleData();
    }, []);
    let handleData = async () => {
        let responseProductSetHot = await GetProductBySet(
            "http://localhost:3030/models/product/get-by-sold/sort"
        );
        setproductSetHot(responseProductSetHot);
        let responseProductSetNew = await GetProductBySet(
            "http://localhost:3030/models/product/by-time"
        );
        setproductSetNew(responseProductSetNew);
        let responseProductSet5 = await GetProductBySet(
            "http://localhost:3030/models/product/by-set/5"
        );
        setproductSet5(responseProductSet5);
        let responseProductSet6 = await GetProductBySet(
            "http://localhost:3030/models/product/by-set/6"
        );
        setproductSet6(responseProductSet6);
        let responseProductSet7 = await GetProductBySet(
            "http://localhost:3030/models/product/by-set/7"
        );
        setproductSet7(responseProductSet7);
        let responseProductSet8 = await GetProductBySet(
            "http://localhost:3030/models/product/by-set/8"
        );
        setproductSet8(responseProductSet8);
    };
    const height = 400;
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>{Header()}</Box>
            <Box
                sx={{
                    width: "100%",
                    height: { height },
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab("TRUYỆN HOT", productSetHot)}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: { height },
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab("TRUYỆN MỚI", productSetNew)}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: { height },
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab("TRUYỆN NARUTO", productSet5)}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: { height },
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab("TRUYỆN DRAGON BALL", productSet6)}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: { height },
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab("TRUYỆN ONE PIECE", productSet7)}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: { height },
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab("TRUYỆN BLEACH", productSet8)}
            </Box>
        </Box>
    );
}
