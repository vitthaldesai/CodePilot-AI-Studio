
"use client";

import { useRef, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import {
    ArrowRight,
    LogIn,
    LogOut,
    Menu,
    X,
} from "lucide-react";

import HeroContent from "./HeroContent";
import HeroVisual from "./HeroVisual";

const ROBOT_IMAGE = "/images/Character.jpg";

export default function Hero() {
    const spotlightRef = useRef(null);
    const navigate = useNavigate();
    const location = useLocation();

    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

    const isLoggedIn =
        !!localStorage.getItem("token") ||
        !!localStorage.getItem("access_token");

    const handleMouseMove = (e) => {
        const rect = e.currentTarget.getBoundingClientRect();
        const x = ((e.clientX - rect.left) / rect.width) * 100;
        const y = ((e.clientY - rect.top) / rect.height) * 100;

        if (spotlightRef.current) {
            spotlightRef.current.style.setProperty("--x", `${x}%`);
            spotlightRef.current.style.setProperty("--y", `${y}%`);
        }
    };

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("access_token");
        setMobileMenuOpen(false);
        navigate("/login");
    };

    const closeMobileMenu = () => {
        setMobileMenuOpen(false);
    };

    return (
        <section
            onMouseMove={handleMouseMove}
            className="relative min-h-screen overflow-hidden bg-[#0a0304]"
        >

            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            <div className="absolute inset-0 overflow-hidden">

                {/* Robot photo */}
                <div
                    className="absolute inset-0 bg-cover"
                    style={{
                        backgroundImage: `url("${ROBOT_IMAGE}")`,
                        backgroundPosition: "82% 38%",
                    }}
                />

                {/* Scrim */}
                <div
                    className="absolute inset-0"
                    style={{
                        background:
                            "linear-gradient(100deg, #0a0304 0%, rgba(20,5,6,0.94) 26%, rgba(42,8,9,0.72) 42%, rgba(60,10,10,0.32) 58%, rgba(80,12,12,0.05) 74%), linear-gradient(to bottom, rgba(0,0,0,0.4), transparent 20%, transparent 75%, rgba(0,0,0,0.55))",
                    }}
                />

                {/* Mouse-reactive spotlight */}
                <div
                    ref={spotlightRef}
                    style={{
                        "--x": "50%",
                        "--y": "40%",
                        background:
                            "radial-gradient(560px circle at var(--x) var(--y), rgba(255,106,82,0.14), transparent 70%)",
                        mixBlendMode: "screen",
                    }}
                    className="absolute inset-0 transition-[background] duration-300 ease-out"
                />

                {/* Fine grid */}
                <div
                    className="absolute inset-0 opacity-[0.05]"
                    style={{
                        backgroundImage:
                            "linear-gradient(to right, #ffffff14 1px, transparent 1px), linear-gradient(to bottom, #ffffff14 1px, transparent 1px)",
                        backgroundSize: "48px 48px",
                        maskImage:
                            "linear-gradient(105deg, black 0%, black 35%, transparent 60%)",
                        WebkitMaskImage:
                            "linear-gradient(105deg, black 0%, black 35%, transparent 60%)",
                    }}
                />

                {/* Grain */}
                <div
                    className="pointer-events-none absolute inset-0 opacity-[0.035] mix-blend-overlay"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='120' height='120'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.9' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E\")",
                    }}
                />
            </div>


            {/* =====================================================
                HOME NAVBAR
                LOCAL TO HERO — NO GLOBAL NAVBAR
            ====================================================== */}

            <nav className="absolute left-0 right-0 top-0 z-30">

                <div
                    className="
                        mx-auto flex h-[96px] max-w-[1500px]
                        items-center justify-between
                        px-4
                        sm:px-10
                        lg:px-14
                    "
                >

                    {/* =================================================
                        LOGO
                    ================================================== */}

                    <Link
                        to="/"
                        className="flex items-center gap-2.5 sm:gap-3.5 group"
                        onClick={closeMobileMenu}
                    >

                        {/* ROCKET LOGO */}
                        <div className="relative w-10 h-10 sm:w-12 sm:h-12 flex items-center justify-center">

                            <div className="absolute inset-0 bg-gradient-to-t from-[#ff2a2a] via-[#ff5c38] to-transparent rounded-full blur-xl opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />

                            <svg
                                className="w-10 h-10 sm:w-12 sm:h-12 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-1 drop-shadow-[0_4px_20px_rgba(255,42,42,0.6)]"
                                viewBox="0 0 36 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    <linearGradient
                                        id="rocket-body-hero"
                                        x1="0%"
                                        y1="0%"
                                        x2="100%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#ffffff" />
                                        <stop offset="50%" stopColor="#e2e8f0" />
                                        <stop offset="100%" stopColor="#94a3b8" />
                                    </linearGradient>

                                    <linearGradient
                                        id="rocket-flame-hero"
                                        x1="0%"
                                        y1="0%"
                                        x2="0%"
                                        y2="100%"
                                    >
                                        <stop offset="0%" stopColor="#ff6666" />
                                        <stop offset="40%" stopColor="#ff2a2a" />
                                        <stop offset="100%" stopColor="#800000" />
                                    </linearGradient>
                                </defs>

                                <path
                                    d="M9 22L4 26L9 28"
                                    stroke="url(#rocket-body-hero)"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <path
                                    d="M27 22L32 26L27 28"
                                    stroke="url(#rocket-body-hero)"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                <path
                                    d="M18 3L25 15L21 25H15L11 15L18 3Z"
                                    fill="url(#rocket-body-hero)"
                                />

                                <path
                                    d="M18 5L22 14H19L17 5H18Z"
                                    fill="white"
                                    className="opacity-60"
                                />

                                <path
                                    d="M18 22V33"
                                    stroke="url(#rocket-flame-hero)"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_12px_#ff2a2a]"
                                />

                                <path
                                    d="M15 25L13 30"
                                    stroke="#ff4d4d"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />

                                <path
                                    d="M21 25L23 30"
                                    stroke="#ff4d4d"
                                    strokeWidth="2"
                                    strokeLinecap="round"
                                />

                                <circle cx="18" cy="12" r="2.2" fill="#09090c" />
                                <circle cx="18" cy="12" r="1" fill="#ff4d4d" />
                            </svg>
                        </div>

                        {/* Brand */}
                        <div className="leading-none flex items-center gap-2">
                            <div>
                                <div className="text-lg sm:text-xl font-black tracking-tight text-white flex items-center gap-0.5">
                                    <span>Code</span>

                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b66] via-[#ef3b39] to-[#ff8f8b] drop-shadow-[0_2px_10px_rgba(239,59,57,0.3)]">
                                        Pilot
                                    </span>
                                </div>

                                <div className="mt-1 flex items-center gap-1.5">
                                    <span className="h-[2px] w-2 bg-[#ff514b] rounded-full" />

                                    <span className="text-[8px] sm:text-[9px] font-mono tracking-[0.18em] sm:tracking-[0.25em] text-[#ff514b] font-bold uppercase">
                                        AI Review
                                    </span>
                                </div>
                            </div>

                            <svg
                                className="hidden sm:block w-3.5 h-3.5 text-red-400 animate-pulse -mt-3"
                                viewBox="0 0 24 24"
                                fill="currentColor"
                            >
                                <path d="M12 0L14.593 9.407L24 12L14.593 14.593L12 24L9.407 14.593L0 12L9.407 9.407L12 0Z" />
                            </svg>
                        </div>
                    </Link>


                    {/* =================================================
                        DESKTOP NAVIGATION
                    ================================================== */}

                    <div className="hidden items-center gap-10 md:flex">

                        <Link
                            to="/dashboard"
                            className="relative py-2 text-sm font-medium text-zinc-300 transition-colors duration-300 hover:text-white"
                        >
                            Dashboard

                            {location.pathname === "/dashboard" && (
                                <span className="pointer-events-none absolute left-0 right-0 -bottom-[13px] h-[2px] overflow-hidden">
                                    <span className="absolute inset-0 bg-red-500/20" />

                                    <span className="absolute top-0 bottom-0 left-[-45%] w-[45%] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_rgba(239,68,68,0.95)] animate-[navScan_2.4s_ease-in-out_infinite]" />
                                </span>
                            )}
                        </Link>

                        <Link
                            to="/review"
                            className="relative py-2 text-sm font-medium text-zinc-300 transition-colors duration-300 hover:text-white"
                        >
                            Code Review

                            {location.pathname === "/review" && (
                                <span className="pointer-events-none absolute left-0 right-0 -bottom-[13px] h-[2px] overflow-hidden">
                                    <span className="absolute inset-0 bg-red-500/20" />

                                    <span className="absolute top-0 bottom-0 left-[-45%] w-[45%] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_rgba(239,68,68,0.95)] animate-[navScan_2.4s_ease-in-out_infinite]" />
                                </span>
                            )}
                        </Link>

                        <Link
                            to="/history"
                            className="relative py-2 text-sm font-medium text-zinc-300 transition-colors duration-300 hover:text-white"
                        >
                            History

                            {location.pathname === "/history" && (
                                <span className="pointer-events-none absolute left-0 right-0 -bottom-[13px] h-[2px] overflow-hidden">
                                    <span className="absolute inset-0 bg-red-500/20" />

                                    <span className="absolute top-0 bottom-0 left-[-45%] w-[45%] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_rgba(239,68,68,0.95)] animate-[navScan_2.4s_ease-in-out_infinite]" />
                                </span>
                            )}
                        </Link>

                        <Link
                            to="/profile"
                            className="relative py-2 text-sm font-medium text-zinc-300 transition-colors duration-300 hover:text-white"
                        >
                            Profile

                            {location.pathname === "/profile" && (
                                <span className="pointer-events-none absolute left-0 right-0 -bottom-[13px] h-[2px] overflow-hidden">
                                    <span className="absolute inset-0 bg-red-500/20" />

                                    <span className="absolute top-0 bottom-0 left-[-45%] w-[45%] bg-gradient-to-r from-transparent via-white to-transparent shadow-[0_0_12px_rgba(239,68,68,0.95)] animate-[navScan_2.4s_ease-in-out_infinite]" />
                                </span>
                            )}
                        </Link>

                    </div>


                    {/* =================================================
                        DESKTOP AUTH
                    ================================================== */}

                    {isLoggedIn ? (
                        <button
                            onClick={handleLogout}
                            className="
                                hidden
                                md:flex
                                items-center
                                gap-2
                                rounded-full
                                border border-white/20
                                bg-white/[0.04]
                                px-6
                                py-3
                                text-sm
                                font-medium
                                text-zinc-200
                                backdrop-blur-md
                                transition-all
                                duration-300
                                hover:border-red-500/40
                                hover:bg-red-500/[0.08]
                                hover:text-white
                                hover:shadow-[0_0_25px_rgba(239,68,68,0.12)]
                            "
                        >
                            <LogOut size={16} />
                            Log out
                        </button>
                    ) : (
                        <Link
                            to="/login"
                            className="
                                hidden
                                md:flex
                                items-center
                                gap-2
                                rounded-full
                                border border-white/20
                                bg-white/[0.04]
                                px-6
                                py-3
                                text-sm
                                font-medium
                                text-zinc-200
                                backdrop-blur-md
                                transition-all
                                duration-300
                                hover:border-red-500/40
                                hover:bg-red-500/[0.08]
                                hover:text-white
                                hover:shadow-[0_0_25px_rgba(239,68,68,0.12)]
                            "
                        >
                            <LogIn size={16} />
                            Log in
                        </Link>
                    )}


                    {/* =================================================
                        MOBILE MENU BUTTON
                    ================================================== */}

                    <button
                        type="button"
                        onClick={() => setMobileMenuOpen((prev) => !prev)}
                        className="
                            md:hidden
                            flex items-center justify-center
                            w-10 h-10
                            rounded-full
                            border border-white/15
                            bg-white/5
                            text-white
                            hover:bg-white/10
                            hover:border-red-500/40
                            transition-all duration-200
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


                {/* =================================================
                    MOBILE DROPDOWN
                ================================================== */}

                <div
                    className={`
                        md:hidden
                        mx-4 sm:mx-6
                        mt-1
                        rounded-2xl
                        border border-white/10
                        bg-[#0d0d11]
                        backdrop-blur-xl
                        shadow-[0_20px_60px_-20px_rgba(0,0,0,0.9)]
                        overflow-hidden
                        transition-all duration-300
                        ${mobileMenuOpen
                            ? "block opacity-100"
                            : "hidden opacity-0"
                        }
                    `}
                >
                    <nav className="p-3">

                        {[
                            { label: "Dashboard", path: "/dashboard" },
                            { label: "Code Review", path: "/review" },
                            { label: "History", path: "/history" },
                            { label: "Profile", path: "/profile" },
                        ].map((item) => (
                            <Link
                                key={item.path}
                                to={item.path}
                                onClick={closeMobileMenu}
                                className="
                                    flex items-center justify-between
                                    rounded-xl
                                    px-4 py-3.5
                                    text-sm font-medium
                                    text-white/80
                                    hover:text-white
                                    hover:bg-white/5
                                    transition-all duration-200
                                "
                            >
                                {item.label}
                            </Link>
                        ))}

                    </nav>

                    <div className="border-t border-white/10 p-3">

                        {isLoggedIn ? (
                            <button
                                onClick={handleLogout}
                                className="
                                    w-full
                                    flex items-center gap-3
                                    rounded-xl
                                    px-4 py-3.5
                                    text-sm font-medium
                                    text-white/80
                                    hover:text-red-400
                                    hover:bg-red-500/10
                                    transition-all duration-200
                                "
                            >
                                <LogOut size={17} />
                                Log out
                            </button>
                        ) : (
                            <Link
                                to="/login"
                                onClick={closeMobileMenu}
                                className="
                                    w-full
                                    flex items-center justify-center gap-2
                                    rounded-xl
                                    border border-white/10
                                    bg-white/5
                                    px-4 py-3
                                    text-sm font-semibold
                                    text-white/85
                                    hover:bg-white/10
                                    transition-all duration-200
                                "
                            >
                                <LogIn size={16} />
                                Log in
                            </Link>
                        )}

                    </div>
                </div>

            </nav>


            {/* =====================================================
                HERO CONTENT
            ====================================================== */}

            <div className="relative z-10 mx-auto flex min-h-screen max-w-[1500px] items-center px-5 sm:px-10 lg:px-14 pt-24 md:pt-0">

                <div
                    className="
                        w-full
                        max-w-xl
                        opacity-0
                        animate-[rise_0.9s_cubic-bezier(0.16,1,0.3,1)_forwards]
                        [animation-delay:.1s]
                    "
                >
                    <HeroContent />
                </div>

            </div>


            {/* =====================================================
                HERO VISUAL
            ====================================================== */}

            <HeroVisual />


            {/* =====================================================
                ANIMATIONS
            ====================================================== */}

            <style>{`
                @keyframes rise {
                    from {
                        opacity: 0;
                        transform: translateY(26px);
                    }

                    to {
                        opacity: 1;
                        transform: translateY(0);
                    }
                }

                @keyframes pulseDot {
                    0% {
                        box-shadow: 0 0 0 0 rgba(255,106,82,.55);
                    }

                    70% {
                        box-shadow: 0 0 0 8px rgba(255,106,82,0);
                    }

                    100% {
                        box-shadow: 0 0 0 0 rgba(255,106,82,0);
                    }
                }

                @keyframes scan {
                    0% {
                        top: 6%;
                        opacity: 0;
                    }

                    10% {
                        opacity: .6;
                    }

                    50% {
                        opacity: .3;
                    }

                    92% {
                        opacity: 0;
                    }

                    100% {
                        top: 96%;
                        opacity: 0;
                    }
                }

                @keyframes floatCard {
                    0%, 100% {
                        transform: translateY(0);
                    }

                    50% {
                        transform: translateY(-9px);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                    }
                }
            `}</style>

            <style>{`
    @keyframes navScan {
        0% {
            left: -45%;
            opacity: 0;
        }

        10% {
            opacity: 1;
        }

        50% {
            opacity: 1;
        }

        90% {
            opacity: 0.8;
        }

        100% {
            left: 100%;
            opacity: 0;
        }
    }
`}</style>

        </section>
    );
}
