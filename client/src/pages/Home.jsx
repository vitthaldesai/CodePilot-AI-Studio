
import { Link } from "react-router-dom";
import Footer from "../components/layout/Footer";
import Button from "../components/common/Button";
import Hero from "../components/home/Hero";

export default function Home() {
    return (
        <div className="min-h-screen">

            {/* =====================================================
                GLOBAL BACKGROUND
            ====================================================== */}

            <div className="fixed inset-0 z-0 pointer-events-none">
                <img
                    src="/images/codepilot-bg1.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />

                <div className="absolute inset-0 bg-black/52" />

                <div className="absolute inset-0 bg-red-950/20" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(220,38,38,0.08),transparent_45%)]" />
            </div>


            {/* =====================================================
                PAGE CONTENT
            ====================================================== */}

            <div className="relative z-10">




                {/* =====================================================
                    HERO
                ====================================================== */}

                <main>
                    <Hero />
                </main>


                {/* =====================================================
                    PRODUCT INTRO
                ====================================================== */}

                <section className="relative px-6 py-28">

                    <div className="mx-auto max-w-7xl">

                        <div className="mx-auto max-w-3xl text-center cp-fade-up">

                            <div className="inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-4 py-2 font-mono text-xs tracking-[0.18em] text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.08)] backdrop-blur-xl">

                                <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />

                                INTELLIGENT CODE ANALYSIS

                            </div>


                            <h2 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">

                                <span className="text-white">
                                    Your code deserves
                                </span>

                                <span className="block text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.45)]">
                                    a second pair of eyes.
                                </span>

                            </h2>


                            <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                                CodePilot analyzes your code for bugs, security
                                vulnerabilities, performance problems and bad practices —
                                before they become expensive problems.
                            </p>

                        </div>


                        {/* FEATURE CARDS */}

                        <div className="mt-16 grid gap-5 md:grid-cols-2 lg:grid-cols-4">

                            {[
                                {
                                    number: "01",
                                    icon: "⌘",
                                    title: "AI Code Review",
                                    text: "Get intelligent feedback on your code with clear explanations and actionable suggestions.",
                                },
                                {
                                    number: "02",
                                    icon: "◈",
                                    title: "Security Analysis",
                                    text: "Identify potentially dangerous patterns and security weaknesses before deployment.",
                                },
                                {
                                    number: "03",
                                    icon: "⚡",
                                    title: "Performance",
                                    text: "Find inefficient logic and receive suggestions to make your code cleaner and faster.",
                                },
                                {
                                    number: "04",
                                    icon: "✓",
                                    title: "Actionable Reports",
                                    text: "Understand exactly what went wrong, why it matters and how to improve it.",
                                },
                            ].map((feature, index) => (

                                <div
                                    key={feature.number}
                                    className="group relative cp-fade-up"
                                    style={{
                                        animationDelay: `${index * 120}ms`,
                                    }}
                                >

                                    <div className="absolute -inset-4 rounded-[30px] bg-red-600/25 blur-3xl opacity-100" />

                                    <div className="absolute -inset-1 rounded-[30px] bg-red-500/[0.08] blur-xl opacity-100" />

                                    <div
                                        className="
                                            relative h-full overflow-hidden rounded-3xl
                                            border border-red-500/20
                                            bg-black
                                            p-7
                                            shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.08)]
                                            transition-all duration-500
                                            group-hover:-translate-y-2
                                            group-hover:border-red-500/50
                                            group-hover:shadow-[0_30px_100px_rgba(0,0,0,0.8),0_0_45px_rgba(220,38,38,0.2)]
                                        "
                                    >

                                        <div className="pointer-events-none absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />

                                        <div className="pointer-events-none absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />

                                        <div className="relative flex items-center justify-between">

                                            <div
                                                className="
                                                    flex h-12 w-12 items-center justify-center
                                                    rounded-2xl
                                                    border border-red-500/30
                                                    bg-red-500/10
                                                    text-xl text-red-400
                                                    shadow-[0_0_25px_rgba(239,68,68,0.12)]
                                                    transition-all duration-500
                                                    group-hover:scale-110
                                                    group-hover:border-red-500/60
                                                    group-hover:bg-red-500/15
                                                    group-hover:shadow-[0_0_40px_rgba(239,68,68,0.3)]
                                                "
                                            >
                                                {feature.icon}
                                            </div>

                                            <span className="font-mono text-xs text-red-500/60">
                                                {feature.number}
                                            </span>

                                        </div>

                                        <h3 className="relative mt-7 text-xl font-semibold text-white">
                                            {feature.title}
                                        </h3>

                                        <p className="relative mt-3 text-sm leading-6 text-zinc-300">
                                            {feature.text}
                                        </p>

                                        <div className="relative mt-6 h-px w-full bg-gradient-to-r from-red-500/50 via-red-500/20 to-transparent shadow-[0_0_10px_rgba(239,68,68,0.3)]" />

                                    </div>

                                </div>

                            ))}

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    CODE REVIEW SHOWCASE
                ====================================================== */}

                <section className="relative px-6 py-28">

                    <div className="mx-auto grid max-w-7xl items-center gap-16 lg:grid-cols-2">

                        <div className="cp-fade-up">

                            <span className="font-mono text-xs tracking-[0.2em] text-red-500 drop-shadow-[0_0_12px_rgba(239,68,68,0.3)]">
                                / CODEPILOT_ENGINE
                            </span>

                            <h2 className="mt-5 text-4xl font-bold tracking-tight sm:text-5xl">

                                <span className="text-white">
                                    Don't just find
                                </span>

                                <span className="block text-red-400">
                                    the problem.
                                </span>

                                <span className="text-white drop-shadow-[0_0_20px_rgba(255,255,255,0.08)]">
                                    Understand it.
                                </span>

                            </h2>

                            <p className="mt-6 max-w-xl text-lg leading-8 text-zinc-200">
                                CodePilot doesn't simply throw errors at you. It
                                explains the issue, identifies its impact and gives
                                you a practical way to fix it.
                            </p>

                            <div className="mt-8 space-y-4">

                                {[
                                    "Detect potential bugs",
                                    "Identify security vulnerabilities",
                                    "Improve performance",
                                    "Receive AI-generated fixes",
                                ].map((item) => (

                                    <div
                                        key={item}
                                        className="group flex items-center gap-4"
                                    >

                                        <div
                                            className="
                                                flex h-7 w-7 shrink-0 items-center
                                                justify-center rounded-full
                                                border border-red-500/30
                                                bg-red-500/10
                                                text-xs text-red-400
                                                shadow-[0_0_15px_rgba(239,68,68,0.08)]
                                                transition-all duration-300
                                                group-hover:border-red-500/60
                                                group-hover:bg-red-500/15
                                                group-hover:shadow-[0_0_20px_rgba(239,68,68,0.2)]
                                            "
                                        >
                                            ✓
                                        </div>

                                        <span className="text-sm text-zinc-200 transition group-hover:text-white">
                                            {item}
                                        </span>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* CODE WINDOW */}

                        <div className="relative cp-fade-up">

                            <div className="absolute -inset-12 rounded-full bg-red-600/15 blur-[110px]" />

                            <div
                                className="
                                    relative overflow-hidden rounded-3xl
                                    border border-red-500/20
                                    bg-black
                                    shadow-[0_30px_100px_rgba(0,0,0,0.7),0_0_40px_rgba(220,38,38,0.08)]
                                "
                            >

                                <div className="flex items-center justify-between border-b border-white/[0.08] bg-white/[0.025] px-5 py-4">

                                    <div className="flex gap-2">
                                        <span className="h-3 w-3 rounded-full bg-red-500/80 shadow-[0_0_8px_rgba(239,68,68,0.4)]" />
                                        <span className="h-3 w-3 rounded-full bg-yellow-500/70" />
                                        <span className="h-3 w-3 rounded-full bg-green-500/70" />
                                    </div>

                                    <span className="font-mono text-xs text-zinc-300">
                                        review · cart.js
                                    </span>

                                    <span className="flex items-center gap-2 font-mono text-xs text-red-400">
                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />
                                        analyzing
                                    </span>

                                </div>


                                <div className="overflow-hidden p-6 font-mono text-sm leading-7">

                                    <div className="text-zinc-400">
                                        01
                                        <span className="ml-6 text-zinc-300">
                                            function calculateTotal(items) {"{"}
                                        </span>
                                    </div>

                                    <div className="text-zinc-400">
                                        02
                                        <span className="ml-6 text-zinc-300">
                                            {"  "}let total = 0;
                                        </span>
                                    </div>

                                    <div className="mt-1 rounded bg-red-500/10 px-2 text-red-300 shadow-[inset_3px_0_0_rgba(239,68,68,0.45)]">
                                        03
                                        <span className="ml-6">
                                            {"  "}items.forEach(item =&gt; {"{"}
                                        </span>
                                    </div>

                                    <div className="rounded bg-red-500/10 px-2 text-red-400 shadow-[inset_3px_0_0_rgba(239,68,68,0.8)]">
                                        04
                                        <span className="ml-6">
                                            {"    "}total += item.price;
                                        </span>
                                    </div>

                                    <div className="text-zinc-600">
                                        05
                                        <span className="ml-6 text-zinc-300">
                                            {"  "}{"}"});
                                        </span>
                                    </div>

                                    <div className="text-zinc-600">
                                        06
                                        <span className="ml-6 text-zinc-300">
                                            {"}"}
                                        </span>
                                    </div>


                                    <div className="mt-6 rounded-2xl border border-red-500/20 bg-red-500/[0.04] p-4 shadow-[inset_0_0_30px_rgba(239,68,68,0.04)]">

                                        <div className="flex items-center gap-2 text-red-400">

                                            <span className="drop-shadow-[0_0_8px_rgba(239,68,68,0.6)]">
                                                ●
                                            </span>

                                            <span>
                                                Potential issue detected
                                            </span>

                                        </div>

                                        <p className="mt-2 text-xs leading-6 text-zinc-300">
                                            Repeated iteration may impact performance
                                            for large collections. Consider using a
                                            more efficient aggregation strategy.
                                        </p>

                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    WORKFLOW
                ====================================================== */}

                <section className="relative px-6 py-28">

                    <div className="mx-auto max-w-7xl">

                        <div className="mx-auto max-w-3xl text-center cp-fade-up">

                            <span className="font-mono text-xs tracking-[0.2em] text-red-400">
                                / WORKFLOW
                            </span>

                            <h2 className="mt-4 text-4xl font-bold sm:text-5xl">

                                <span className="text-white">
                                    From code to
                                </span>

                                <span className="block text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.45)]">
                                    clear insights.
                                </span>

                            </h2>

                            <p className="mx-auto mt-5 max-w-2xl text-zinc-300">
                                Submit your code, let CodePilot analyze it, and receive
                                practical insights without the manual review process.
                            </p>

                        </div>


                        <div className="relative mt-20">

                            <div className="absolute left-[16%] right-[16%] top-[68px] hidden h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent md:block" />

                            <div className="grid gap-8 md:grid-cols-3">

                                {[
                                    {
                                        step: "01",
                                        icon: "⌘",
                                        title: "Submit Code",
                                        text: "Paste your code or upload a source file into the CodePilot review interface.",
                                    },
                                    {
                                        step: "02",
                                        icon: "✦",
                                        title: "AI Analysis",
                                        text: "The analysis engine examines your code for bugs, security and performance issues.",
                                    },
                                    {
                                        step: "03",
                                        icon: "✓",
                                        title: "Get Insights",
                                        text: "Receive a structured review with explanations and practical recommendations.",
                                    },
                                ].map((item, index) => (

                                    <div
                                        key={item.step}
                                        className="group relative cp-fade-up"
                                        style={{
                                            animationDelay: `${index * 160}ms`,
                                        }}
                                    >

                                        <div className="absolute -inset-5 rounded-[34px] bg-red-600/30 blur-2xl opacity-100" />

                                        <div className="absolute -inset-2 rounded-[30px] bg-red-500/10 blur-xl opacity-100" />

                                        <div
                                            className="
                                                relative min-h-[310px]
                                                overflow-hidden rounded-[28px]
                                                border border-red-500/25
                                                bg-black
                                                p-8
                                                shadow-[0_25px_70px_rgba(0,0,0,0.75),0_0_35px_rgba(220,38,38,0.08)]
                                                transition-all duration-500
                                                group-hover:-translate-y-3
                                                group-hover:border-red-500/60
                                                group-hover:shadow-[0_30px_100px_rgba(220,38,38,0.25)]
                                            "
                                        >

                                            <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.9)]" />

                                            <div className="absolute -right-20 -top-20 h-48 w-48 rounded-full bg-red-600/15 blur-3xl" />

                                            <div className="absolute -bottom-24 -left-20 h-48 w-48 rounded-full bg-red-600/10 blur-3xl" />

                                            <div className="relative flex items-center justify-between">

                                                <div
                                                    className="
                                                        flex h-[70px] w-[70px]
                                                        items-center justify-center
                                                        rounded-2xl
                                                        border border-red-500/40
                                                        bg-red-500/[0.08]
                                                        font-mono text-lg
                                                        text-red-400
                                                        shadow-[0_0_30px_rgba(239,68,68,0.20)]
                                                        transition-all duration-500
                                                        group-hover:scale-110
                                                        group-hover:border-red-500/70
                                                        group-hover:bg-red-500/[0.14]
                                                        group-hover:shadow-[0_0_45px_rgba(239,68,68,0.4)]
                                                    "
                                                >
                                                    {item.icon}
                                                </div>

                                                <span className="font-mono text-xs text-red-500/70">
                                                    {item.step}
                                                </span>

                                            </div>

                                            <div className="relative mt-10">

                                                <h3 className="text-2xl font-semibold text-white">
                                                    {item.title}
                                                </h3>

                                                <p className="mt-4 text-sm leading-7 text-zinc-300">
                                                    {item.text}
                                                </p>

                                            </div>

                                            <div className="absolute bottom-7 left-8 right-8">

                                                <div className="h-[2px] w-full bg-gradient-to-r from-red-500/60 via-red-500/25 to-transparent shadow-[0_0_12px_rgba(239,68,68,0.45)]" />

                                            </div>

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </div>


                        {/* STATS */}

                        <div className="relative mt-28 cp-fade-up">

                            <div className="absolute -inset-8 rounded-[38px] bg-red-600/15 blur-3xl opacity-100" />

                            <div className="absolute -inset-2 rounded-[32px] bg-red-500/[0.06] blur-xl" />

                            <div
                                className="
                                    relative overflow-hidden
                                    rounded-[30px]
                                    border border-red-500/25
                                    bg-black
                                    shadow-[0_30px_100px_rgba(0,0,0,0.75),0_0_50px_rgba(220,38,38,0.08)]
                                "
                            >

                                <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />

                                <div className="relative border-b border-white/[0.10] px-8 py-5">

                                    <div className="flex items-center justify-between">

                                        <div className="flex items-center gap-3">

                                            <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_15px_rgba(239,68,68,0.9)]" />

                                            <span className="font-mono text-xs tracking-[0.18em] text-zinc-200">
                                                CODEPILOT ENGINE
                                            </span>

                                        </div>

                                        <div className="flex items-center gap-2">

                                            <span className="h-1 w-1 rounded-full bg-red-500/60" />

                                            <span className="font-mono text-xs tracking-[0.12em] text-red-400">
                                                SYSTEM READY
                                            </span>

                                        </div>

                                    </div>

                                </div>


                                <div className="grid md:grid-cols-3">

                                    {[
                                        {
                                            value: "01",
                                            title: "AI-Powered Review Engine",
                                            description: "Intelligent analysis",
                                        },
                                        {
                                            value: "04",
                                            title: "Core Analysis Areas",
                                            description: "Bugs · Security · Performance · Quality",
                                        },
                                        {
                                            value: "∞",
                                            title: "Lines You Can Analyze",
                                            description: "Built for real projects",
                                        },
                                    ].map((stat, index) => (

                                        <div
                                            key={stat.title}
                                            className={`
                                                group relative overflow-hidden
                                                p-10 text-center
                                                transition-all duration-500
                                                hover:bg-red-500/[0.035]

                                                ${index !== 2
                                                    ? "border-b border-white/[0.08] md:border-b-0 md:border-r"
                                                    : ""
                                                }
                                            `}
                                        >

                                            <div className="absolute left-1/2 top-1/2 h-40 w-40 -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.06] blur-3xl" />

                                            <div className="absolute inset-0 bg-gradient-to-b from-red-500/[0.06] via-transparent to-transparent opacity-0 transition duration-500 group-hover:opacity-100" />

                                            <div className="relative">

                                                <div
                                                    className="
                                                        text-5xl font-bold tracking-tight
                                                        text-red-500
                                                        drop-shadow-[0_0_25px_rgba(239,68,68,0.35)]
                                                        transition-all duration-500
                                                        group-hover:scale-110
                                                        group-hover:drop-shadow-[0_0_35px_rgba(239,68,68,0.65)]
                                                    "
                                                >
                                                    {stat.value}
                                                </div>

                                                <div className="mx-auto mt-5 flex items-center justify-center gap-2">

                                                    <div className="h-px w-8 bg-gradient-to-r from-transparent to-red-500/50" />

                                                    <div className="h-1 w-1 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.8)]" />

                                                    <div className="h-px w-8 bg-gradient-to-l from-transparent to-red-500/50" />

                                                </div>

                                                <h3 className="mt-5 text-base font-medium text-zinc-100">
                                                    {stat.title}
                                                </h3>

                                                <p className="mt-2 font-mono text-xs text-red-400">
                                                    {stat.description}
                                                </p>

                                            </div>

                                            <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent shadow-[0_0_10px_rgba(239,68,68,0.25)]" />

                                        </div>

                                    ))}

                                </div>

                                <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-500/50 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.5)]" />

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    FINAL CTA
                ====================================================== */}

                <section className="relative px-6 py-32">

                    <div className="pointer-events-none absolute left-1/2 top-1/2 h-[500px] w-[900px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/10 blur-[140px]" />

                    <div className="relative mx-auto max-w-5xl">

                        <div className="absolute -inset-[2px] rounded-[34px] bg-gradient-to-r from-red-600/20 via-red-500/60 to-red-600/20 blur-sm opacity-90" />

                        <div
                            className="
                                relative overflow-hidden rounded-[32px]
                                border border-red-500/30
                                bg-black
                                p-12 text-center
                                shadow-[0_30px_100px_rgba(0,0,0,0.75),0_0_60px_rgba(220,38,38,0.10)]
                                sm:p-16
                            "
                        >

                            <div className="pointer-events-none absolute inset-3 rounded-[26px] border border-red-500/[0.08]" />

                            <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_18px_rgba(239,68,68,0.8)]" />

                            <div className="absolute bottom-0 left-10 right-10 h-px bg-gradient-to-r from-transparent via-red-500/60 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.5)]" />

                            <div className="absolute left-0 top-1/2 h-32 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-red-500/70 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.6)]" />

                            <div className="absolute right-0 top-1/2 h-32 w-px -translate-y-1/2 bg-gradient-to-b from-transparent via-red-500/70 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.6)]" />

                            <div className="absolute left-6 top-6 h-8 w-8 border-l border-t border-red-500/40" />

                            <div className="absolute right-6 top-6 h-8 w-8 border-r border-t border-red-500/40" />

                            <div className="absolute bottom-6 left-6 h-8 w-8 border-b border-l border-red-500/40" />

                            <div className="absolute bottom-6 right-6 h-8 w-8 border-b border-r border-red-500/40" />

                            <div className="pointer-events-none absolute left-1/2 top-1/2 h-[350px] w-[650px] -translate-x-1/2 -translate-y-1/2 rounded-full bg-red-600/[0.07] blur-[100px]" />

                            <div className="relative z-10">

                                <div className="mx-auto inline-flex items-center gap-3 rounded-full border border-red-500/20 bg-red-500/[0.05] px-4 py-2 shadow-[0_0_25px_rgba(239,68,68,0.08)]">

                                    <span className="h-2 w-2 animate-pulse rounded-full bg-red-500 shadow-[0_0_12px_rgba(239,68,68,0.9)]" />

                                    <span className="font-mono text-[11px] tracking-[0.2em] text-red-400">
                                        READY WHEN YOU ARE
                                    </span>

                                </div>

                                <h2 className="mt-7 text-4xl font-bold tracking-tight sm:text-5xl">

                                    <span className="text-white">
                                        Write better code.
                                    </span>

                                    <span className="block text-red-500 drop-shadow-[0_0_30px_rgba(239,68,68,0.45)]">
                                        Ship with confidence.
                                    </span>

                                </h2>

                                <div className="mx-auto mt-7 flex items-center justify-center gap-3">

                                    <div className="h-px w-16 bg-gradient-to-r from-transparent to-red-500/50" />

                                    <div className="h-1 w-1 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />

                                    <div className="h-px w-16 bg-gradient-to-l from-transparent to-red-500/50" />

                                </div>

                                <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-zinc-300">
                                    Let CodePilot analyze your code and uncover issues
                                    before they reach production.
                                </p>

                                <div className="mt-10 flex justify-center">

                                    <Link to="/review">

                                        <Button
                                            className="
                                                group relative inline-flex
                                                items-center justify-center gap-3
                                                overflow-hidden rounded-xl
                                                border border-red-400/50
                                                bg-gradient-to-r
                                                from-red-700
                                                via-red-500
                                                to-red-700
                                                px-8 py-4
                                                text-sm font-semibold text-white
                                                shadow-[0_0_30px_rgba(239,68,68,0.30)]
                                                transition-all duration-300
                                                hover:-translate-y-1
                                                hover:border-red-300/70
                                                hover:shadow-[0_0_50px_rgba(239,68,68,0.55)]
                                                active:translate-y-0
                                                active:scale-[0.98]
                                            "
                                        >

                                            <span
                                                className="
                                                    absolute inset-0
                                                    -translate-x-full
                                                    bg-gradient-to-r
                                                    from-transparent
                                                    via-white/20
                                                    to-transparent
                                                    transition-transform
                                                    duration-700
                                                    group-hover:translate-x-full
                                                "
                                            />

                                            <span className="relative">
                                                Start Your First Review
                                            </span>

                                            <span className="relative text-lg transition-transform duration-300 group-hover:translate-x-1">
                                                →
                                            </span>

                                        </Button>

                                    </Link>

                                </div>

                                <div className="mt-8 flex flex-wrap items-center justify-center gap-4 font-mono text-[10px] tracking-[0.15em] text-zinc-200 sm:gap-6">

                                    <span>AI POWERED</span>

                                    <span className="h-1 w-1 rounded-full bg-red-500/50" />

                                    <span>SECURITY FOCUSED</span>

                                    <span className="h-1 w-1 rounded-full bg-red-500/50" />

                                    <span>DEVELOPER READY</span>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>


                {/* =====================================================
                    FOOTER
                ====================================================== */}

                <Footer />

            </div>

        </div>
    );
}
