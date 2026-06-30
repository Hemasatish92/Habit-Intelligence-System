import { useAuth } from "../context/AuthContext";
import { UserCircle2, Mail, ShieldCheck } from "lucide-react";

export default function Profile() {

    const { logout } = useAuth();
    const email = localStorage.getItem("email") || "User";

    return (
        <div className="max-w-2xl">

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-ink-900">
                    Profile
                </h1>
                <p className="text-ink-500 mt-1">
                    Manage your account details.
                </p>
            </div>

            <div className="card p-8">

                <div className="flex items-center gap-4 pb-6 border-b border-ink-100">
                    <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center text-white">
                        <UserCircle2 size={34} />
                    </div>
                    <div>
                        <p className="text-lg font-bold text-ink-900">{email}</p>
                        <p className="text-sm text-ink-400">Habit Intelligence member</p>
                    </div>
                </div>

                <div className="py-6 space-y-4">

                    <div className="flex items-center gap-3 text-sm">
                        <Mail size={16} className="text-ink-400" />
                        <span className="text-ink-500">Email</span>
                        <span className="ml-auto font-medium text-ink-900">{email}</span>
                    </div>

                    <div className="flex items-center gap-3 text-sm">
                        <ShieldCheck size={16} className="text-ink-400" />
                        <span className="text-ink-500">Account Status</span>
                        <span className="ml-auto font-medium text-emerald-600">Active</span>
                    </div>

                </div>

                <button
                    onClick={logout}
                    className="w-full bg-red-50 hover:bg-red-100 text-red-600 font-semibold text-sm py-3 rounded-lg transition-colors"
                >
                    Logout
                </button>

            </div>

        </div>
    );
}
