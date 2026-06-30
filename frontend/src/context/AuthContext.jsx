import { createContext, useContext, useEffect, useState } from "react";

const AuthContext = createContext();

export function AuthProvider({ children }) {

    const [token, setToken] = useState(
        localStorage.getItem("token")
    );

    const [user, setUser] = useState(null);

    const [loading, setLoading] = useState(true);

    useEffect(() => {

        if (token) {

            setUser({
                token
            });

        }

        setLoading(false);

    }, [token]);

    function login(jwtToken) {

        localStorage.setItem(
            "token",
            jwtToken
        );

        setToken(jwtToken);

    }

    function logout() {

        localStorage.removeItem("token");

        setToken(null);

        setUser(null);

    }

    return (

        <AuthContext.Provider
            value={{
                token,
                user,
                login,
                logout,
                isAuthenticated: !!token
            }}
        >

            {!loading && children}

        </AuthContext.Provider>

    );

}

export function useAuth() {

    return useContext(AuthContext);

}