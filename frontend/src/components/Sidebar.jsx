import {
    LayoutDashboard,
    ListChecks,
    BarChart3,
    Sparkles,
    UserCircle2,
    Bell,
    Flame
} from "lucide-react";

import { NavLink } from "react-router-dom";

const menu = [
    { name: "Dashboard", path: "/dashboard", icon: LayoutDashboard },
    { name: "Habits", path: "/habits", icon: ListChecks },
    { name: "Analytics", path: "/analytics", icon: BarChart3 },
    { name: "AI Insights", path: "/insights", icon: Sparkles },
    { name: "Profile", path: "/profile", icon: UserCircle2 },
    { name: "Notifications", path: "/notifications", icon: Bell }
];

export default function Sidebar() {

    return (
        <aside className="flex w-64 shrink-0 min-h-screen flex-col bg-ink-950 text-white px-5 py-7">

            <div className="flex items-center gap-3 px-2 mb-10">
                <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center shadow-soft">
                    <Flame size={20} className="text-white" />
                </div>
                <div className="leading-tight">
                    <p className="text-lg font-extrabold tracking-tight">Habit AI</p>
                    <p className="text-[11px] uppercase tracking-wider text-ink-400">Intelligence System</p>
                </div>
            </div>

            <nav className="flex-1 space-y-1">
                {menu.map((item) => {
                    const Icon = item.icon;
                    return (
                        <NavLink
                            key={item.path}
                            to={item.path}
                            className={({ isActive }) =>
                                `group flex items-center gap-3 px-3.5 py-2.5 rounded-xl text-sm font-medium transition-all duration-150 ${
                                    isActive
                                        ? "bg-brand-600 text-white shadow-soft"
                                        : "text-ink-300 hover:bg-white/5 hover:text-white"
                                }`
                            }
                        >
                            <Icon size={18} className="shrink-0" />
                            <span>{item.name}</span>
                        </NavLink>
                    );
                })}
            </nav>

            <div className="mt-6 rounded-xl bg-white/5 border border-white/10 p-4">
                <p className="text-xs text-ink-300 leading-relaxed">
                    Small steps, tracked daily, compound into big change.
                </p>
            </div>
        </aside>
    );
}
