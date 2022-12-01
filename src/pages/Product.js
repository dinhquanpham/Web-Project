import * as React from "react";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Header from "../components/Header";
import ProductTab from "../components/ProductTab";

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

export default function Product() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let productId = params.get("id");
    let [productInfo, setProductInfo] = useState([]);
    let [productSetId, setProductSetId] = useState("");
    let [productSetInfo, setProductSetInfo] = useState([]);
    useEffect(() => {
        handleData();
    }, [productId]);
    let handleData = async () => {
        let response = await GetProductById(productId);
        setProductInfo(response.product[0]);
        setProductSetId(productInfo.productsetId);
        setProductSetInfo(response.productBySet);
    };
    let navigate = useNavigate();
    let productShow = <Box></Box>;
    if (productInfo.length !== 0) {
        productShow = ((data = productInfo) => (
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
                    <Box>{data.productName}</Box>
                    <Box>Giá: {data.price}</Box>
                    <Box>
                        Bộ:
                        <Box
                            style={{ cursor: "pointer" }}
                            onClick={() =>
                                navigate(
                                    `/product-set/?id=${data.productsetId}`
                                )
                            }
                        >
                            {data.setName}
                        </Box>
                    </Box>
                </Box>
            </Box>
        ))();
    }
    return (
        <Box sx={{ flexGrow: 1 }}>
            <Box width="100%">{Header()}</Box>
            <Box width="100%">
                <Item style={{ cursor: "pointer" }}>{productShow}</Item>
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: 300,
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab(
                    "TRUYỆN CÙNG THỂ LOẠI",
                    `http://localhost:3030/models/product/by-set/${productInfo.productsetId}`
                )}
            </Box>
            <Box
                sx={{
                    width: "100%",
                    height: 300,
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab(
                    "TRUYỆN HOT",
                    `http://localhost:3030/models/product/get-by-sold/sort`
                )}
            </Box>
        </Box>
    );
}
