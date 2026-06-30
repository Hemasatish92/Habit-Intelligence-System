import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import api from "../services/api";

export default function Register() {

    const navigate = useNavigate();

    const [email,setEmail]=useState("");

    const [password,setPassword]=useState("");

    const [confirmPassword,setConfirmPassword]=useState("");

    const [error,setError]=useState("");

    async function handleSubmit(e){

        e.preventDefault();

        setError("");

        if(password!==confirmPassword){

            setError("Passwords do not match");

            return;
        }

        try{

            await api.post("/auth/register",{

                email,
                password

            });

            navigate("/login");

        }

        catch(err){

            setError(

                err.response?.data?.detail ||

                "Registration Failed"

            );

        }

    }

    return(

        <div className="min-h-screen bg-gradient-to-r from-blue-700 via-blue-500 to-cyan-400 flex justify-center items-center">

            <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md p-10">

                <h1 className="text-4xl font-bold text-center text-blue-600">

                    Habit AI

                </h1>

                <p className="text-center mt-2 mb-8 text-gray-500">

                    Create your account

                </p>

                {error &&

                    <div className="bg-red-100 text-red-700 rounded p-3 mb-5">

                        {error}

                    </div>

                }

                <form
                    onSubmit={handleSubmit}
                    className="space-y-5"
                >

                    <input

                        type="email"

                        placeholder="Email"

                        className="w-full border rounded-lg p-3"

                        value={email}

                        onChange={(e)=>setEmail(e.target.value)}

                    />

                    <input

                        type="password"

                        placeholder="Password"

                        className="w-full border rounded-lg p-3"

                        value={password}

                        onChange={(e)=>setPassword(e.target.value)}

                    />

                    <input

                        type="password"

                        placeholder="Confirm Password"

                        className="w-full border rounded-lg p-3"

                        value={confirmPassword}

                        onChange={(e)=>setConfirmPassword(e.target.value)}

                    />

                    <button

                        className="w-full bg-blue-600 hover:bg-blue-700 text-white rounded-lg py-3"

                    >

                        Register

                    </button>

                </form>

                <p className="text-center mt-6">

                    Already have an account?

                    <Link

                        to="/login"

                        className="text-blue-600 font-semibold ml-2"

                    >

                        Login

                    </Link>

                </p>

            </div>

        </div>

    );

}