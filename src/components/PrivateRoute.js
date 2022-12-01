import React from 'react';
import { Navigate } from 'react-router-dom';
import UserInfo from '../pages/UserInfo/UserInfo'

export default function PrivateUserRoute() {
    const auth = sessionStorage.getItem('userId');
    return auth ? <UserInfo /> : <Navigate to="/sign-in" />;
}
