
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../api/axios";

import {
    ArrowRight,
} from "lucide-react";

import Footer from "../components/layout/Footer";

export default function Login() {
    const navigate = useNavigate();

    const [formData, setFormData] = useState({
        email: "",
        password: "",
    });

    const [loading, setLoading] = useState(false);

    const [message, setMessage] = useState({
        type: "",
        text: "",
    });

    function handleChange(e) {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    }

    async function handleSubmit(e) {
        e.preventDefault();

        setLoading(true);

        setMessage({
            type: "",
            text: "",
        });

        try {
            const response = await api.post(
                "/auth/login",
                formData
            );

            localStorage.setItem(
                "token",
                response.data.access_token
            );

            setMessage({
                type: "success",
                text: "Welcome back! Redirecting...",
            });

            setTimeout(() => {
                navigate("/dashboard");
            }, 1200);

        } catch (error) {
            setMessage({
                type: "error",
                text:
                    error.response?.data?.detail ||
                    "Invalid email or password",
            });

        } finally {
            setLoading(false);
        }
    }

    return (
        <div className="min-h-screen bg-[#070709] text-white flex flex-col">

            {/* =====================================================
                LOGIN PAGE
            ===================================================== */}

            <main
                className="
                    relative
                    flex-1
                    w-full
                    min-h-screen
                    bg-cover
                    bg-left
                    sm:bg-center
                    bg-no-repeat
                    flex
                    items-center
                    justify-end
                    overflow-hidden
                    font-sans
                "
                style={{
                    backgroundImage:
                        "url('/images/login.png')",
                }}
            >

                {/* =================================================
                    LOGIN NAVBAR
                    Only CodePilot + Register
                    Directly over background image
                ================================================= */}

                <header className="absolute top-0 left-0 right-0 z-50">

                    <div className="
                        max-w-[1500px]
                        mx-auto
                        px-10
                        py-6
                        flex
                        items-center
                        justify-between
                    ">

                        {/* =================================================
                            LEFT — CODEPILOT LOGO
                        ================================================= */}

                        <Link
                            to="/"
                            className="flex items-center gap-3.5 group"
                        >

                            {/* Rocket */}

                            <div className="
                                relative
                                w-12
                                h-12
                                flex
                                items-center
                                justify-center
                            ">

                                {/* Rocket Glow */}

                                <div className="
                                    absolute
                                    inset-0
                                    bg-gradient-to-t
                                    from-[#ff2a2a]
                                    via-[#ff5c38]
                                    to-transparent
                                    rounded-full
                                    blur-xl
                                    opacity-60
                                    group-hover:opacity-100
                                    group-hover:scale-125
                                    transition-all
                                    duration-500
                                " />

                                {/* Rocket SVG */}

                                <svg
                                    className="
                                        w-12
                                        h-12
                                        relative
                                        z-10
                                        transition-transform
                                        duration-500
                                        group-hover:scale-110
                                        group-hover:-translate-y-1
                                        drop-shadow-[0_4px_20px_rgba(255,42,42,0.6)]
                                    "
                                    viewBox="0 0 36 36"
                                    fill="none"
                                    xmlns="http://www.w3.org/2000/svg"
                                >

                                    <defs>

                                        <linearGradient
                                            id="rocket-body-login"
                                            x1="0%"
                                            y1="0%"
                                            x2="100%"
                                            y2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#ffffff"
                                            />

                                            <stop
                                                offset="50%"
                                                stopColor="#e2e8f0"
                                            />

                                            <stop
                                                offset="100%"
                                                stopColor="#94a3b8"
                                            />
                                        </linearGradient>

                                        <linearGradient
                                            id="rocket-flame-login"
                                            x1="0%"
                                            y1="0%"
                                            x2="0%"
                                            y2="100%"
                                        >
                                            <stop
                                                offset="0%"
                                                stopColor="#ff6666"
                                            />

                                            <stop
                                                offset="40%"
                                                stopColor="#ff2a2a"
                                            />

                                            <stop
                                                offset="100%"
                                                stopColor="#800000"
                                            />
                                        </linearGradient>

                                    </defs>

                                    {/* Left bracket */}

                                    <path
                                        d="M9 22L4 26L9 28"
                                        stroke="url(#rocket-body-login)"
                                        strokeWidth="2.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {/* Right bracket */}

                                    <path
                                        d="M27 22L32 26L27 28"
                                        stroke="url(#rocket-body-login)"
                                        strokeWidth="2.8"
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                    />

                                    {/* Rocket body */}

                                    <path
                                        d="M18 3L25 15L21 25H15L11 15L18 3Z"
                                        fill="url(#rocket-body-login)"
                                    />

                                    {/* Glass reflection */}

                                    <path
                                        d="M18 5L22 14H19L17 5H18Z"
                                        fill="white"
                                        className="opacity-60"
                                    />

                                    {/* Main flame */}

                                    <path
                                        d="M18 22V33"
                                        stroke="url(#rocket-flame-login)"
                                        strokeWidth="4"
                                        strokeLinecap="round"
                                        className="drop-shadow-[0_0_12px_#ff2a2a]"
                                    />

                                    {/* Side flames */}

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
                                    />

                                </svg>

                            </div>


                            {/* Brand */}

                            <div className="leading-none">

                                <div className="
                                    text-xl
                                    font-black
                                    tracking-tight
                                    text-white
                                    flex
                                    items-center
                                    gap-0.5
                                ">

                                    <span>
                                        Code
                                    </span>

                                    <span className="
                                        text-transparent
                                        bg-clip-text
                                        bg-gradient-to-r
                                        from-[#ff6b66]
                                        via-[#ef3b39]
                                        to-[#ff8f8b]
                                        drop-shadow-[0_2px_10px_rgba(239,59,57,0.3)]
                                    ">
                                        Pilot
                                    </span>

                                </div>

                                <div className="
                                    mt-1
                                    flex
                                    items-center
                                    gap-1.5
                                ">

                                    <span className="
                                        h-[2px]
                                        w-2
                                        bg-[#ff514b]
                                        rounded-full
                                    " />

                                    <span className="
                                        text-[9px]
                                        font-mono
                                        tracking-[0.25em]
                                        text-[#ff514b]
                                        font-bold
                                        uppercase
                                    ">
                                        AI Review
                                    </span>

                                </div>

                            </div>

                        </Link>


                        {/* =================================================
                            MIDDLE

                            EMPTY ON PURPOSE.
                            No Dashboard
                            No Code Review
                            No History
                            No Profile
                            No Login
                        ================================================= */}


                        {/* =================================================
                            RIGHT — REGISTER ONLY
                        ================================================= */}

                        <Link
                            to="/register"
                            className="
                                group
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

                            Register

                            <ArrowRight
                                size={15}
                                className="
                                    transition-transform
                                    duration-200
                                    group-hover:translate-x-1
                                "
                            />

                        </Link>

                    </div>

                </header>


                {/* =================================================
                    BACKGROUND OVERLAY
                ================================================= */}

                <div
                    className="
                        absolute
                        inset-0
                        bg-gradient-to-r
                        from-transparent
                        via-black/10
                        to-black/70
                        pointer-events-none
                    "
                />


                {/* =================================================
                    BOTTOM FADE
                ================================================= */}

                <div
                    className="
                        absolute
                        inset-x-0
                        bottom-0
                        h-32
                        bg-gradient-to-t
                        from-[#070709]
                        to-transparent
                        pointer-events-none
                    "
                />


                {/* =================================================
                    AMBIENT GLOW
                ================================================= */}

                <div
                    className="
                        pointer-events-none
                        absolute
                        right-[12%]
                        top-1/2
                        h-[420px]
                        w-[420px]
                        -translate-y-1/2
                        rounded-full
                        bg-red-600/[0.06]
                        blur-[140px]
                    "
                />


                {/* =================================================
                    LOGIN CARD
                ================================================= */}

                <div
                    className="
                        relative
                        z-10
                        w-full
                        max-w-md
                        mr-4
                        md:mr-10
                        lg:mr-32
                        xl:mr-48
                        my-10
                        p-8
                        rounded-2xl
                        border
                        border-white/[0.10]
                        bg-black/45
                        backdrop-blur-xl
                        shadow-[0_25px_80px_rgba(0,0,0,0.55)]
                        transition-all
                        duration-300
                        hover:border-red-500/30
                        hover:shadow-[0_25px_90px_rgba(239,68,68,0.10)]
                    "
                >

                    {/* Top accent */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-8
                            right-8
                            top-0
                            h-px
                            bg-gradient-to-r
                            from-transparent
                            via-red-500/70
                            to-transparent
                        "
                    />

                    {/* Corner accents */}

                    <div
                        className="
                            pointer-events-none
                            absolute
                            left-0
                            top-0
                            h-4
                            w-4
                            border-l
                            border-t
                            border-red-400/40
                            rounded-tl-2xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            right-0
                            top-0
                            h-4
                            w-4
                            border-r
                            border-t
                            border-red-400/20
                            rounded-tr-2xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            bottom-0
                            left-0
                            h-4
                            w-4
                            border-b
                            border-l
                            border-red-400/20
                            rounded-bl-2xl
                        "
                    />

                    <div
                        className="
                            pointer-events-none
                            absolute
                            bottom-0
                            right-0
                            h-4
                            w-4
                            border-b
                            border-r
                            border-red-400/40
                            rounded-br-2xl
                        "
                    />


                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <div className="relative mb-8">

                        <div
                            className="
                                inline-flex
                                items-center
                                gap-2
                                rounded-full
                                border
                                border-red-500/20
                                bg-red-500/[0.07]
                                px-3
                                py-1.5
                                text-[10px]
                                font-mono
                                font-semibold
                                tracking-[0.12em]
                                text-red-300
                            "
                        >

                            <span
                                className="
                                    h-1.5
                                    w-1.5
                                    rounded-full
                                    bg-red-400
                                    shadow-[0_0_8px_rgba(248,113,113,0.8)]
                                    animate-pulse
                                "
                            />

                            AI POWERED AUTHENTICATION

                        </div>


                        <h1
                            className="
                                mt-5
                                text-3xl
                                font-black
                                tracking-tight
                                text-white
                            "
                        >
                            Welcome Back
                        </h1>


                        <p
                            className="
                                mt-2
                                text-sm
                                leading-6
                                text-zinc-300
                            "
                        >
                            Access your AI code analysis dashboard
                        </p>

                    </div>


                    {/* =================================================
                        FORM
                    ================================================= */}

                    <form
                        onSubmit={handleSubmit}
                        className="space-y-5"
                    >

                        {/* Email */}

                        <div>

                            <label
                                className="
                                    mb-2
                                    block
                                    text-[11px]
                                    font-semibold
                                    uppercase
                                    tracking-[0.14em]
                                    text-zinc-200
                                "
                            >
                                Email Address
                            </label>

                            <input
                                type="email"
                                name="email"
                                required
                                autoComplete="email"
                                placeholder="developer@company.com"
                                value={formData.email}
                                onChange={handleChange}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/[0.10]
                                    bg-black/50
                                    px-4
                                    py-3.5
                                    text-sm
                                    text-white
                                    placeholder-zinc-500
                                    outline-none
                                    transition-all
                                    duration-200
                                    focus:border-red-500/60
                                    focus:bg-black/70
                                    focus:ring-2
                                    focus:ring-red-500/10
                                "
                            />

                        </div>


                        {/* Password */}

                        <div>

                            <div className="
                                mb-2
                                flex
                                items-center
                                justify-between
                            ">

                                <label
                                    className="
                                        block
                                        text-[11px]
                                        font-semibold
                                        uppercase
                                        tracking-[0.14em]
                                        text-zinc-200
                                    "
                                >
                                    Password
                                </label>

                                <span
                                    className="
                                        text-[10px]
                                        font-mono
                                        uppercase
                                        tracking-wider
                                        text-zinc-500
                                    "
                                >
                                    Secure Login
                                </span>

                            </div>


                            <input
                                type="password"
                                name="password"
                                required
                                autoComplete="current-password"
                                placeholder="••••••••"
                                value={formData.password}
                                onChange={handleChange}
                                className="
                                    w-full
                                    rounded-xl
                                    border
                                    border-white/[0.10]
                                    bg-black/50
                                    px-4
                                    py-3.5
                                    text-sm
                                    text-white
                                    placeholder-zinc-500
                                    outline-none
                                    transition-all
                                    duration-200
                                    focus:border-red-500/60
                                    focus:bg-black/70
                                    focus:ring-2
                                    focus:ring-red-500/10
                                "
                            />

                        </div>


                        {/* Message */}

                        {message.text && (
                            <div
                                className={`
                                    flex
                                    items-center
                                    gap-2
                                    rounded-xl
                                    border
                                    px-3.5
                                    py-3
                                    text-xs
                                    font-mono
                                    ${message.type === "success"
                                        ? "border-emerald-400/30 bg-emerald-500/[0.08] text-emerald-300"
                                        : "border-red-400/30 bg-red-500/[0.08] text-red-300"
                                    }
                                `}
                            >

                                <span
                                    className="
                                        h-1.5
                                        w-1.5
                                        shrink-0
                                        rounded-full
                                        bg-current
                                    "
                                />

                                {message.text}

                            </div>
                        )}


                        {/* Submit */}

                        <button
                            type="submit"
                            disabled={loading}
                            className="
                                group
                                relative
                                w-full
                                overflow-hidden
                                rounded-xl
                                border
                                border-red-400/30
                                bg-gradient-to-r
                                from-red-600
                                via-red-500
                                to-rose-500
                                px-6
                                py-3.5
                                text-sm
                                font-bold
                                text-white
                                shadow-[0_10px_30px_rgba(239,68,68,0.18)]
                                transition-all
                                duration-300
                                hover:border-red-300/50
                                hover:shadow-[0_12px_40px_rgba(239,68,68,0.28)]
                                active:scale-[0.98]
                                disabled:cursor-not-allowed
                                disabled:opacity-50
                            "
                        >

                            {/* Button shine */}

                            <div
                                className="
                                    pointer-events-none
                                    absolute
                                    inset-y-0
                                    -left-20
                                    w-16
                                    rotate-12
                                    bg-white/20
                                    blur-md
                                    transition-all
                                    duration-700
                                    group-hover:left-[110%]
                                "
                            />

                            <div className="
                                relative
                                flex
                                items-center
                                justify-center
                                gap-2
                            ">

                                {loading ? (
                                    <>
                                        <svg
                                            className="h-4 w-4 animate-spin"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                        >
                                            <circle
                                                className="opacity-25"
                                                cx="12"
                                                cy="12"
                                                r="10"
                                                stroke="currentColor"
                                                strokeWidth="4"
                                            />

                                            <path
                                                className="opacity-90"
                                                fill="currentColor"
                                                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
                                            />
                                        </svg>

                                        <span>
                                            Authenticating...
                                        </span>
                                    </>
                                ) : (
                                    <>
                                        <span>
                                            Sign In
                                        </span>

                                        <ArrowRight
                                            className="
                                                h-4
                                                w-4
                                                transition-transform
                                                duration-300
                                                group-hover:translate-x-1
                                            "
                                        />
                                    </>
                                )}

                            </div>

                        </button>

                    </form>


                    {/* =================================================
                        REGISTER
                    ================================================= */}

                    <div
                        className="
                            mt-7
                            border-t
                            border-white/[0.07]
                            pt-6
                        "
                    >

                        <p
                            className="
                                text-center
                                text-xs
                                text-zinc-400
                            "
                        >
                            Don't have an account?{" "}

                            <Link
                                to="/register"
                                className="
                                    font-semibold
                                    text-red-300
                                    transition-colors
                                    hover:text-red-200
                                "
                            >
                                Create Account
                            </Link>

                        </p>

                    </div>

                </div>

            </main>


            {/* Footer */}

            <Footer />

        </div>
    );
}
