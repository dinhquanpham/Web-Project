import React from 'react';
import { Navigate } from 'react-router-dom';
import UserInfo from '../pages/UserInfo/UserInfo'
import AdminInfo from '../pages/Admin/Admin'

export default function PrivateUserRoute() {
    const auth = sessionStorage.getItem('userId');
    if(auth) {
        let admin = sessionStorage.getItem('admin');
        return (admin === 'true') ? <AdminInfo /> : <UserInfo/>;
    }
    return <Navigate to="/sign-in" />;
}
