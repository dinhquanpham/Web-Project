import * as React from "react";
import Box from "@mui/material/Box";
import Pagination from "@mui/material/Pagination";
import PaginationItem from "@mui/material/PaginationItem";
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { Link } from 'react-router-dom';
import "./ProductSet.css";

async function GetProductSetById(productSetId, page, pageSize) {
    let url =
        `${process.env.REACT_APP_SV_HOST}/models/product/by-set/${productSetId}?page=${page}&size=${pageSize}`;
    if (productSetId == "hot") {
        url = `${process.env.REACT_APP_SV_HOST}/models/product/get-by-sold/sort?page=${page}&size=${pageSize}`;
    }
    if (productSetId == "new") {
        url = `${process.env.REACT_APP_SV_HOST}/models/product/by-time?page=${page}&size=${pageSize}`;
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
    let page = parseInt(params.get("page") || "1", 10);
    let pageSize = parseInt(params.get("size") || "10", 10);
    let [productSetInfo, setProductSetInfo] = useState([]);
    useEffect(() => {
        handleData();
        window.scrollTo(0, 0);
    }, [productsetId, page, pageSize]);
    let handleData = async () => {
        let response = await GetProductSetById(productsetId, page, pageSize);
        setProductSetInfo(response);
    };

    console.log(productSetInfo);
    return (
        <Box className="box">
            <Box className="box">{Header()}</Box>
            <Box className="box">
                {ProductGrid(productSetInfo.name, productSetInfo)}
            </Box>
            <Box className="box search box-pagination">
                <Pagination
                    className="box search pagination"
                    page={page}
                    count={10}
                    renderItem={(item) => (
                        <PaginationItem
                            className="box search pagination-item"
                            component={Link}
                            to={`/product-set/?id=${productsetId}&page=${item.page}&size=${pageSize}`}
                            {...item}
                        />
                    )}
                    siblingCount={1}
                    boundaryCount={1}
                />
            </Box>
        </Box>
    );
}
