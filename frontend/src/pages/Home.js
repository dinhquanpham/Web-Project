import * as React from "react";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import ProductTab from "../components/ProductTab";

export default function Home() {
    return (
        <Box sx={{ flexGrow: 1, width: "100%" }}>
            <Box sx={{ width: "100%" }}>{Header()}</Box>
            <Box sx={{ width: "100%", height: "300px", marginTop: "2%" }}>
                {ProductTab(
                    "TRUYỆN HOT",
                    `http://localhost:3030/models/product/get-by-sold/sort`
                )}
            </Box>
            <Box sx={{ width: "100%", height: "300px", marginTop: "2%" }}>
                {ProductTab(
                    "TRUYỆN MỚI",
                    `http://localhost:3030/models/product/by-set/6`
                )}
            </Box>
            <Box sx={{ width: "100%", height: "300px", marginTop: "2%" }}>
                {ProductTab(
                    "TRUYỆN NARUTO",
                    `http://localhost:3030/models/product/by-set/5`
                )}
            </Box>
        </Box>
    );
}