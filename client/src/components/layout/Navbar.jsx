import { ArrowRight, LogOut, Menu, X } from "lucide-react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";

export default function Navbar() {
    const navigate = useNavigate();
    const location = useLocation();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isLoggedIn = !!localStorage.getItem("token");

    const handleLogout = () => {
        localStorage.removeItem("token");
        setMobileMenuOpen(false);
        navigate("/login");
    };

    const navItems = [
        { label: "Dashboard", path: "/dashboard" },
        { label: "Code Review", path: "/review" },
        { label: "History", path: "/history" },
        { label: "Profile", path: "/profile" },
    ];

    const handleMobileNavigation = () => {
        setMobileMenuOpen(false);
    };

    return (
        <header className="relative z-50">

            <div className="max-w-[1500px] mx-auto px-4 sm:px-6 lg:px-10 py-4 lg:py-6 flex items-center justify-between">

                {/* =====================================================
                    LOGO SECTION
                ====================================================== */}

                <Link
                    to="/"
                    className="flex items-center gap-2.5 sm:gap-3.5 group"
                    onClick={() => setMobileMenuOpen(false)}
                >

                    {/* ROCKET */}
                    <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">

                        {/* Outer ambient glow */}
                        <div
                            className="
                                absolute
                                inset-0
                                rounded-full
                                bg-gradient-to-t
                                from-[#ff2a2a]
                                via-[#ff5c38]
                                to-transparent
                                blur-xl
                                opacity-50
                                transition-all
                                duration-500
                                group-hover:opacity-100
                                group-hover:scale-125
                            "
                        />

                        {/* Rocket */}
                        <svg
                            className="
                                relative
                                z-10
                                w-10 h-10
                                sm:w-12 sm:h-12
                                transition-all
                                duration-500
                                ease-out
                                group-hover:-translate-y-[3px]
                                group-hover:scale-[1.07]
                                drop-shadow-[0_4px_20px_rgba(255,42,42,0.55)]
                                group-hover:drop-shadow-[0_6px_28px_rgba(255,42,42,0.85)]
                            "
                            viewBox="0 0 36 36"
                            fill="none"
                            xmlns="http://www.w3.org/2000/svg"
                        >
                            <defs>

                                {/* Metallic body */}
                                <linearGradient
                                    id="rocket-body-lg"
                                    x1="0%"
                                    y1="0%"
                                    x2="100%"
                                    y2="100%"
                                >
                                    <stop offset="0%" stopColor="#ffffff" />
                                    <stop offset="50%" stopColor="#e2e8f0" />
                                    <stop offset="100%" stopColor="#94a3b8" />
                                </linearGradient>

                                {/* Flame */}
                                <linearGradient
                                    id="rocket-flame-lg"
                                    x1="0%"
                                    y1="0%"
                                    x2="0%"
                                    y2="100%"
                                >
                                    <stop offset="0%" stopColor="#ff8888" />
                                    <stop offset="40%" stopColor="#ff2a2a" />
                                    <stop offset="100%" stopColor="#800000" />
                                </linearGradient>

                            </defs>

                            {/* Left bracket */}
                            <path
                                d="M9 22L4 26L9 28"
                                stroke="url(#rocket-body-lg)"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Right bracket */}
                            <path
                                d="M27 22L32 26L27 28"
                                stroke="url(#rocket-body-lg)"
                                strokeWidth="2.8"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                            />

                            {/* Rocket body */}
                            <path
                                d="M18 3L25 15L21 25H15L11 15L18 3Z"
                                fill="url(#rocket-body-lg)"
                            />

                            {/* Reflection */}
                            <path
                                d="M18 5L22 14H19L17 5H18Z"
                                fill="white"
                                className="opacity-60"
                            />

                            {/* Main flame */}
                            <path
                                d="M18 22V33"
                                stroke="url(#rocket-flame-lg)"
                                strokeWidth="4"
                                strokeLinecap="round"
                                className="
                                    drop-shadow-[0_0_10px_#ff2a2a]
                                    transition-all
                                    duration-300
                                    group-hover:drop-shadow-[0_0_18px_#ff3b3b]
                                "
                            />

                            {/* Side sparks */}
                            <path
                                d="M15 25L13 30"
                                stroke="#ff4d4d"
                                strokeWidth="2"
                                strokeLinecap="round"
                                className="
                                    transition-all
                                    duration-300
                                    group-hover:translate-y-1
                                    group-hover:opacity-100
                                "
                            />

                            <path
                                d="M21 25L23 30"
                                stroke="#ff4d4d"
                                strokeWidth="2"
                                strokeLinecap="round"
                                className="
                                    transition-all
                                    duration-300
                                    group-hover:translate-y-1
                                    group-hover:opacity-100
                                "
                            />

                            {/* Cockpit */}
                            <circle
                                cx="18"
                                cy="12"
                                r="2.2"
                                fill="#09090c"
                            />

                            <circle
                                cx="18"
                                cy="12"
                                r="1"
                                fill="#ff4d4d"
                                className="transition-all duration-300 group-hover:fill-[#ff8b8b]"
                            />

                        </svg>

                        {/* Tiny hover spark 1 */}
                        <span
                            className="
                                pointer-events-none
                                absolute
                                -left-1
                                bottom-2
                                w-1
                                h-1
                                rounded-full
                                bg-red-400
                                opacity-0
                                blur-[1px]
                                transition-all
                                duration-300
                                group-hover:opacity-100
                                group-hover:-translate-x-1
                                group-hover:translate-y-1
                            "
                        />

                        {/* Tiny hover spark 2 */}
                        <span
                            className="
                                pointer-events-none
                                absolute
                                right-0
                                bottom-1
                                w-1
                                h-1
                                rounded-full
                                bg-red-300
                                opacity-0
                                blur-[1px]
                                transition-all
                                duration-300
                                group-hover:opacity-100
                                group-hover:translate-x-1
                                group-hover:translate-y-1
                            "
                        />

                    </div>


                    {/* =================================================
                        BRAND TYPOGRAPHY
                    ================================================== */}

                    <div className="leading-none flex items-center gap-2">

                        <div>

                            {/* CODEPILOT WORDMARK */}
                            <div
                                className="
                                    flex
                                    items-center
                                    text-lg
                                    sm:text-xl
                                    font-bold
                                    tracking-[0.02em]
                                    text-white
                                "
                                style={{
                                    fontFamily: "Rajdhani, sans-serif",
                                }}
                            >

                                <span>
                                    Code
                                </span>

                                <span
                                    className="
                                        text-transparent
                                        bg-clip-text
                                        bg-gradient-to-r
                                        from-[#ff7772]
                                        via-[#ef3b39]
                                        to-[#ff9b97]
                                        drop-shadow-[0_0_10px_rgba(239,59,57,0.35)]
                                        transition-all
                                        duration-300
                                        group-hover:drop-shadow-[0_0_16px_rgba(239,59,57,0.65)]
                                    "
                                >
                                    Pilot
                                </span>

                            </div>

                            {/* AI REVIEW */}
                            <div className="mt-0.5 flex items-center gap-1.5">

                                <span className="h-[2px] w-2 bg-[#ff514b] rounded-full" />

                                <span
                                    className="
                                        text-[8px]
                                        sm:text-[9px]
                                        font-mono
                                        tracking-[0.2em]
                                        sm:tracking-[0.25em]
                                        text-[#ff514b]
                                        font-bold
                                        uppercase
                                    "
                                >
                                    AI Review
                                </span>

                            </div>

                        </div>

                    </div>

                </Link>


                {/* =====================================================
                    CENTER NAVIGATION
                ====================================================== */}

                <div className="relative hidden lg:block">

                    <nav className="flex items-center gap-10 text-[15px] text-white/90 relative z-10">

                        {navItems.map((item) => {

                            const isActive =
                                location.pathname === item.path;

                            return (
                                <Link
                                    key={item.path}
                                    to={item.path}
                                    className={`
                                        relative
                                        py-1
                                        transition-colors
                                        duration-200
                                        ${isActive
                                            ? "text-white"
                                            : "text-white/90 hover:text-white"
                                        }
                                    `}
                                >

                                    {item.label}


                                    {/* =================================================
                                        PREMIUM ACTIVE SCANNING BEAM
                                    ================================================== */}

                                    {isActive && (
                                        <span
                                            className="
                                                pointer-events-none
                                                absolute
                                                left-0
                                                right-0
                                                -bottom-[5px]
                                                h-[2px]
                                                overflow-hidden
                                                rounded-full
                                            "
                                        >

                                            {/* subtle white base */}
                                            <span
                                                className="
                                                    absolute
                                                    inset-0
                                                    bg-white/20
                                                    rounded-full
                                                "
                                            />

                                            {/* moving beam */}
                                            <span
                                                className="
                                                    absolute
                                                    top-0
                                                    bottom-0
                                                    left-[-55%]
                                                    w-[55%]
                                                    rounded-full
                                                    bg-gradient-to-r
                                                    from-transparent
                                                    via-white
                                                    to-transparent
                                                    shadow-[0_0_8px_rgba(255,255,255,0.9)]
                                                    animate-[navScan_2.2s_ease-in-out_infinite]
                                                "
                                            />

                                        </span>
                                    )}

                                </Link>
                            );
                        })}

                    </nav>

                </div>


                {/* =====================================================
                    RIGHT SIDE
                ====================================================== */}

                <div className="flex items-center gap-2 sm:gap-5">

                    {/* DESKTOP AUTH */}

                    <div className="hidden sm:flex items-center gap-5">

                        {isLoggedIn ? (

                            <button
                                onClick={handleLogout}
                                className="
                                    inline-flex
                                    items-center
                                    gap-2
                                    rounded-full
                                    border
                                    border-white/20
                                    bg-white/10
                                    backdrop-blur-md
                                    px-6
                                    py-2.5
                                    text-[14px]
                                    font-semibold
                                    text-white
                                    hover:bg-red-500/20
                                    hover:border-red-500/50
                                    hover:text-red-400
                                    transition-all
                                    duration-200
                                    cursor-pointer
                                "
                            >
                                <LogOut size={15} />
                                Log out
                            </button>

                        ) : (

                            <>
                                <Link
                                    to="/login"
                                    className="
                                        text-[15px]
                                        text-white
                                        hover:text-red-400
                                        transition-colors
                                        duration-200
                                    "
                                >
                                    Log in
                                </Link>

                                <Link
                                    to="/register"
                                    className="
                                        inline-flex
                                        items-center
                                        gap-2
                                        rounded-full
                                        bg-gradient-to-br
                                        from-[#ef3b39]
                                        to-[#b51b1f]
                                        px-6
                                        py-3
                                        text-[14px]
                                        font-semibold
                                        text-white
                                        shadow-[0_10px_30px_-8px_rgba(239,59,57,0.75)]
                                        hover:shadow-[0_14px_35px_-8px_rgba(239,59,57,0.9)]
                                        hover:-translate-y-0.5
                                        transition-all
                                        duration-200
                                    "
                                >
                                    Get Started
                                    <ArrowRight size={15} />
                                </Link>
                            </>

                        )}

                    </div>


                    {/* MOBILE MENU */}

                    <button
                        type="button"
                        onClick={() =>
                            setMobileMenuOpen((prev) => !prev)
                        }
                        className="
                            lg:hidden
                            flex
                            items-center
                            justify-center
                            w-10
                            h-10
                            rounded-full
                            border
                            border-white/15
                            bg-white/5
                            text-white
                            hover:bg-white/10
                            hover:border-red-500/40
                            transition-all
                            duration-200
                        "
                        aria-label="Toggle navigation menu"
                        aria-expanded={mobileMenuOpen}
                    >
                        {mobileMenuOpen ? (
                            <X size={20} />
                        ) : (
                            <Menu size={20} />
                        )}
                    </button>

                </div>

            </div>


            {/* =========================================================
                MOBILE DROPDOWN
            ========================================================== */}

            <div
                className={`
                    lg:hidden
                    mx-4 sm:mx-6
                    mt-1
                    rounded-2xl
                    border border-white/10
                    bg-[#0d0d11]
                    backdrop-blur-xl
                    shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]
                    overflow-hidden
                    transition-all
                    duration-300
                    ${mobileMenuOpen
                        ? "block opacity-100"
                        : "hidden opacity-0"
                    }
                `}
            >

                <nav className="p-3">

                    {navItems.map((item) => {

                        const isActive =
                            location.pathname === item.path;

                        return (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={handleMobileNavigation}
                                className={`
                                    flex
                                    items-center
                                    justify-between
                                    rounded-xl
                                    px-4
                                    py-3.5
                                    text-sm
                                    font-medium
                                    transition-all
                                    duration-200
                                    ${isActive
                                        ? "bg-red-500/10 text-red-400 border border-red-500/20"
                                        : "text-white/80 hover:text-white hover:bg-white/5"
                                    }
                                `}
                            >

                                <span>{item.label}</span>

                                {isActive && (
                                    <span className="w-1.5 h-1.5 rounded-full bg-red-400 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                                )}

                            </Link>
                        );
                    })}

                </nav>


                <div className="border-t border-white/10 p-3">

                    {isLoggedIn ? (

                        <button
                            onClick={handleLogout}
                            className="
                                w-full
                                flex
                                items-center
                                gap-3
                                rounded-xl
                                px-4
                                py-3.5
                                text-sm
                                font-medium
                                text-white/80
                                hover:text-red-400
                                hover:bg-red-500/10
                                transition-all
                                duration-200
                            "
                        >
                            <LogOut size={17} />
                            Log out
                        </button>

                    ) : (

                        <div className="grid grid-cols-2 gap-2">

                            <Link
                                to="/login"
                                onClick={handleMobileNavigation}
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    rounded-xl
                                    border
                                    border-white/10
                                    bg-white/5
                                    px-4
                                    py-3
                                    text-sm
                                    font-medium
                                    text-white/80
                                    hover:text-white
                                    hover:bg-white/10
                                    transition-all
                                    duration-200
                                "
                            >
                                Log in
                            </Link>

                            <Link
                                to="/register"
                                onClick={handleMobileNavigation}
                                className="
                                    flex
                                    items-center
                                    justify-center
                                    gap-1.5
                                    rounded-xl
                                    bg-gradient-to-br
                                    from-[#ef3b39]
                                    to-[#b51b1f]
                                    px-4
                                    py-3
                                    text-sm
                                    font-semibold
                                    text-white
                                    shadow-[0_8px_20px_-8px_rgba(239,59,57,0.7)]
                                "
                            >
                                Get Started
                                <ArrowRight size={14} />
                            </Link>

                        </div>

                    )}

                </div>

            </div>


            {/* =========================================================
                NAVIGATION ANIMATION
            ========================================================== */}

            <style>{`
                @keyframes navScan {
                    0% {
                        left: -55%;
                        opacity: 0;
                    }

                    12% {
                        opacity: 1;
                    }

                    50% {
                        opacity: 1;
                    }

                    88% {
                        opacity: 0.9;
                    }

                    100% {
                        left: 100%;
                        opacity: 0;
                    }
                }
            `}</style>

        </header>
    );
}