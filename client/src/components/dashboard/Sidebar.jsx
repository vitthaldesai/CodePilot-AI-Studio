import { Link, useLocation, useNavigate } from "react-router-dom";

import {
    LayoutDashboard,
    Code2,
    History,
    User,
    LogOut,
} from "lucide-react";

const menuItems = [
    {
        name: "Dashboard",
        path: "/dashboard",
        icon: LayoutDashboard,
    },
    {
        name: "Review Code",
        path: "/review",
        icon: Code2,
    },
    {
        name: "History",
        path: "/history",
        icon: History,
    },
    {
        name: "Profile",
        path: "/profile",
        icon: User,
    },
];

export default function Sidebar() {
    const location = useLocation();
    const navigate = useNavigate();

    function handleLogout() {
        localStorage.removeItem("token");
        navigate("/login");
    }

    return (
        <aside className="
            hidden
            lg:flex
            w-64
            shrink-0
            min-h-screen
            flex-col
            bg-[#060812]
            border-r
            border-white/[0.06]
        ">

            {/* Logo */}
            <div className="px-6 py-6 border-b border-white/[0.06]">

                <Link
                    to="/"
                    className="flex items-center gap-3"
                >

                    <div className="
                        w-10
                        h-10
                        rounded-xl
                        bg-gradient-to-br
                        from-[#ff4b45]
                        to-[#d51f25]
                        flex
                        items-center
                        justify-center
                        shadow-[0_8px_25px_-8px_rgba(239,59,57,0.8)]
                    ">
                        <svg
                            className="w-6 h-6 text-white"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth={2.5}
                                d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4"
                            />
                        </svg>
                    </div>

                    <div className="leading-none">

                        <div className="
                            text-xl
                            font-bold
                            tracking-tight
                            text-white
                        ">
                            CodePilot
                        </div>

                        <div className="
                            mt-1
                            text-[9px]
                            font-mono
                            tracking-[0.2em]
                            text-[#ff514b]
                        ">
                            AI REVIEW
                        </div>

                    </div>

                </Link>

            </div>

            {/* Navigation */}
            <nav className="flex-1 px-4 py-6">

                <p className="
                    px-3
                    mb-3
                    text-[10px]
                    font-semibold
                    uppercase
                    tracking-[0.18em]
                    text-slate-600
                ">
                    Workspace
                </p>

                <div className="space-y-1.5">

                    {menuItems.map((item) => {

                        const Icon = item.icon;

                        const active =
                            location.pathname === item.path ||
                            (
                                item.path === "/review" &&
                                location.pathname.startsWith("/review/")
                            ) ||
                            (
                                item.path === "/history" &&
                                location.pathname.startsWith("/history/")
                            );

                        return (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`
                                    group
                                    flex
                                    items-center
                                    gap-3
                                    px-3
                                    py-3
                                    rounded-xl
                                    text-sm
                                    transition-all
                                    duration-200
                                    ${active
                                        ? "bg-red-500/10 text-white border border-red-500/15"
                                        : "text-slate-500 hover:text-white hover:bg-white/[0.035]"
                                    }
                                `}
                            >

                                <Icon
                                    size={18}
                                    className={
                                        active
                                            ? "text-red-400"
                                            : "text-slate-600 group-hover:text-red-400"
                                    }
                                />

                                {item.name}

                            </Link>
                        );
                    })}

                </div>

            </nav>

            {/* Logout */}
            <div className="p-4 border-t border-white/[0.06]">

                <button
                    onClick={handleLogout}
                    className="
                        flex
                        items-center
                        gap-3
                        w-full
                        px-3
                        py-3
                        rounded-xl
                        text-sm
                        text-slate-500
                        hover:text-red-400
                        hover:bg-red-500/[0.05]
                        transition-all
                    "
                >
                    <LogOut size={18} />
                    Logout
                </button>

            </div>

        </aside>
    );
}