
import React from 'react';
import { Navigate } from 'react-router-dom';
import UserInfo from '../../pages/UserInfo/UserInfo'
import AdminInfo from '../../pages/Admin/Admin'
import OrderDetail from '../../pages/OrderDetail/OrderDetail';


export default function PrivateRoute({ type = null }) {
    if (type === "user") {
        const auth = sessionStorage.getItem("userId");
        if (auth) {
            let admin = sessionStorage.getItem("admin");
            return admin === "true" ? <AdminInfo /> : <UserInfo />;
        }
        return <Navigate to="/sign-in" />;
    }

    if (type === 'order-detail') {
        const auth = sessionStorage.getItem('userId');
        if(auth) {
            return <OrderDetail />;
        }
        else return <Navigate to="/sign-in" />;
    }
    return <Navigate to="/sign-in" />

}
