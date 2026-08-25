import { Link } from "react-router-dom";
import { ArrowUpRight, Sparkles } from "lucide-react";

export default function Footer() {
    return (
        <footer className="relative overflow-hidden border-t border-red-500/15 bg-black">

            {/* Ambient glow */}
            <div className="pointer-events-none absolute bottom-0 left-1/2 h-[220px] w-[700px] -translate-x-1/2 rounded-full bg-red-600/[0.08] blur-[120px]" />

            {/* Top red light */}
            <div className="pointer-events-none absolute left-0 right-0 top-0 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.6)]" />

            <div className="relative z-10 mx-auto max-w-7xl px-6 py-10 sm:px-8 lg:px-10">

                {/* Top Row */}
                <div className="flex flex-col gap-8 md:flex-row md:items-center md:justify-between">

                    {/* Brand with Rocket Logo */}
                    <Link
                        to="/"
                        className="group flex w-fit items-center gap-3.5"
                    >
                        {/* LARGE CODE ROCKET LOGO (NO CONTAINER) */}
                        <div className="relative w-10 h-10 flex items-center justify-center">
                            {/* Ambient Rocket Flame Glow */}
                            <div className="absolute inset-0 bg-gradient-to-t from-[#ff2a2a] via-[#ff5c38] to-transparent rounded-full blur-lg opacity-60 group-hover:opacity-100 group-hover:scale-125 transition-all duration-500" />

                            {/* MAIN ROCKET SVG */}
                            <svg
                                className="w-10 h-10 relative z-10 transition-transform duration-500 group-hover:scale-110 group-hover:-translate-y-0.5 drop-shadow-[0_4px_20px_rgba(255,42,42,0.6)]"
                                viewBox="0 0 36 36"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <defs>
                                    {/* Metallic Body Gradient */}
                                    <linearGradient id="rocket-body-footer" x1="0%" y1="0%" x2="100%" y2="100%">
                                        <stop offset="0%" stopColor="#ffffff" />
                                        <stop offset="50%" stopColor="#e2e8f0" />
                                        <stop offset="100%" stopColor="#94a3b8" />
                                    </linearGradient>

                                    {/* AI Flame Gradient */}
                                    <linearGradient id="rocket-flame-footer" x1="0%" y1="0%" x2="0%" y2="100%">
                                        <stop offset="0%" stopColor="#ff6666" />
                                        <stop offset="40%" stopColor="#ff2a2a" />
                                        <stop offset="100%" stopColor="#800000" />
                                    </linearGradient>
                                </defs>

                                {/* Left Bracket Fin '<' */}
                                <path
                                    d="M9 22L4 26L9 28"
                                    stroke="url(#rocket-body-footer)"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {/* Right Bracket Fin '>' */}
                                <path
                                    d="M27 22L32 26L27 28"
                                    stroke="url(#rocket-body-footer)"
                                    strokeWidth="2.8"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                />

                                {/* Rocket Fuselage */}
                                <path
                                    d="M18 3L25 15L21 25H15L11 15L18 3Z"
                                    fill="url(#rocket-body-footer)"
                                />

                                {/* Glass Reflection / Sheen Line */}
                                <path
                                    d="M18 5L22 14H19L17 5H18Z"
                                    fill="white"
                                    className="opacity-60"
                                />

                                {/* Main Flame Thrust Beam */}
                                <path
                                    d="M18 22V33"
                                    stroke="url(#rocket-flame-footer)"
                                    strokeWidth="4"
                                    strokeLinecap="round"
                                    className="drop-shadow-[0_0_12px_#ff2a2a]"
                                />

                                {/* Side Thrust Sparks */}
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

                                {/* Cockpit Window / Core Node */}
                                <circle cx="18" cy="12" r="2.2" fill="#09090c" />
                                <circle cx="18" cy="12" r="1" fill="#ff4d4d" />
                            </svg>
                        </div>

                        {/* BRAND TYPOGRAPHY */}
                        <div className="leading-none flex items-center gap-2">
                            <div>
                                <div className="text-xl font-black tracking-tight text-white flex items-center gap-0.5">
                                    <span className="tracking-tight">Code</span>
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ff6b66] via-[#ef3b39] to-[#ff8f8b] drop-shadow-[0_2px_10px_rgba(239,59,57,0.3)]">
                                        Pilot
                                    </span>
                                </div>

                                <div className="mt-1 flex items-center gap-1.5">
                                    <span className="h-[2px] w-2 bg-[#ff514b] rounded-full" />
                                    <span className="text-[9px] font-mono tracking-[0.25em] text-[#ff514b] font-bold uppercase">
                                        AI Review
                                    </span>
                                </div>
                            </div>
                        </div>
                    </Link>

                    {/* Navigation */}
                    <div className="flex flex-wrap items-center gap-x-7 gap-y-3 font-mono text-xs text-zinc-200">
                        <Link
                            to="/dashboard"
                            className="transition-colors hover:text-red-400"
                        >
                            Dashboard
                        </Link>

                        <Link
                            to="/review"
                            className="transition-colors hover:text-red-400"
                        >
                            Code Review
                        </Link>

                        <Link
                            to="/history"
                            className="transition-colors hover:text-red-400"
                        >
                            History
                        </Link>

                        <Link
                            to="/profile"
                            className="transition-colors hover:text-red-400"
                        >
                            Profile
                        </Link>
                    </div>
                </div>

                {/* Divider */}
                <div className="my-7 h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

                {/* Bottom Row */}
                <div className="flex flex-col gap-5 md:flex-row md:items-center md:justify-between">

                    {/* Copyright */}
                    <div className="flex items-center gap-3">
                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />
                        <p className="font-mono text-[10px] tracking-[0.12em] text-zinc-300">
                            © 2026 CODEPILOT AI. ALL RIGHTS RESERVED.
                        </p>
                    </div>



                    {/* Built By */}
                    <div className="flex flex-wrap items-center gap-2.5">
                        <Sparkles
                            size={14}
                            className="text-red-400 drop-shadow-[0_0_8px_rgba(248,113,113,0.8)]"
                        />

                        <span className="font-mono text-[10px] tracking-[0.12em] text-zinc-300">
                            BUILT BY
                        </span>


                        <span
                            className="
            group
            relative
            overflow-hidden
            rounded-lg
            border border-red-400/50
            bg-gradient-to-br from-red-500/20 via-red-600/10 to-transparent
            px-3
            py-1.5
            text-[10px]
            font-black
            tracking-[0.08em]
            text-red-200
            shadow-[0_0_18px_rgba(239,68,68,0.22)]
            transition-all
            duration-300
            hover:-translate-y-0.5
            hover:border-red-300/80
            hover:text-white
            hover:shadow-[0_0_28px_rgba(239,68,68,0.45)]
        "
                        >
                            <span className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-700 group-hover:translate-x-full" />
                            <span className="relative">
                                VITTHAL DESAI
                            </span>
                        </span>
                    </div>





                    {/* Start Reviewing */}
                    <Link
                        to="/review"
                        className="group flex w-fit items-center gap-1.5 font-mono text-[10px] tracking-[0.12em] text-zinc-200 transition-colors hover:text-red-400"
                    >
                        Start Reviewing
                        <ArrowUpRight
                            size={13}
                            className="transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        />
                    </Link>

                </div>

            </div>

            {/* Bottom red light */}
            <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

        </footer>
    );
}