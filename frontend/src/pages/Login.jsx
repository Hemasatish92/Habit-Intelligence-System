import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();

    const { login } = useAuth();

    const [email, setEmail] = useState("");

    const [password, setPassword] = useState("");

    const [error, setError] = useState("");

    async function handleSubmit(e) {

        e.preventDefault();

        setError("");

        try {

            const response = await api.post("/auth/login", {
                email,
                password
            });

            localStorage.setItem("email", email);

            login(response.data.access_token);

            navigate("/dashboard");

        } catch (err) {

            setError(
                err.response?.data?.detail ||
                "Login Failed"
            );

        }

    }

    return (

        <div className="min-h-screen bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 flex items-center justify-center">

            <div className="bg-white w-full max-w-md rounded-2xl shadow-2xl p-10">

                <h1 className="text-4xl font-bold text-center text-blue-600">

                    Habit AI

                </h1>

                <p className="text-center text-gray-500 mt-2 mb-8">

                    Welcome Back 👋

                </p>

                {error && (

                    <div className="bg-red-100 text-red-700 p-3 rounded mb-5">

                        {error}

                    </div>

                )}

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input
                        type="email"
                        placeholder="Email"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={email}
                        onChange={(e)=>setEmail(e.target.value)}
                    />

                    <input
                        type="password"
                        placeholder="Password"
                        className="w-full border rounded-lg p-3 focus:ring-2 focus:ring-blue-500 outline-none"
                        value={password}
                        onChange={(e)=>setPassword(e.target.value)}
                    />

                    <button
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3 font-semibold transition"
                    >

                        Login

                    </button>

                </form>

                <p className="text-center mt-6 text-gray-600">

                    Don't have an account?

                    <Link
                        to="/register"
                        className="text-blue-600 font-semibold ml-2"
                    >

                        Register

                    </Link>

                </p>

            </div>

        </div>

    );

}