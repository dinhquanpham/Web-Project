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
        window.scrollTo(0, 0);
    }, []);
    let handleData = async () => {
        let responseProductSetHot = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/get-by-sold/sort`
        );
        setproductSetHot(responseProductSetHot);
        let responseProductSetNew = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/by-time`
        );
        setproductSetNew(responseProductSetNew);
        let responseProductSet5 = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/by-set/5`
        );
        setproductSet5(responseProductSet5);
        let responseProductSet6 = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/by-set/6`
        );
        setproductSet6(responseProductSet6);
        let responseProductSet7 = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/by-set/7`
        );
        setproductSet7(responseProductSet7);
        let responseProductSet8 = await GetProductBySet(
            `${process.env.REACT_APP_SV_HOST}/models/product/by-set/8`
        );
        setproductSet8(responseProductSet8);
    };
    let height = 450;
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
                {ProductTab("BỘ", productSet5)}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: { height },
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab("BỘ", productSet6)}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: { height },
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab("BỘ", productSet7)}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: { height },
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab("BỘ", productSet8)}
            </Box>
        </Box>
    );
}
