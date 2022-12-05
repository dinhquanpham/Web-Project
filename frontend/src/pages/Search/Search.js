import * as React from "react";
import Box from "@mui/material/Box";
import Pagination from '@mui/material/Pagination';
import PaginationItem from '@mui/material/PaginationItem';
import { useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import ProductGrid from "../../components/ProductGrid/ProductGrid";
import { Link } from "react-router-dom";

async function SearchProductByName(searchName, page, pageSize) {
    let url = `${process.env.REACT_APP_SV_HOST}/search/?name=${searchName}&page=${page}&size=${pageSize}`;
    let data = await fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
        },
    }).then((data) => data.json());
    return data;
}

export default function Search() {
    let search = window.location.search;
    let params = new URLSearchParams(search);
    let searchName = params.get("name");
    if (searchName === null) searchName = "";
    let page = parseInt(params.get("page") || '1', 10);
    let pageSize = parseInt(params.get("size") || '10', 10);
    let [productInfo, setProductInfo] = useState([]);
    useEffect(() => {
        handleData();
    }, [searchName, page, pageSize]);
    let handleData = async () => {
        let response = await SearchProductByName(searchName, page, pageSize);
        setProductInfo(response);
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
                {ProductGrid("Search Result", productInfo, pageSize)}
            </Box>
            <Box sx={{ flexGrow: 1, width: "100%", height: "100%" }}>
                <Pagination
                    page={page}
                    count={10}
                    renderItem={(item) => (
                        <PaginationItem
                            component={Link}
                            to={`/search/?name=${searchName}&page=${item.page}&size=${pageSize}`}
                            {...item}
                        />
                    )}
                    siblingCount={0} 
                    boundaryCount={0}
                />
            </Box>
        </Box>
    );
}
