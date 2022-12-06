import React from "react";
import { Navigate } from "react-router-dom";
import UserInfo from "../../pages/UserInfo/UserInfo";
import AdminInfo from "../../pages/Admin/Admin";
import Cart from "../../pages/Cart/Cart";

export default function PrivateRoute({ type = null }) {
    if (type === "user") {
        const auth = sessionStorage.getItem("userId");
        if (auth) {
            let admin = sessionStorage.getItem("admin");
            return admin === "true" ? <AdminInfo /> : <UserInfo />;
        }
        return <Navigate to="/sign-in" />;
    }
    if (type === "cart") {
        const auth = sessionStorage.getItem("userId");
        if (auth) {
            let admin = sessionStorage.getItem("admin");
            return <Cart />;
        }
        return <Navigate to="/sign-in" />;
    }
    <Navigate to="/sign-in" />;
}
