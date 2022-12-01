import * as React from "react";
import Box from "@mui/material/Box";
import Header from "../components/Header";
import ProductTab from "../components/ProductTab";

export default function Home() {
    return (
        <Box sx={{ width: "100%" }}>
            <Box sx={{ width: "100%" }}>{Header()}</Box>
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
            <Box
                sx={{
                    width: "100%",
                    height: 300,
                    marginTop: "2%",
                    boxSizing: "border-box",
                }}
            >
                {ProductTab(
                    "TRUYỆN MỚI",
                    `http://localhost:3030/models/product/by-time`
                )}
            </Box>
            {Array.from([5, 6, 7, 8]).map((index, i) => (
                <Box
                    key={i}
                    sx={{
                        width: "100%",
                        height: 300,
                        marginTop: "2%",
                        boxSizing: "border-box",
                    }}
                >
                    {ProductTab(
                        "SELF",
                        `http://localhost:3030/models/product/by-set/${index}`
                    )}
                </Box>
            ))}
        </Box>
    );
}
