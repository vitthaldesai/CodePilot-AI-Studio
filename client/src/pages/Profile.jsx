import { useState, useEffect } from "react";
import api from "../api/axios";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import {
    UserRound,
    ShieldCheck,
    Mail,
    CalendarDays,
    Code2,
    Activity,
    LogOut,
    ChevronRight,
    Sparkles,
} from "lucide-react";

export default function Profile() {
    const [loggingOut, setLoggingOut] = useState(false);

    // =========================================================
    // USER
    // =========================================================

    const [user, setUser] = useState(null);
    const [loadingUser, setLoadingUser] = useState(true);

    // =========================================================
    // STATS
    // =========================================================

    const [stats, setStats] = useState({
        total_reviews: 0,
        security_issues: 0,
    });

    // =========================================================
    // LOAD PROFILE + STATS
    // =========================================================

    useEffect(() => {
        loadProfile();
    }, []);

    async function loadProfile() {
        try {
            setLoadingUser(true);

            const userResponse = await api.get("/auth/me");

            setUser(userResponse.data);

            const statsResponse = await api.get("/review/stats");

            setStats({
                total_reviews: Number(
                    statsResponse.data?.total_reviews ?? 0
                ),

                security_issues: Number(
                    statsResponse.data?.security_issues ?? 0
                ),
            });

        } catch (error) {
            console.error("Failed to load profile:", error);

            if (
                error.response?.status === 401 ||
                error.response?.status === 403
            ) {
                localStorage.removeItem("token");
                window.location.href = "/login";
            }
        } finally {
            setLoadingUser(false);
        }
    }

    // =========================================================
    // LOGOUT
    // =========================================================

    function handleLogout() {
        setLoggingOut(true);

        localStorage.removeItem("token");

        window.location.href = "/login";
    }

    // =========================================================
    // USER DISPLAY VALUES
    // =========================================================

    const displayName = user?.name || "Developer";
    const displayEmail = user?.email || "";

    const initials = displayName
        .trim()
        .split(/\s+/)
        .map((word) => word[0])
        .join("")
        .slice(0, 2)
        .toUpperCase();

    // =========================================================
    // PAGE
    // =========================================================

    return (
        <div className="min-h-screen bg-[#070709] text-white">

            {/* =================================================
                BACKGROUND
            ================================================= */}

            <div className="fixed inset-0 z-0 pointer-events-none">

                <img
                    src="/images/codepilot-bg2.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/55" />

                <div className="absolute inset-0 bg-red-950/20" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_15%,rgba(220,38,38,0.10),transparent_45%)]" />

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

            </div>

            {/* =================================================
                BACKGROUND EFFECTS
            ================================================= */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                <div className="absolute -top-40 left-1/4 w-[600px] h-[600px] rounded-full bg-red-600/[0.07] blur-[150px]" />

                <div className="absolute top-[45%] -right-60 w-[600px] h-[600px] rounded-full bg-rose-500/[0.05] blur-[160px]" />

                <div className="absolute -bottom-60 left-1/3 w-[500px] h-[500px] rounded-full bg-red-800/[0.05] blur-[170px]" />

            </div>

            {/* =================================================
                NAVBAR
            ================================================= */}

            <div className="relative z-20">
                <Navbar />
            </div>

            {/* =================================================
                MAIN
            ================================================= */}

            <main className="relative z-10 max-w-6xl mx-auto px-5 sm:px-8 lg:px-10 pt-28 pb-20">

                {/* =================================================
                    HEADER
                ================================================= */}

                <section className="max-w-3xl">

                    <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-4 py-2">

                        <UserRound className="w-4 h-4 text-red-400" />

                        <span className="text-[10px] uppercase tracking-[0.2em] font-mono text-red-400">
                            Account
                        </span>

                    </div>

                    <h1 className="mt-6 text-4xl sm:text-5xl font-bold tracking-tight">

                        Your

                        <span className="ml-2 bg-gradient-to-r from-red-400 via-rose-400 to-orange-300 bg-clip-text text-transparent">
                            Profile
                        </span>

                    </h1>

                    <p className="mt-4 text-sm leading-7 text-zinc-200 max-w-2xl">
                        Manage your CodePilot account and view your developer
                        activity.
                    </p>

                </section>

                {/* =================================================
                    PROFILE LAYOUT
                ================================================= */}

                <section className="mt-12 grid lg:grid-cols-[340px_1fr] gap-6">

                    {/* =================================================
                        PROFILE CARD
                    ================================================= */}

                    <div className="relative group">

                        <div className="absolute -inset-4 rounded-[30px] bg-red-600/20 blur-3xl" />

                        <div className="absolute -inset-1 rounded-[30px] bg-red-500/[0.06] blur-xl" />

                        <div
                            className="
                                relative overflow-hidden rounded-[28px]
                                border border-red-500/20
                                bg-black
                                shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.08)]
                            "
                        >

                            <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />

                            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-64 h-64 bg-red-600/[0.08] blur-[100px]" />

                            <div className="relative p-7">

                                {/* Avatar */}

                                <div className="flex justify-center">

                                    <div className="relative">

                                        <div className="absolute -inset-2 rounded-[26px] bg-red-500/[0.08] blur-xl" />

                                        <div className="relative w-24 h-24 rounded-[26px] border border-red-500/25 bg-gradient-to-br from-red-500/20 to-red-900/20 flex items-center justify-center shadow-[0_20px_60px_-20px_rgba(239,68,68,.5)]">

                                            {loadingUser ? (
                                                <div className="w-6 h-6 border-2 border-red-400/30 border-t-red-400 rounded-full animate-spin" />
                                            ) : (
                                                <span className="text-2xl font-bold text-red-300">
                                                    {initials}
                                                </span>
                                            )}

                                        </div>

                                        <div className="absolute -right-1 -bottom-1 w-7 h-7 rounded-full border-4 border-black bg-emerald-500 flex items-center justify-center">
                                            <span className="w-2 h-2 rounded-full bg-white" />
                                        </div>

                                    </div>

                                </div>

                                {/* Name */}

                                <div className="text-center mt-6">

                                    <h2 className="text-xl font-semibold">
                                        {loadingUser
                                            ? "Loading..."
                                            : displayName}
                                    </h2>

                                    <p className="mt-2 text-xs text-zinc-200 break-all">
                                        {loadingUser
                                            ? "Loading account..."
                                            : displayEmail}
                                    </p>

                                </div>

                                {/* Badge */}

                                <div className="flex justify-center mt-5">

                                    <span className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-3 py-1.5 text-[9px] uppercase tracking-wider font-mono text-red-300">

                                        <Code2 className="w-3 h-3" />

                                        Developer

                                    </span>

                                </div>

                                <div className="my-7 h-px bg-white/[0.06]" />

                                {/* Account info */}

                                <div className="space-y-4">

                                    <div className="flex items-center gap-3">

                                        <div className="w-9 h-9 rounded-xl border border-white/[0.07] bg-white/[0.02] flex items-center justify-center">

                                            <Mail className="w-4 h-4 text-zinc-200" />

                                        </div>

                                        <div className="min-w-0">

                                            <p className="text-[9px] uppercase tracking-wider text-zinc-600 font-mono">
                                                Email
                                            </p>

                                            <p className="mt-1 text-xs text-zinc-200 truncate">
                                                {displayEmail || "—"}
                                            </p>

                                        </div>

                                    </div>

                                    <div className="flex items-center gap-3">

                                        <div className="w-9 h-9 rounded-xl border border-white/[0.07] bg-white/[0.02] flex items-center justify-center">

                                            <ShieldCheck className="w-4 h-4 text-emerald-400" />

                                        </div>

                                        <div>

                                            <p className="text-[9px] uppercase tracking-wider text-zinc-200 font-mono">
                                                Security
                                            </p>

                                            <p className="mt-1 text-xs text-emerald-400">
                                                Account protected
                                            </p>

                                        </div>

                                    </div>

                                </div>

                                {/* Logout */}

                                <button
                                    onClick={handleLogout}
                                    disabled={loggingOut}
                                    className="
                                        mt-7 w-full flex items-center justify-center gap-2
                                        rounded-xl
                                        border border-red-500/20
                                        bg-red-500/[0.05]
                                        px-4 py-3
                                        text-xs font-medium text-red-300
                                        transition-all
                                        hover:bg-red-500/[0.1]
                                        hover:border-red-500/30
                                        active:scale-[0.98]
                                        disabled:opacity-50
                                    "
                                >

                                    <LogOut className="w-4 h-4" />

                                    {loggingOut
                                        ? "Signing out..."
                                        : "Sign out"}

                                </button>

                            </div>

                        </div>

                    </div>

                    {/* =================================================
                        RIGHT CONTENT
                    ================================================= */}

                    <div className="space-y-6">

                        {/* Welcome card */}

                        <div className="relative group">

                            <div className="absolute -inset-4 rounded-[30px] bg-red-600/20 blur-3xl" />

                            <div className="absolute -inset-1 rounded-[30px] bg-red-500/[0.06] blur-xl" />

                            <div
                                className="
                                    relative overflow-hidden rounded-[28px]
                                    border border-red-500/20
                                    bg-black
                                    p-7 sm:p-8
                                    shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.08)]
                                "
                            >

                                <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />

                                <div className="absolute -right-20 -top-20 w-56 h-56 rounded-full bg-red-500/[0.06] blur-[80px]" />

                                <div className="relative">

                                    <div className="flex items-start justify-between gap-5">

                                        <div>

                                            <div className="flex items-center gap-2 text-red-400">

                                                <Sparkles className="w-4 h-4" />

                                                <span className="text-[9px] uppercase tracking-[0.2em] font-mono">
                                                    CodePilot AI
                                                </span>

                                            </div>

                                            <h2 className="mt-4 text-2xl font-semibold">

                                                Welcome back,{" "}

                                                <span className="text-red-300">
                                                    {loadingUser
                                                        ? "Developer"
                                                        : displayName}
                                                </span>

                                            </h2>

                                            <p className="mt-3 max-w-xl text-sm leading-6 text-zinc-200">
                                                Your workspace is ready. Review code,
                                                find bugs and identify security
                                                vulnerabilities with AI.
                                            </p>

                                        </div>

                                        <div className="hidden sm:flex w-12 h-12 rounded-2xl border border-red-500/20 bg-red-500/[0.06] items-center justify-center">

                                            <Code2 className="w-5 h-5 text-red-400" />

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </div>

                        {/* =================================================
                            STATS
                        ================================================= */}

                        <div className="grid sm:grid-cols-3 gap-4">

                            <StatCard
                                icon={Activity}
                                label="Reviews"
                                value={stats.total_reviews}
                                description="Total code reviews"
                            />

                            <StatCard
                                icon={ShieldCheck}
                                label="Security"
                                value={stats.security_issues}
                                description="Issues detected"
                            />

                            <StatCard
                                icon={CalendarDays}
                                label="Member"
                                value="Active"
                                valueClass="text-emerald-400"
                                description="Account status"
                            />

                        </div>

                        {/* =================================================
                            ACCOUNT DETAILS
                        ================================================= */}

                        <div className="relative group">

                            <div className="absolute -inset-4 rounded-[30px] bg-red-600/15 blur-3xl" />

                            <div className="absolute -inset-1 rounded-[30px] bg-red-500/[0.05] blur-xl" />

                            <div
                                className="
                                    relative overflow-hidden rounded-[28px]
                                    border border-red-500/20
                                    bg-black
                                    shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.08)]
                                "
                            >

                                <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />

                                <div className="px-6 sm:px-7 py-5 border-b border-white/[0.06] flex items-center justify-between">

                                    <div>

                                        <h3 className="text-sm font-semibold">
                                            Account Information
                                        </h3>

                                        <p className="mt-1 text-[10px] text-zinc-200">
                                            Your CodePilot account details
                                        </p>

                                    </div>

                                    <UserRound className="w-4 h-4 text-zinc-200" />

                                </div>

                                <div className="p-6 sm:p-7 space-y-1">

                                    <InfoRow
                                        label="Display name"
                                        value={
                                            loadingUser
                                                ? "Loading..."
                                                : displayName
                                        }
                                    />

                                    <InfoRow
                                        label="Email address"
                                        value={
                                            loadingUser
                                                ? "Loading..."
                                                : displayEmail
                                        }
                                    />

                                    <InfoRow
                                        label="Account type"
                                        value="Developer"
                                    />

                                    <InfoRow
                                        label="Authentication"
                                        value="JWT protected"
                                        valueClass="text-emerald-400"
                                    />

                                </div>

                            </div>

                        </div>

                        {/* =================================================
                            QUICK ACTION
                        ================================================= */}

                        <button
                            onClick={() => {
                                window.location.href = "/review";
                            }}
                            className="
                                group w-full
                                rounded-[22px]
                                border border-red-500/20
                                bg-red-500/[0.05]
                                p-5
                                text-left
                                transition-all duration-300
                                hover:bg-red-500/[0.08]
                                hover:border-red-500/30
                                hover:shadow-[0_0_35px_rgba(220,38,38,0.08)]
                            "
                        >

                            <div className="flex items-center justify-between">

                                <div className="flex items-center gap-4">

                                    <div className="w-11 h-11 rounded-xl border border-red-500/20 bg-red-500/[0.08] flex items-center justify-center">

                                        <Code2 className="w-5 h-5 text-red-400" />

                                    </div>

                                    <div>

                                        <p className="text-sm font-medium">
                                            Start a new code review
                                        </p>

                                        <p className="mt-1 text-[10px] text-zinc-200">
                                            Analyze your code with CodePilot AI
                                        </p>

                                    </div>

                                </div>

                                <ChevronRight className="w-4 h-4 text-zinc-200 transition-transform group-hover:translate-x-1 group-hover:text-red-400" />

                            </div>

                        </button>

                    </div>

                </section>

            </main>

            {/* =================================================
                FOOTER
            ================================================= */}

            <div className="relative z-10">
                <Footer />
            </div>

        </div>
    );
}

/* =========================================================
   STAT CARD
========================================================= */

function StatCard({
    icon: Icon,
    label,
    value,
    description,
    valueClass = "text-white",
}) {
    return (
        <div className="group relative overflow-hidden rounded-[22px] border border-white/[0.08] bg-[#0a0a0b] p-6">

            <div className="absolute inset-0 rounded-[22px] bg-red-500/[0.02] opacity-0 transition group-hover:opacity-100" />

            <div className="relative">

                <div className="flex items-center justify-between">

                    <div className="w-9 h-9 rounded-xl border border-red-500/20 bg-red-500/[0.05] flex items-center justify-center">

                        <Icon className="w-4 h-4 text-red-400 transition-colors" />

                    </div>

                    <span className="text-[9px] uppercase tracking-wider font-mono text-zinc-700">
                        {label}
                    </span>

                </div>

                <p className={`mt-5 text-xl font-semibold ${valueClass}`}>
                    {value}
                </p>

                <p className="mt-1 text-[10px] text-zinc-200">
                    {description}
                </p>

            </div>

        </div>
    );
}

/* =========================================================
   INFO ROW
========================================================= */

function InfoRow({
    label,
    value,
    valueClass = "text-zinc-200",
}) {
    return (
        <div className="flex items-center justify-between gap-5 rounded-xl px-3 py-3 transition-colors hover:bg-red-500/[0.025]">

            <span className="text-[10px] uppercase tracking-wider font-mono text-zinc-200">
                {label}
            </span>

            <span
                className={`text-xs ${valueClass} text-right break-all`}
            >
                {value}
            </span>

        </div>
    );
}