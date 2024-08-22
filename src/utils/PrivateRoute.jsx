import React from "react";
import { Navigate } from "react-router-dom";
import { UserData } from "./userData";

function PrivateRoute({ children, allowedRoles }) {
    const user = UserData();
    if (user) {
        return (
            children
        );
    } else {
        return <Navigate to="/login" />;
    }
}
export default PrivateRoute;
