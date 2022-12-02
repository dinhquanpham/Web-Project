import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Product from "./pages/Product";
import ProductSet from "./pages/ProductSet";
import UserInfo from "./pages/UserInfo/UserInfo";
import { createTheme } from "@mui/system";
import { ThemeProvider } from "@emotion/react";
import { Navigate } from 'react-router-dom';
import PrivateUserRoute from './components/PrivateRoute'

export default function App() {
    const [mode, setMode] = useState("light");
    const [userRoute, setUserRoute] = useState("PrivateRoute");
    const darkTheme = createTheme({
        palette: {
            mode: mode,
        }
    });
    return (
        // <ThemeProvider theme={darkTheme}>
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />}></Route>
                <Route path="/sign-in" element={<SignIn />}></Route>
                <Route path="/sign-up" element={<SignUp />}></Route>
                <Route path="/product" element={<Product />}>
                    <Route path="?id=" element={<Product />} />
                </Route>
                <Route path="/product-set" element={<ProductSet />}>
                    <Route path="?id=" element={<ProductSet />} />
                </Route>
                {/* <Route path="/user" element ={<UserInfo />}>
                </Route> */}
                <Route path="/user" element={<PrivateUserRoute Component={UserInfo} />} />
                     <Route path="/?id=" element={<UserInfo />} />
            </Routes>
        </BrowserRouter >
        // </ThemeProvider>
    );
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
    <React.StrictMode>
        <App />
    </React.StrictMode>
);
