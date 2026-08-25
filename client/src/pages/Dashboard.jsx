import { useEffect, useState } from "react";
import api from "../api/axios";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Reveal from "../components/common/Reveal";

import RecentReviews from "../components/dashboard/RecentReviews";
import QuickActions from "../components/dashboard/QuickActions";
import ReviewChart from "../components/dashboard/ReviewChart";
import LanguageChart from "../components/dashboard/LanguageChart";

import {
    FileCode2,
    Star,
    ShieldCheck,
    Languages,
    Sparkles,
    ArrowUpRight,
} from "lucide-react";

const PAGE_BACKGROUND_IMAGE = "/images/codepilot-bg1.png";

export default function Dashboard() {
    const [stats, setStats] = useState({
        total_reviews: 0,
        average_score: 0,
        security_issues: 0,
        languages: 0,
    });

    useEffect(() => {
        fetchStats();
    }, []);

    async function fetchStats() {
        try {
            const response = await api.get("/review/stats");
            setStats(response.data);
        } catch (error) {
            console.log(error);
        }
    }

    const statsCards = [
        {
            title: "Total Reviews",
            value: stats.total_reviews,
            description: "Code reviews completed",
            icon: FileCode2,
        },
        {
            title: "Average Score",
            value: `${stats.average_score}%`,
            description: "Overall code quality",
            icon: Star,
        },
        {
            title: "Security Issues",
            value: stats.security_issues,
            description: "Potential issues detected",
            icon: ShieldCheck,
        },
        {
            title: "Languages",
            value: stats.languages,
            description: "Languages reviewed",
            icon: Languages,
        },
    ];

    return (
        <div className="min-h-screen overflow-hidden bg-[#070707] text-white">

            {/* =====================================================
                BACKGROUND
            ====================================================== */}

            <div className="fixed inset-0 pointer-events-none">

                {PAGE_BACKGROUND_IMAGE && (
                    <>
                        <div
                            className="absolute inset-0 bg-cover bg-center"
                            style={{
                                backgroundImage: `url("${PAGE_BACKGROUND_IMAGE}")`,
                            }}
                        />
                    </>
                )}

                {/* Red ambient glow */}

                <div className="absolute -top-40 left-[15%] h-[550px] w-[550px] rounded-full bg-red-600/[0.07] blur-[150px]" />

                <div className="absolute top-[45%] -right-60 h-[600px] w-[600px] rounded-full bg-rose-500/[0.05] blur-[160px]" />

                {/* Subtle grid */}

                <div
                    className="absolute inset-0 opacity-[0.025]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                        backgroundSize: "60px 60px",
                    }}
                />

            </div>


            {/* =====================================================
                NAVBAR
            ====================================================== */}

            <div className="relative z-30">
                <Navbar />
            </div>


            {/* =====================================================
                MAIN
            ====================================================== */}

            <main className="relative z-10 mx-auto max-w-[1450px] px-5 pb-20 pt-28 sm:px-8 lg:px-12">


                {/* =================================================
                    HERO
                ================================================== */}

                <section className="mb-14">

                    <Reveal>

                        <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">

                            <div>

                                <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.07] px-4 py-2">

                                    <Sparkles className="h-3.5 w-3.5 text-red-400" />

                                    <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-red-400">
                                        CodePilot Dashboard
                                    </span>

                                </div>


                                <h1 className="text-4xl font-bold tracking-[-0.04em] sm:text-5xl">

                                    Your coding
                                    <br />

                                    <span className="bg-gradient-to-r from-red-400 via-rose-400 to-orange-300 bg-clip-text text-transparent">
                                        overview.
                                    </span>

                                </h1>


                                <p className="mt-5 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">
                                    Track your code reviews, quality scores and
                                    security findings from one place.
                                </p>

                            </div>


                            {/* Review button */}

                            <a
                                href="/review"
                                className="group inline-flex w-fit items-center gap-3 rounded-full border border-red-500/25 bg-red-500/[0.08] px-5 py-3 text-sm font-medium text-red-300 transition-all hover:border-red-400/40 hover:bg-red-500/[0.14]"
                            >

                                <Sparkles className="h-4 w-4" />

                                Review New Code

                                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

                            </a>

                        </div>

                    </Reveal>

                </section>


                {/* =================================================
                    STATS
                ================================================== */}

                <section>

                    <div className="mb-5">

                        <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400">
                            Overview
                        </p>

                        <h2 className="mt-2 text-lg font-semibold text-white">
                            Review statistics
                        </h2>

                    </div>


                    <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">

                        {statsCards.map((item, index) => {

                            const Icon = item.icon;

                            return (

                                <Reveal
                                    key={item.title}
                                    delay={index * 80}
                                >

                                    <div className="group relative">

                                        {/* Outer Glow Effects */}
                                        <div className="absolute -inset-4 rounded-[30px] bg-red-600/20 blur-3xl opacity-100" />
                                        <div className="absolute -inset-1 rounded-[30px] bg-red-500/[0.08] blur-xl opacity-100" />

                                        {/* Card Body */}
                                        <div className="relative h-full overflow-hidden rounded-3xl border border-red-500/20 bg-black p-6 shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.08)] transition-all duration-500 group-hover:-translate-y-2 group-hover:border-red-500/50 group-hover:shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_45px_rgba(220,38,38,0.2)]">

                                            {/* Top accent line */}
                                            <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />

                                            {/* Corner glow */}
                                            <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />

                                            <div className="relative flex items-start justify-between">

                                                <div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-red-500/30 bg-red-500/10 text-xl text-red-400 shadow-[0_0_25px_rgba(239,68,68,0.12)] transition-all duration-500 group-hover:scale-110 group-hover:border-red-500/60 group-hover:bg-red-500/15 group-hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]">
                                                    <Icon className="h-5 w-5 text-red-400" />
                                                </div>

                                                <ArrowUpRight className="h-4 w-4 text-zinc-500 transition-colors group-hover:text-red-400" />

                                            </div>

                                            <div className="relative mt-6">

                                                <p className="font-mono text-xs text-red-500/70">
                                                    {item.title}
                                                </p>

                                                <p className="mt-2 text-3xl font-semibold tracking-tight text-white">
                                                    {item.value}
                                                </p>

                                                <p className="mt-2 text-xs text-zinc-300">
                                                    {item.description}
                                                </p>

                                            </div>

                                            <div className="relative mt-6 h-px w-full bg-gradient-to-r from-red-500/50 via-red-500/20 to-transparent shadow-[0_0_10px_rgba(239,68,68,0.3)]" />

                                        </div>

                                    </div>

                                </Reveal>

                            );

                        })}

                    </div>

                </section>


                {/* =================================================
                    RECENT REVIEWS
                ================================================== */}

                <section className="mt-14">

                    <Reveal>

                        <div className="mb-5 flex items-end justify-between">

                            <div>

                                <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400">
                                    Activity
                                </p>

                                <h2 className="mt-2 text-lg font-semibold">
                                    Recent reviews
                                </h2>

                            </div>


                            <a
                                href="/history"
                                className="group flex items-center gap-1.5 text-xs text-zinc-500 transition hover:text-red-400"
                            >
                                View history

                                <ArrowUpRight className="h-3.5 w-3.5 transition group-hover:-translate-y-0.5 group-hover:translate-x-0.5" />

                            </a>

                        </div>


                        {/* Glowing Container Card */}
                        <div className="group relative">

                            <div className="absolute -inset-4 rounded-[30px] bg-red-600/15 blur-3xl opacity-100" />
                            <div className="absolute -inset-1 rounded-[30px] bg-red-500/[0.06] blur-xl opacity-100" />

                            <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-black p-6 shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.08)] transition-all duration-500 group-hover:border-red-500/40">

                                <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />
                                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />

                                <RecentReviews />

                            </div>

                        </div>

                    </Reveal>

                </section>


                {/* =================================================
                    QUICK ACTIONS
                ================================================== */}

                <section className="mt-12">

                    <Reveal>

                        <div className="mb-5">

                            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400">
                                Shortcuts
                            </p>

                            <h2 className="mt-2 text-lg font-semibold">
                                Quick actions
                            </h2>

                        </div>


                        {/* Glowing Container Card */}
                        <div className="group relative">

                            <div className="absolute -inset-4 rounded-[30px] bg-red-600/15 blur-3xl opacity-100" />
                            <div className="absolute -inset-1 rounded-[30px] bg-red-500/[0.06] blur-xl opacity-100" />

                            <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-black p-4 shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.08)] transition-all duration-500 group-hover:border-red-500/40">

                                <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />
                                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />

                                <QuickActions />

                            </div>

                        </div>

                    </Reveal>

                </section>


                {/* =================================================
                    ANALYTICS
                ================================================== */}

                <section className="mt-14">

                    <Reveal>

                        <div className="mb-6">

                            <p className="font-mono text-[9px] uppercase tracking-[0.2em] text-red-400">
                                Analytics
                            </p>

                            <h2 className="mt-2 text-lg font-semibold">
                                Review insights
                            </h2>

                            <p className="mt-1 text-xs text-zinc-400">
                                Understand how you use CodePilot over time.
                            </p>

                        </div>


                        <div className="grid gap-6 lg:grid-cols-2">

                            <div className="group relative">

                                <div className="absolute -inset-4 rounded-[30px] bg-red-600/15 blur-3xl opacity-100" />
                                <div className="absolute -inset-1 rounded-[30px] bg-red-500/[0.06] blur-xl opacity-100" />

                                <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-black p-6 shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.08)] transition-all duration-500 group-hover:border-red-500/40">

                                    <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />
                                    <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />

                                    <ReviewChart />

                                </div>

                            </div>


                            <div className="group relative">

                                <div className="absolute -inset-4 rounded-[30px] bg-red-600/15 blur-3xl opacity-100" />
                                <div className="absolute -inset-1 rounded-[30px] bg-red-500/[0.06] blur-xl opacity-100" />

                                <div className="relative overflow-hidden rounded-3xl border border-red-500/20 bg-black p-6 shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.08)] transition-all duration-500 group-hover:border-red-500/40">

                                    <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />
                                    <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />

                                    <LanguageChart />

                                </div>

                            </div>

                        </div>

                    </Reveal>

                </section>


                {/* =================================================
                    BOTTOM CTA
                ================================================== */}

                <Reveal>

                    <section className="mx-auto mt-16 max-w-3xl">

                        <div className="group relative">

                            <div className="absolute -inset-4 rounded-[30px] bg-red-600/25 blur-3xl opacity-100" />
                            <div className="absolute -inset-1 rounded-[30px] bg-red-500/[0.08] blur-xl opacity-100" />

                            <div className="relative overflow-hidden rounded-3xl border border-red-500/30 bg-black px-6 py-8 shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.1)] sm:px-8">

                                <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />
                                <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600/20 blur-3xl" />

                                <div className="relative flex flex-col items-center justify-between gap-5 text-center sm:flex-row sm:text-left">

                                    <div>

                                        <h3 className="text-base font-semibold text-white">
                                            Ready to review more code?
                                        </h3>

                                        <p className="mt-1 text-xs text-zinc-400">
                                            Run another AI-powered code analysis.
                                        </p>

                                    </div>


                                    <a
                                        href="/review"
                                        className="inline-flex items-center gap-2 whitespace-nowrap rounded-full bg-red-600 px-5 py-2.5 text-xs font-medium text-white shadow-[0_0_20px_rgba(220,38,38,0.4)] transition hover:bg-red-500 hover:shadow-[0_0_30px_rgba(220,38,38,0.6)]"
                                    >
                                        Start Review

                                        <ArrowUpRight className="h-3.5 w-3.5" />

                                    </a>

                                </div>

                            </div>

                        </div>

                    </section>

                </Reveal>

            </main>


            {/* =====================================================
                FOOTER
            ====================================================== */}

            <div className="relative z-10">
                <Footer />
            </div>

        </div>
    );
}