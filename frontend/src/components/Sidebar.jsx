import {
    FaHome,
    FaClipboardList,
    FaChartLine,
    FaRobot,
    FaUser,
    FaBell
} from "react-icons/fa";

import { NavLink } from "react-router-dom";

const menu = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: <FaHome />
    },
    {
        name: "Habits",
        path: "/habits",
        icon: <FaClipboardList />
    },
    {
        name: "Analytics",
        path: "/analytics",
        icon: <FaChartLine />
    },
    {
        name: "AI Insights",
        path: "/insights",
        icon: <FaRobot />
    },
    {
        name: "Profile",
        path: "/profile",
        icon: <FaUser />
    },
    {
        name: "Notifications",
        path: "/notifications",
        icon: <FaBell />
    }
];

export default function Sidebar() {

    return (

        <aside className="w-64 min-h-screen bg-slate-900 text-white p-6">

            <h1 className="text-3xl font-bold text-center text-blue-400">

                HABIT AI

            </h1>

            <p className="text-center text-gray-400 text-sm mb-10">

                Intelligence System

            </p>

            <nav className="space-y-2">

                {

                    menu.map((item) => (

                        <NavLink

                            key={item.path}

                            to={item.path}

                            className={({ isActive }) =>

                                `flex items-center gap-4 px-4 py-3 rounded-lg transition

                                ${

                                    isActive

                                    ?

                                    "bg-blue-600"

                                    :

                                    "hover:bg-slate-700"

                                }`

                            }

                        >

                            {item.icon}

                            {item.name}

                        </NavLink>

                    ))

                }

            </nav>

        </aside>

    );

}