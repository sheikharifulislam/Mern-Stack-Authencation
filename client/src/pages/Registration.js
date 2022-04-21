import axios from "axios";
import React, { useState } from "react";

export default function Registration() {
    const [userData, setUserData] = useState({});
    const handleInput = (e) => {
        const field = e.target.name;
        const value = e.target.value;
        const copyPreviousData = { ...userData };
        copyPreviousData[field] = value;
        setUserData(copyPreviousData);
    };

    const handleregistration = (e) => {
        e.preventDefault();
        axios.post(`http://localhost:5000/auth/registration`, userData).then((response) => {
            if (response.data.success) {
                alert("Registration successful");
            }
        });
    };

    return (
        <form onSubmit={handleregistration}>
            <input type="text" name="name" placeholder="Enter Your Name" onInput={handleInput} />
            <input type="email" name="email" placeholder="Enter Your Email" onInput={handleInput} />
            <input
                type="password"
                name="password"
                placeholder="Enter Your Password"
                onInput={handleInput}
            />
            <input type="submit" value="Registration" />
        </form>
    );
}
