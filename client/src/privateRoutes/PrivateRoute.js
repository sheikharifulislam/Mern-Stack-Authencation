import React, { useContext } from "react";
import { Navigate, useLocation } from "react-router-dom";
import LoadingSpinner from "../components/LoadingSpinner";
import { AuthContext } from "../context/AuthContextProvider";

export default function PrivateRoute({ children }) {
    const { user, loading } = useContext(AuthContext);
    const location = useLocation();
    if (loading) {
        return <LoadingSpinner />;
    }

    if (!user.email) {
        return <Navigate to="/login" state={{ from: location }} replace />;
    }

    return children;
}
