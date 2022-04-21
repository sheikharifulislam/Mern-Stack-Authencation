import axios from "axios";
import React, { useState } from "react";

export default function Login() {
    const [userData, setUserData] = useState({});

    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const copayPreviousData = { ...userData };
        copayPreviousData[field] = value;
        setUserData(copayPreviousData);
    };

    const handleLogin = (e) => {
        e.preventDefault();
        axios.post("http://localhost:5000/auth/login", userData).then((response) => {          
            if (response.data.success) {
                setUserData(response.data.user);
                alert("Succefully logged in");
            }
        });
    };

    return (
        <form onSubmit={handleLogin}>
            <input
                type="email"
                name="email"
                placeholder="Enter Your Email"
                required
                onInput={handleInput}
            />
            <input
                type="password"
                name="password"
                placeholder="Enter your password"
                required
                onInput={handleInput}
            />
            <input type="submit" value="Login" />
        </form>
    );
}
