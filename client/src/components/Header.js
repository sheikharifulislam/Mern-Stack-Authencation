import axios from "axios";
import React from "react";
import { NavLink } from "react-router-dom";

export default function Header() {
    const handleLogout = () => {
        axios.get("http://localhost:5000/auth/logout").then((response) => {
            if (response.data.success) {
                alert(response.data.message);
            }
        });
    };
    return (
        <div className="header">
            <NavLink to="/">Home</NavLink>
            <NavLink to="/registration">Registration</NavLink>
            <NavLink to="/login">Login</NavLink>
            <NavLink to="/profile">Profile</NavLink>
            <button onClick={handleLogout}>LogOut</button>
        </div>
    );
}
