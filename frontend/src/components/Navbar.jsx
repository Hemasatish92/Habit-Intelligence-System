import { FaSignOutAlt, FaUserCircle } from "react-icons/fa";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
    const { logout } = useAuth();

    const email = localStorage.getItem("email") || "User";

    return (
        <header className="bg-white shadow-sm border-b h-16 flex items-center justify-between px-8">

            <div>
                <h1 className="text-2xl font-bold text-slate-800">
                    Habit Intelligence
                </h1>

                <p className="text-sm text-gray-500">
                    AI Powered Habit Tracker
                </p>
            </div>

            <div className="flex items-center gap-5">

                <div className="flex items-center gap-2">

                    <FaUserCircle
                        size={34}
                        className="text-blue-600"
                    />

                    <span className="font-medium">
                        {email}
                    </span>

                </div>

                <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg transition"
                >
                    <FaSignOutAlt />
                    Logout
                </button>

            </div>

        </header>
    );
}