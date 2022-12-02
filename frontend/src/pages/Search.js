import * as React from "react";
import Box from "@mui/material/Box";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import ProductGrid from "../components/ProductGrid";

async function SearchProductByName(searchName) {
  let url = `${process.env.REACT_APP_SV_HOST}/search/?name=` + searchName;
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
  let [productInfo, setProductInfo] = useState([]);
  useEffect(() => {
    handleData();
  }, [searchName]);
  let handleData = async () => {
    let response = await SearchProductByName(searchName);
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
        {ProductGrid("Search Result", productInfo)}
      </Box>
    </Box>
  );
}
