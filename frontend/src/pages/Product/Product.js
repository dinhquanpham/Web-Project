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

async function GetProviderById(providerId) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/provider/by-id/` + providerId;
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
    let [categoryInfo, setCategoryInfo] = useState([]);
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
        setCategoryInfo(response.categories);
        setAmount((counter) => 1);
    };
    let navigate = useNavigate();
    let [amount, setAmount] = useState(1);
    function changeAmount(value) {
        setAmount((counter) => Math.max(1, counter + value));
    }
    let productShow = ((data = productInfo) => (
        <Item className="box product box-product-info">
            <Box className="box product box-product-image">
                <img
                    className="image"
                    src={data.image}
                    alt={data.productName}
                />
            </Box>
            <Box className="box product box-product-detail">
                <Box className="box product box-product-text">
                    <Box className="box product box-product-name">
                        {data.productName}
                    </Box>
                    <Box
                        className="box product box-product-set-name"
                        onClick={() =>
                            navigate(`/product-set/?id=${data.productsetId}`)
                        }
                    >
                        Bộ: {data.setName}
                    </Box>
                    <Box className="box product box-product-provider-name">
                        Nhà xuất bản: {data.providerName}
                    </Box>
                    <Box className="box product box-product-price">
                        Giá: {data.price}
                    </Box>
                </Box>
                <Box className="box product box-quantity-control">
                    <Button
                        className="box product button-quantity-change"
                        onClick={() => {
                            changeAmount(-1);
                        }}
                    >
                        -
                    </Button>
                    <Box className="box product box-quantity-num">{amount}</Box>
                    <Button
                        className="box product button-quantity-change"
                        onClick={() => {
                            changeAmount(1);
                        }}
                    >
                        +
                    </Button>
                </Box>
                <Button
                    className="box product button-add-to-cart"
                    variant="outlined"
                    onClick={() => {
                        let userId = sessionStorage.getItem("userId");
                        let info = localStorage.getItem(
                            userId * 1000 + data.id
                        );
                        info = JSON.parse(info);
                        let quantity = info == null ? 0 : info.quantity;
                        quantity += amount;
                        let newInfo = {
                            productName: data.productName,
                            image: data.image,
                            price: data.price,
                            quantity: quantity,
                        };
                        newInfo = JSON.stringify(newInfo);
                        localStorage.setItem(userId * 1000 + data.id, newInfo);
                    }}
                >
                    THÊM VÀO GIỎ
                </Button>
            </Box>
        </Item>
    ))();
    let categoryShow =
        Array.isArray(categoryInfo) &&
        categoryInfo.map((data) => (
            <Box className="box product category-show">{data.name} </Box>
        ));

    let productInfoDetailShow = ((data = productInfo) => (
        <Item className="box product product-info-detail-show">
            <Box className="box product product-info-detail-show-element">
                Nhà xuất bản: {data.providerName}{" "}
            </Box>
            <Box className="box product product-info-detail-show-element">
                Tác giả: {data.authorName}{" "}
            </Box>
            <Box className="box product product-info-detail-show-element">
                Năm xuất bản: {data.publishedYear}{" "}
            </Box>
            <Box className="box product product-info-detail-show-element">
                Kích thước bìa: {data.productSize}{" "}
            </Box>
            <Box className="box product product-info-detail-show-element">
                Số trang: {data.pageNumber}{" "}
            </Box>
            <Box className="box product product-info-detail-show-element">
                Thể loại: {categoryShow}{" "}
            </Box>
        </Item>
    ))();
    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Box className="box">{productShow}</Box>
            <Box className="box">{productInfoDetailShow}</Box>
            <Box className="box">
                {ProductTab("TRUYỆN CÙNG THỂ LOẠI", productInSetInfo)}
            </Box>
        </Box>
    );
}
