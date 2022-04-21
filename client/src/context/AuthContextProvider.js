import axios from "axios";
import React, { createContext, useEffect, useState } from "react";
export const AuthContext = createContext();

export default function AuthContextProvider({ children }) {
    const [user, setUser] = useState({});
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get("http://localhost:5000/auth/current-user")
            .then((response) => {
                if (response.data.user) {
                    console.log(response.data.user);
                    setLoading(false);
                    setUser(response.data.user);
                }
            })
            .catch(() => {
                setLoading(false);
            });
    }, []);

    return (
        <AuthContext.Provider value={{ user, loading }}>
            {children}
        </AuthContext.Provider>
    );
}
