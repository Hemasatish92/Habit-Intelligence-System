import { LogOut, UserCircle2, Menu } from "lucide-react";
import { useAuth } from "../context/AuthContext";

export default function Navbar({ onMenuClick }) {
    const { logout } = useAuth();

    const email = localStorage.getItem("email") || "User";

    return (
        <header className="sticky top-0 z-10 bg-white/80 backdrop-blur border-b border-ink-100 h-16 flex items-center justify-between px-5 md:px-8">

            <div className="flex items-center gap-3">
                <button
                    onClick={onMenuClick}
                    className="md:hidden p-2 rounded-lg hover:bg-ink-100 text-ink-700"
                >
                    <Menu size={20} />
                </button>
                <div>
                    <h1 className="text-lg md:text-xl font-bold text-ink-900 leading-tight">
                        Habit Intelligence
                    </h1>
                    <p className="text-xs text-ink-400 hidden sm:block">
                        AI-powered habit tracking
                    </p>
                </div>
            </div>

            <div className="flex items-center gap-3 md:gap-5">

                <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 rounded-full bg-ink-100">
                    <UserCircle2 size={20} className="text-brand-600" />
                    <span className="text-sm font-medium text-ink-700">{email}</span>
                </div>

                <button
                    onClick={logout}
                    className="flex items-center gap-2 bg-ink-900 hover:bg-ink-800 text-white text-sm font-medium px-3.5 py-2 rounded-lg transition-colors"
                >
                    <LogOut size={16} />
                    <span className="hidden sm:inline">Logout</span>
                </button>

            </div>

        </header>
    );
}
