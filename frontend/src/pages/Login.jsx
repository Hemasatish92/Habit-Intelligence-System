import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Flame, Mail, Lock } from "lucide-react";

import api from "../services/api";
import { useAuth } from "../context/AuthContext";

export default function Login() {

    const navigate = useNavigate();
    const { login } = useAuth();

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [submitting, setSubmitting] = useState(false);

    async function handleSubmit(e) {
        e.preventDefault();
        setError("");
        setSubmitting(true);

        try {
            const response = await api.post("/auth/login", { email, password });
            localStorage.setItem("email", email);
            login(response.data.access_token);
            navigate("/dashboard");
        }
        catch (err) {
            setError(err.response?.data?.detail || "Login Failed");
        }
        finally {
            setSubmitting(false);
        }
    }

    const inputClasses = "w-full border border-ink-200 rounded-lg pl-10 pr-3.5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition";

    return (
        <div className="min-h-screen bg-ink-950 flex items-center justify-center p-4 relative overflow-hidden">

            <div className="absolute -top-40 -left-40 h-96 w-96 bg-brand-600/30 rounded-full blur-3xl" />
            <div className="absolute -bottom-40 -right-40 h-96 w-96 bg-purple-600/20 rounded-full blur-3xl" />

            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-soft-lg p-8 md:p-10">

                <div className="flex flex-col items-center mb-8">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mb-3 shadow-soft">
                        <Flame size={24} className="text-white" />
                    </div>
                    <h1 className="text-2xl font-extrabold text-ink-900">
                        Welcome Back
                    </h1>
                    <p className="text-ink-400 mt-1 text-sm">
                        Sign in to continue tracking your habits.
                    </p>
                </div>

                {error && (
                    <div className="bg-red-50 text-red-700 text-sm p-3 rounded-lg mb-5 border border-red-100">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-4">

                    <div className="relative">
                        <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                        <input
                            type="email"
                            placeholder="Email"
                            className={inputClasses}
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>

                    <div className="relative">
                        <Lock size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-ink-400" />
                        <input
                            type="password"
                            placeholder="Password"
                            className={inputClasses}
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                        />
                    </div>

                    <button
                        disabled={submitting}
                        className="w-full bg-brand-600 hover:bg-brand-700 text-white rounded-lg py-3 font-semibold transition-colors disabled:opacity-60"
                    >
                        {submitting ? "Signing in..." : "Login"}
                    </button>

                </form>

                <p className="text-center mt-6 text-sm text-ink-500">
                    Don't have an account?{" "}
                    <Link to="/register" className="text-brand-600 font-semibold">
                        Register
                    </Link>
                </p>

            </div>

        </div>
    );
}
