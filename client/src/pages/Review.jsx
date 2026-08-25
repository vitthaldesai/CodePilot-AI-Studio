import { useState, useEffect } from "react";
import api from "../api/axios";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";
import Reveal from "../components/common/Reveal";

import {
    Sparkles,
    Code2,
    Copy,
    Check,
    Trash2,
    Maximize2,
    Minimize2,
    Bug,
    ShieldCheck,
    Gauge,
    Zap,
    ArrowRight,
    Activity,
    Terminal,
    ScanSearch,
    CircleDot,
    Cpu,
    Braces,
    Lock,
    BarChart3,
    WandSparkles,
} from "lucide-react";

import LanguageSelector from "../components/review/LanguageSelector";
import CodeEditor from "../components/review/CodeEditor";
import ReviewButton from "../components/review/ReviewButton";
import ImprovedCode from "../components/review/ImprovedCode";
import AIChat from "../components/review/AIChat";

const PAGE_BACKGROUND_IMAGE = "/images/codepilot-bg1.png";

const STARTER_SNIPPETS = {
    python: `# Example Python code

def get_user_data(user_id):
    query = "SELECT * FROM users WHERE id = '" + user_id + "'"
    return db.execute(query)
`,

    javascript: `// Example JavaScript code

function processItems(items) {
    let results = [];

    for (var i = 0; i < items.length; i++) {
        setTimeout(function () {
            console.log("Processing item:", items[i]);
        }, 1000);
    }

    return results;
}
`,

    typescript: `// Example TypeScript code

async function fetchData(url: string) {
    const response = await fetch(url);
    const data = await response.json();

    return data.result.user;
}
`,
};

const ANALYSIS_PHASES = [
    "Parsing syntax…",
    "Scanning for bugs…",
    "Checking security…",
    "Reviewing performance…",
    "Finalizing report…",
];

const CAPABILITIES = [
    {
        icon: Bug,
        number: "01",
        title: "Bug Detection",
        text: "Identify logical errors, runtime problems and unreliable code paths.",
    },
    {
        icon: ShieldCheck,
        number: "02",
        title: "Security Analysis",
        text: "Detect vulnerable patterns and potential security weaknesses.",
    },
    {
        icon: Gauge,
        number: "03",
        title: "Performance",
        text: "Find inefficient operations, bottlenecks and unnecessary work.",
    },
    {
        icon: Zap,
        number: "04",
        title: "Code Quality",
        text: "Improve readability, maintainability and engineering practices.",
    },
];

const SUPPORTED_LANGUAGES = [
    "Python",
    "JavaScript",
    "TypeScript",
];

function CornerBrackets() {
    return (
        <>
            <span className="absolute left-0 top-0 w-8 h-px bg-gradient-to-r from-red-400 to-transparent" />
            <span className="absolute left-0 top-0 h-8 w-px bg-gradient-to-b from-red-400 to-transparent" />

            <span className="absolute right-0 top-0 w-8 h-px bg-gradient-to-l from-orange-300 to-transparent" />
            <span className="absolute right-0 top-0 h-8 w-px bg-gradient-to-b from-orange-300 to-transparent" />

            <span className="absolute left-0 bottom-0 w-8 h-px bg-gradient-to-r from-rose-400 to-transparent" />
            <span className="absolute left-0 bottom-0 h-8 w-px bg-gradient-to-t from-rose-400 to-transparent" />

            <span className="absolute right-0 bottom-0 w-8 h-px bg-gradient-to-l from-red-400 to-transparent" />
            <span className="absolute right-0 bottom-0 h-8 w-px bg-gradient-to-t from-red-400 to-transparent" />
        </>
    );
}

function SectionLabel({ children, icon: Icon = Activity }) {
    return (
        <div className="inline-flex items-center gap-2 rounded-full border border-red-400/25 bg-red-500/[0.08] px-3 py-1.5 shadow-[0_0_25px_rgba(239,68,68,.08)]">
            <Icon className="w-3 h-3 text-red-300" />

            <span className="text-[9px] font-mono uppercase tracking-[0.2em] font-semibold text-red-200">
                {children}
            </span>
        </div>
    );
}

export default function Review() {
    const [language, setLanguage] = useState("python");
    const [code, setCode] = useState("");
    const [result, setResult] = useState(null);
    const [loading, setLoading] = useState(false);
    const [copied, setCopied] = useState(false);
    const [fullscreen, setFullscreen] = useState(false);
    const [phaseIndex, setPhaseIndex] = useState(0);

    useEffect(() => {
        if (!loading) {
            setPhaseIndex(0);
            return;
        }

        const interval = setInterval(() => {
            setPhaseIndex(
                (index) => (index + 1) % ANALYSIS_PHASES.length
            );
        }, 1300);

        return () => clearInterval(interval);
    }, [loading]);

    async function analyzeCode() {
        if (!code.trim()) return;

        setLoading(true);
        setResult(null);

        try {
            const response = await api.post("/review/", {
                language,
                code,
            });

            setResult(response.data);
        } catch (error) {
            console.error("Review error:", error);
        } finally {
            setLoading(false);
        }
    }

    async function handleCopy() {
        if (!code) return;

        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);

            setTimeout(() => {
                setCopied(false);
            }, 2000);
        } catch (error) {
            console.error("Copy failed:", error);
        }
    }

    function handleClear() {
        setCode("");
        setResult(null);
    }

    function loadPreset(lang) {
        setLanguage(lang);
        setCode(STARTER_SNIPPETS[lang] || "");
        setResult(null);
    }

    const extension =
        language === "javascript"
            ? "js"
            : language === "typescript"
                ? "ts"
                : "py";

    const status = loading
        ? {
            label: "Analyzing",
            text: "text-amber-200",
            border: "border-amber-300/30",
            bg: "bg-amber-400/[0.08]",
            dot: "bg-amber-300",
        }
        : result
            ? {
                label: "Complete",
                text: "text-emerald-200",
                border: "border-emerald-300/30",
                bg: "bg-emerald-400/[0.08]",
                dot: "bg-emerald-300",
            }
            : {
                label: "Ready",
                text: "text-white",
                border: "border-white/20",
                bg: "bg-white/[0.06]",
                dot: "bg-white",
            };

    const issues = result?.issues || [];
    const suggestions = result?.suggestions || [];

    const securityIssues = issues.filter(
        (issue) =>
            issue.category?.toLowerCase() === "security"
    ).length;

    const performanceIssues = issues.filter(
        (issue) =>
            issue.category?.toLowerCase() === "performance"
    ).length;

    const qualityIssues = issues.filter(
        (issue) =>
            issue.category?.toLowerCase() === "quality" ||
            issue.category?.toLowerCase() === "code quality"
    ).length;

    const bugIssues = issues.filter(
        (issue) =>
            issue.category?.toLowerCase() === "bug" ||
            issue.category?.toLowerCase() === "bugs"
    ).length;

    const score = Number(result?.score ?? 0);

    return (
        <div className="min-h-screen bg-[#020203] text-white overflow-hidden selection:bg-red-500/30">

            {/* =====================================================
                BACKGROUND
            ===================================================== */}

            <div className="fixed inset-0 pointer-events-none overflow-hidden">

                {PAGE_BACKGROUND_IMAGE && (
                    <div
                        className="absolute inset-0 bg-cover bg-center opacity-[0.45]"
                        style={{
                            backgroundImage: `url("${PAGE_BACKGROUND_IMAGE}")`,
                        }}
                    />
                )}

                <div className="absolute inset-0 bg-[#020203]/30" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(239,68,68,.18),transparent_34%)]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_0%_35%,rgba(244,63,94,.12),transparent_28%)]" />

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_100%_65%,rgba(249,115,22,.10),transparent_28%)]" />

                <div className="absolute -top-72 left-[12%] w-[700px] h-[700px] rounded-full bg-red-500/[0.11] blur-[180px] animate-[float-1_18s_ease-in-out_infinite]" />

                <div className="absolute top-[35%] -right-72 w-[700px] h-[700px] rounded-full bg-rose-500/[0.09] blur-[190px] animate-[float-2_22s_ease-in-out_infinite]" />

                <div className="absolute bottom-[-300px] left-[30%] w-[650px] h-[650px] rounded-full bg-orange-500/[0.07] blur-[190px]" />

                <div
                    className="absolute inset-0 opacity-[0.045]"
                    style={{
                        backgroundImage:
                            "linear-gradient(rgba(255,255,255,.8) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,.8) 1px, transparent 1px)",
                        backgroundSize: "70px 70px",
                    }}
                />

                <div className="absolute inset-0 bg-[linear-gradient(to_bottom,transparent_0%,rgba(0,0,0,.2)_50%,rgba(0,0,0,.7)_100%)]" />
            </div>

            {/* =====================================================
                FULLSCREEN
            ===================================================== */}

            {fullscreen && (
                <div
                    className="fixed inset-0 z-40 bg-black/80 backdrop-blur-xl"
                    onClick={() => setFullscreen(false)}
                />
            )}

            {/* =====================================================
                NAVBAR
            ===================================================== */}

            <div className="relative z-30">
                <Navbar />
            </div>

            {/* =====================================================
                MAIN
            ===================================================== */}

            <main className="relative z-10 max-w-[1580px] mx-auto px-5 sm:px-8 lg:px-12 pt-28 pb-24">

                {/* =================================================
                    HERO
                ================================================= */}

                <section className="max-w-5xl mx-auto text-center">

                    <Reveal>

                        <SectionLabel icon={Sparkles}>
                            AI-Powered Code Intelligence
                        </SectionLabel>

                    </Reveal>

                    <Reveal delay={100}>

                        <h1 className="mt-8 text-5xl sm:text-6xl lg:text-7xl xl:text-[82px] font-black tracking-[-0.055em] leading-[0.95] text-white">

                            Write better code.

                            <br />

                            <span className="relative inline-block mt-3">

                                <span className="absolute inset-0 blur-3xl bg-red-500/25" />

                                <span className="relative bg-gradient-to-r from-red-200 via-rose-200 to-orange-100 bg-clip-text text-transparent">
                                    Ship with confidence.
                                </span>

                            </span>

                        </h1>

                    </Reveal>

                    <Reveal delay={200}>

                        <p className="mt-8 max-w-2xl mx-auto text-base sm:text-lg leading-8 text-zinc-100">
                            CodePilot analyzes your code for{" "}
                            <span className="text-white font-bold">
                                bugs
                            </span>
                            ,{" "}
                            <span className="text-white font-bold">
                                security vulnerabilities
                            </span>
                            ,{" "}
                            <span className="text-white font-bold">
                                performance issues
                            </span>{" "}
                            and{" "}
                            <span className="text-white font-bold">
                                code quality
                            </span>
                            .
                        </p>

                    </Reveal>

                    <Reveal delay={300}>

                        <div className="mt-8 flex flex-wrap items-center justify-center gap-2.5">

                            {SUPPORTED_LANGUAGES.map((lang) => (

                                <span
                                    key={lang}
                                    className="rounded-full border border-white/20 bg-white/[0.07] px-4 py-2 text-[11px] font-mono text-white backdrop-blur-md shadow-[0_8px_30px_rgba(0,0,0,.2)] transition-all duration-300 hover:border-red-300/40 hover:bg-red-500/[0.12]"
                                >
                                    <span className="mr-2 text-red-300">
                                        ●
                                    </span>

                                    {lang}
                                </span>

                            ))}

                            <span className="text-xs text-zinc-300">
                                and more
                            </span>

                        </div>

                    </Reveal>

                    <Reveal delay={400}>

                        <div className="mt-10 inline-flex items-center rounded-2xl border border-white/[0.12] bg-black/30 backdrop-blur-xl px-2 py-2">

                            {[
                                ["4", "Analysis layers"],
                                ["AI", "Powered review"],
                                ["Instant", "Feedback"],
                            ].map(([value, label], index) => (

                                <div
                                    key={label}
                                    className="flex items-center"
                                >

                                    {index > 0 && (
                                        <div className="mx-4 h-8 w-px bg-gradient-to-b from-transparent via-white/20 to-transparent" />
                                    )}

                                    <div className="px-4 text-center">

                                        <p className="text-lg font-black text-white">
                                            {value}
                                        </p>

                                        <p className="mt-1 text-[9px] uppercase tracking-[0.15em] text-zinc-400">
                                            {label}
                                        </p>

                                    </div>

                                </div>

                            ))}

                        </div>

                    </Reveal>

                </section>

                {/* =================================================
                    WORKSPACE
                ================================================= */}

                <section
                    id="workspace"
                    className="relative mt-20 scroll-mt-24"
                >

                    <div className="absolute -inset-x-20 -top-20 -bottom-20 -z-10 rounded-[80px] bg-red-500/[0.06] blur-[120px]" />

                    <Reveal delay={150}>

                        <div
                            className={`
                                group relative
                                ${fullscreen
                                    ? "fixed inset-5 z-50 overflow-auto"
                                    : ""
                                }
                            `}
                        >

                            {/* Outer luminous frame */}

                            <div className="absolute -inset-[1px] rounded-[34px] bg-gradient-to-br from-red-400/30 via-white/[0.06] to-orange-400/20 opacity-90" />

                            <div className="relative overflow-hidden rounded-[33px] border border-white/[0.16] bg-[#070708]/95 backdrop-blur-2xl shadow-[0_40px_140px_rgba(0,0,0,.8),0_0_100px_rgba(239,68,68,.08)]">

                                <CornerBrackets />

                                {/* Top decorative line */}

                                <div className="absolute top-0 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-red-300/70 to-transparent" />

                                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[180px] h-[2px] bg-red-400 blur-md" />

                                {/* =================================================
                                    WORKSPACE HEADER
                                ================================================= */}

                                <div className="relative px-6 lg:px-8 py-6 border-b border-white/[0.10] bg-gradient-to-r from-red-500/[0.035] via-transparent to-orange-500/[0.025]">

                                    <div className="absolute inset-0 opacity-[0.025] bg-[linear-gradient(90deg,white_1px,transparent_1px)] bg-[length:50px_100%]" />

                                    <div className="relative flex flex-col xl:flex-row xl:items-center justify-between gap-6">

                                        <div className="flex items-center gap-4">

                                            <div className="relative">

                                                <div className="absolute inset-[-8px] rounded-2xl bg-red-500/20 blur-xl" />

                                                <div className="relative w-12 h-12 rounded-2xl border border-red-300/30 bg-gradient-to-br from-red-500/25 to-rose-500/[0.05] flex items-center justify-center shadow-[inset_0_1px_rgba(255,255,255,.15)]">

                                                    <Code2 className="w-5 h-5 text-red-200" />

                                                </div>

                                            </div>

                                            <div>

                                                <div className="flex items-center gap-3">

                                                    <h2 className="text-base font-bold text-white">
                                                        Code Review Workspace
                                                    </h2>

                                                    <span className="hidden sm:inline-flex items-center gap-1.5 rounded-full border border-emerald-300/25 bg-emerald-400/[0.08] px-2.5 py-1 text-[8px] uppercase tracking-wider font-mono text-emerald-200">

                                                        <CircleDot className="w-2.5 h-2.5" />

                                                        Online

                                                    </span>

                                                </div>

                                                <p className="text-xs text-zinc-300 mt-1.5">
                                                    Analyze your source code with CodePilot AI
                                                </p>

                                            </div>

                                        </div>

                                        <div className="flex flex-wrap items-center gap-2">

                                            {Object.keys(STARTER_SNIPPETS).map((lang) => (

                                                <button
                                                    key={lang}
                                                    onClick={() => loadPreset(lang)}
                                                    className={`
                                                        relative px-4 py-2.5 rounded-xl
                                                        border text-[10px] font-mono
                                                        capitalize font-medium
                                                        transition-all duration-300
                                                        active:scale-95
                                                        ${language === lang
                                                            ? "border-red-300/40 bg-red-500/[0.16] text-white shadow-[0_0_25px_rgba(239,68,68,.15)]"
                                                            : "border-white/[0.12] bg-white/[0.04] text-zinc-200 hover:text-white hover:border-red-300/25 hover:bg-white/[0.08]"
                                                        }
                                                    `}
                                                >
                                                    {language === lang && (
                                                        <span className="absolute inset-x-3 -bottom-px h-px bg-red-300 shadow-[0_0_12px_rgba(248,113,113,.9)]" />
                                                    )}

                                                    {lang}
                                                </button>

                                            ))}

                                        </div>

                                    </div>

                                </div>

                                {/* =================================================
                                    SOURCE
                                ================================================= */}

                                <div className="p-5 lg:p-8">

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-5">

                                        <div className="flex items-center gap-3">

                                            <div className="flex items-center gap-1.5">

                                                <span className="w-2 h-2 rounded-full bg-red-400 shadow-[0_0_10px_rgba(248,113,113,.9)]" />

                                                <span className="w-2 h-2 rounded-full bg-orange-300 shadow-[0_0_8px_rgba(253,186,116,.6)]" />

                                                <span className="w-2 h-2 rounded-full bg-yellow-300 shadow-[0_0_8px_rgba(253,224,71,.5)]" />

                                            </div>

                                            <div className="h-5 w-px bg-white/15" />

                                            <div>

                                                <p className="text-xs font-bold text-white">
                                                    Source Code
                                                </p>

                                                <p className="text-[9px] text-zinc-400 uppercase tracking-[0.15em] mt-1 font-mono">
                                                    main.{extension}
                                                </p>

                                            </div>

                                        </div>

                                        <LanguageSelector
                                            language={language}
                                            setLanguage={setLanguage}
                                        />

                                    </div>

                                    {/* EDITOR FRAME */}

                                    <div className="relative rounded-[24px] overflow-hidden border border-white/[0.16] bg-[#030304] shadow-[0_30px_90px_rgba(0,0,0,.65)]">

                                        <CornerBrackets />

                                        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-red-300/50 to-transparent" />

                                        <div className="h-12 px-4 flex items-center justify-between border-b border-white/[0.10] bg-gradient-to-r from-[#101010] to-[#080808]">

                                            <div className="flex items-center gap-3">

                                                <Terminal className="w-3.5 h-3.5 text-red-200" />

                                                <span className="text-[10px] font-mono text-white">
                                                    {language}
                                                </span>

                                                <span className="text-[9px] text-zinc-600">
                                                    •
                                                </span>

                                                <span className="text-[9px] font-mono text-zinc-400">
                                                    editable
                                                </span>

                                            </div>

                                            <div className="flex items-center gap-1">

                                                <button
                                                    onClick={handleCopy}
                                                    title="Copy code"
                                                    className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.09] transition-all"
                                                >
                                                    {copied ? (
                                                        <Check className="w-3.5 h-3.5 text-emerald-300" />
                                                    ) : (
                                                        <Copy className="w-3.5 h-3.5" />
                                                    )}
                                                </button>

                                                <button
                                                    onClick={() =>
                                                        setFullscreen(!fullscreen)
                                                    }
                                                    title={
                                                        fullscreen
                                                            ? "Exit fullscreen"
                                                            : "Fullscreen"
                                                    }
                                                    className="p-2 rounded-lg text-zinc-300 hover:text-white hover:bg-white/[0.09] transition-all"
                                                >
                                                    {fullscreen ? (
                                                        <Minimize2 className="w-3.5 h-3.5" />
                                                    ) : (
                                                        <Maximize2 className="w-3.5 h-3.5" />
                                                    )}
                                                </button>

                                                <button
                                                    onClick={handleClear}
                                                    title="Clear"
                                                    className="p-2 rounded-lg text-zinc-300 hover:text-red-200 hover:bg-red-500/[0.09] transition-all"
                                                >
                                                    <Trash2 className="w-3.5 h-3.5" />
                                                </button>

                                            </div>

                                        </div>

                                        <div className="min-h-[480px] p-2 bg-gradient-to-b from-[#080808] to-[#020202]">

                                            <CodeEditor
                                                code={code}
                                                setCode={setCode}
                                            />

                                        </div>

                                        <div className="flex items-center justify-between px-4 py-2.5 border-t border-white/[0.08] bg-[#080808]">

                                            <div className="flex items-center gap-4 text-[9px] font-mono text-zinc-400">

                                                <span>
                                                    {code.length} chars
                                                </span>

                                                <span>
                                                    {code
                                                        ? code.split("\n").length
                                                        : 0}{" "}
                                                    lines
                                                </span>

                                            </div>

                                            <span className="flex items-center gap-1.5 text-[9px] font-mono text-emerald-200">

                                                <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,.9)]" />

                                                Ready

                                            </span>

                                        </div>

                                    </div>

                                    {/* ACTION */}

                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-5 mt-5">

                                        <div className="flex items-center gap-2 text-xs text-zinc-200">

                                            <Activity className="w-4 h-4 text-red-200" />

                                            <span>
                                                AI analysis engine ready
                                            </span>

                                            <span className="hidden sm:inline text-zinc-600">
                                                •
                                            </span>

                                            <span className="hidden sm:inline text-zinc-400">
                                                Deep code inspection
                                            </span>

                                        </div>

                                        <ReviewButton
                                            onClick={analyzeCode}
                                            loading={loading}
                                        />

                                    </div>

                                </div>

                                {/* =================================================
                                    RESULTS
                                ================================================= */}

                                {(loading || result) && (

                                    <div className="relative border-t border-white/[0.12] bg-gradient-to-b from-[#090909] to-[#030303] px-5 lg:px-8 py-10">

                                        <div className="absolute top-0 left-[10%] right-[10%] h-px bg-gradient-to-r from-transparent via-red-300/60 to-transparent" />

                                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[220px] h-24 bg-red-500/[0.09] blur-3xl" />

                                        {/* HEADER */}

                                        <div className="relative flex flex-col lg:flex-row lg:items-center justify-between gap-5 mb-8">

                                            <div className="flex items-center gap-4">

                                                <div className="relative">

                                                    <div className="absolute inset-[-8px] rounded-2xl bg-red-500/20 blur-xl" />

                                                    <div className="relative w-12 h-12 rounded-2xl border border-red-300/30 bg-red-500/[0.11] flex items-center justify-center">

                                                        <ScanSearch className="w-5 h-5 text-red-200" />

                                                    </div>

                                                </div>

                                                <div>

                                                    <h2 className="text-xl font-black text-white">
                                                        Review Results
                                                    </h2>

                                                    <p className="text-xs text-zinc-300 mt-1.5">
                                                        AI-powered analysis of your source code
                                                    </p>

                                                </div>

                                            </div>

                                            <span
                                                className={`
                                                    self-start lg:self-auto
                                                    inline-flex items-center gap-2
                                                    text-[9px] font-mono uppercase
                                                    tracking-[0.16em]
                                                    px-4 py-2 rounded-full border
                                                    font-semibold
                                                    ${status.text}
                                                    ${status.border}
                                                    ${status.bg}
                                                `}
                                            >
                                                <span className={`w-1.5 h-1.5 rounded-full ${status.dot} ${loading ? "animate-pulse" : ""}`} />
                                                {status.label}
                                            </span>

                                        </div>

                                        {/* LOADING */}

                                        {loading && (

                                            <div className="relative min-h-[430px] rounded-[28px] border border-white/[0.13] bg-[#030303] overflow-hidden flex flex-col items-center justify-center text-center px-8 shadow-[0_30px_90px_rgba(0,0,0,.55)]">

                                                <CornerBrackets />

                                                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(239,68,68,.11),transparent_45%)]" />

                                                <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-red-400/50 to-transparent" />

                                                <div className="relative">

                                                    <div className="absolute inset-[-20px] rounded-[28px] border border-red-400/20 animate-[ping-slow_2s_ease-out_infinite]" />

                                                    <div className="absolute inset-[-8px] rounded-[24px] bg-red-500/10 blur-xl" />

                                                    <div className="relative w-20 h-20 rounded-[24px] border border-red-300/30 bg-gradient-to-br from-red-500/25 to-rose-500/[0.04] flex items-center justify-center shadow-[0_0_60px_rgba(239,68,68,.2)]">

                                                        <Sparkles className="w-8 h-8 text-red-200 animate-pulse" />

                                                    </div>

                                                </div>

                                                <h3 className="relative mt-8 text-base font-bold text-white">
                                                    Reviewing your code
                                                </h3>

                                                <p className="relative mt-2 min-h-[18px] text-xs font-mono text-red-200">
                                                    {ANALYSIS_PHASES[phaseIndex]}
                                                </p>

                                                <div className="relative mt-7 w-64 h-1.5 rounded-full bg-white/[0.08] overflow-hidden">

                                                    <div className="h-full w-1/3 rounded-full bg-gradient-to-r from-red-500 via-rose-400 to-orange-300 animate-[loadingBar_1.4s_ease-in-out_infinite] shadow-[0_0_15px_rgba(239,68,68,.8)]" />

                                                </div>

                                                <div className="relative mt-4 flex items-center gap-2 text-[9px] uppercase tracking-[0.18em] text-zinc-400 font-mono">

                                                    <span className="w-1 h-1 rounded-full bg-red-300 animate-pulse" />

                                                    CodePilot Intelligence Engine

                                                </div>

                                            </div>

                                        )}

                                        {/* ACTUAL RESULTS */}

                                        {!loading && result && (

                                            <div className="space-y-7">

                                                {/* =================================================
                                                    TOP CARDS
                                                ================================================= */}

                                                <div className="grid lg:grid-cols-[1.65fr_1fr] gap-6">

                                                    {/* REVIEWED CODE */}

                                                    <div className="group relative rounded-[28px] border border-white/[0.13] bg-[#050506] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,.4)]">

                                                        <CornerBrackets />

                                                        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent" />

                                                        <div className="flex items-center justify-between px-6 py-5 border-b border-white/[0.09] bg-gradient-to-r from-white/[0.04] to-transparent">

                                                            <div className="flex items-center gap-3">

                                                                <div className="w-9 h-9 rounded-xl bg-white/[0.06] border border-white/[0.10] flex items-center justify-center">

                                                                    <Code2 className="w-4 h-4 text-white" />

                                                                </div>

                                                                <div>

                                                                    <p className="text-sm font-bold text-white">
                                                                        Reviewed Code
                                                                    </p>

                                                                    <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 mt-1">
                                                                        Original source
                                                                    </p>

                                                                </div>

                                                            </div>

                                                            <span className="text-[9px] font-mono text-zinc-300 border border-white/[0.10] rounded-lg px-2.5 py-1.5 bg-white/[0.035]">
                                                                main.{extension}
                                                            </span>

                                                        </div>

                                                        <div className="p-5">

                                                            <div className="rounded-2xl border border-white/[0.09] bg-[#080808] overflow-hidden">

                                                                <div className="max-h-[370px] overflow-auto p-5">

                                                                    <pre className="text-[12px] leading-6 font-mono text-zinc-100 whitespace-pre-wrap break-words">
                                                                        {code}
                                                                    </pre>

                                                                </div>

                                                            </div>

                                                        </div>

                                                    </div>

                                                    {/* SUMMARY */}

                                                    <div className="relative rounded-[28px] border border-white/[0.13] bg-[#050506] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,.4)]">

                                                        <CornerBrackets />

                                                        <div className="absolute top-0 right-0 w-52 h-52 bg-red-500/[0.10] blur-[90px]" />

                                                        <div className="relative px-6 py-5 border-b border-white/[0.09]">

                                                            <div className="flex items-center justify-between">

                                                                <div>

                                                                    <p className="text-sm font-bold text-white">
                                                                        Review Summary
                                                                    </p>

                                                                    <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 mt-1">
                                                                        Findings overview
                                                                    </p>

                                                                </div>

                                                                <Sparkles className="w-4 h-4 text-red-200" />

                                                            </div>

                                                        </div>

                                                        <div className="relative p-6">

                                                            {/* SCORE */}

                                                            <div className="flex items-center gap-5">

                                                                <div
                                                                    className="relative w-24 h-24 rounded-full flex items-center justify-center"
                                                                    style={{
                                                                        background: `conic-gradient(#fb7185 ${score * 3.6}deg, rgba(255,255,255,.08) 0deg)`,
                                                                    }}
                                                                >

                                                                    <div className="absolute inset-[6px] rounded-full bg-[#080808] border border-white/[0.06] flex flex-col items-center justify-center">

                                                                        <span className="text-2xl font-black text-white">
                                                                            {score}
                                                                        </span>

                                                                        <span className="text-[8px] uppercase tracking-wider text-zinc-400">
                                                                            score
                                                                        </span>

                                                                    </div>

                                                                </div>

                                                                <div>

                                                                    <p className="text-xs text-zinc-400">
                                                                        Overall code quality
                                                                    </p>

                                                                    <p className="mt-1 text-sm font-bold text-white">
                                                                        {score >= 80
                                                                            ? "Strong code"
                                                                            : score >= 60
                                                                                ? "Needs improvement"
                                                                                : "Attention required"}
                                                                    </p>

                                                                    <div className="mt-3 h-1.5 w-32 rounded-full bg-white/[0.08] overflow-hidden">

                                                                        <div
                                                                            className="h-full rounded-full bg-gradient-to-r from-red-500 via-rose-400 to-orange-300"
                                                                            style={{
                                                                                width: `${Math.min(score, 100)}%`,
                                                                            }}
                                                                        />

                                                                    </div>

                                                                </div>

                                                            </div>

                                                            {/* COUNTS */}

                                                            <div className="grid grid-cols-2 gap-2.5 mt-7">

                                                                {[
                                                                    {
                                                                        label: "Issues",
                                                                        value: issues.length,
                                                                        color: "text-white",
                                                                    },
                                                                    {
                                                                        label: "Security",
                                                                        value: securityIssues,
                                                                        color: "text-red-200",
                                                                    },
                                                                    {
                                                                        label: "Performance",
                                                                        value: performanceIssues,
                                                                        color: "text-orange-200",
                                                                    },
                                                                    {
                                                                        label: "Quality",
                                                                        value: qualityIssues,
                                                                        color: "text-yellow-200",
                                                                    },
                                                                ].map((item) => (

                                                                    <div
                                                                        key={item.label}
                                                                        className="rounded-xl border border-white/[0.08] bg-white/[0.035] px-3.5 py-3"
                                                                    >

                                                                        <p className="text-[9px] uppercase tracking-wider text-zinc-400">
                                                                            {item.label}
                                                                        </p>

                                                                        <p className={`mt-1 text-lg font-bold ${item.color}`}>
                                                                            {item.value}
                                                                        </p>

                                                                    </div>

                                                                ))}

                                                            </div>

                                                            <div className="mt-6 pt-5 border-t border-white/[0.08]">

                                                                <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-500 mb-2.5">
                                                                    AI Summary
                                                                </p>

                                                                <p className="text-xs leading-6 text-zinc-100">
                                                                    {result.summary || "No summary available."}
                                                                </p>

                                                            </div>

                                                        </div>

                                                    </div>

                                                </div>

                                                {/* =================================================
                                                    ISSUE OVERVIEW
                                                ================================================= */}

                                                {issues.length > 0 && (

                                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">

                                                        {[
                                                            {
                                                                icon: Bug,
                                                                label: "Bugs",
                                                                value: bugIssues,
                                                                color: "text-red-200",
                                                                bg: "bg-red-500/[0.08]",
                                                                border: "border-red-300/20",
                                                            },
                                                            {
                                                                icon: ShieldCheck,
                                                                label: "Security",
                                                                value: securityIssues,
                                                                color: "text-orange-200",
                                                                bg: "bg-orange-500/[0.08]",
                                                                border: "border-orange-300/20",
                                                            },
                                                            {
                                                                icon: Gauge,
                                                                label: "Performance",
                                                                value: performanceIssues,
                                                                color: "text-yellow-200",
                                                                bg: "bg-yellow-500/[0.08]",
                                                                border: "border-yellow-300/20",
                                                            },
                                                            {
                                                                icon: Zap,
                                                                label: "Quality",
                                                                value: qualityIssues,
                                                                color: "text-rose-200",
                                                                bg: "bg-rose-500/[0.08]",
                                                                border: "border-rose-300/20",
                                                            },
                                                        ].map((item) => {

                                                            const Icon = item.icon;

                                                            return (
                                                                <div
                                                                    key={item.label}
                                                                    className={`relative overflow-hidden rounded-2xl border ${item.border} ${item.bg} px-4 py-4 backdrop-blur-xl`}
                                                                >

                                                                    <div className="absolute right-0 top-0 w-16 h-16 bg-white/[0.03] blur-xl" />

                                                                    <div className="relative flex items-center justify-between">

                                                                        <Icon className={`w-4 h-4 ${item.color}`} />

                                                                        <span className={`text-xl font-black ${item.color}`}>
                                                                            {item.value}
                                                                        </span>

                                                                    </div>

                                                                    <p className="relative mt-2 text-[10px] uppercase tracking-wider text-zinc-200">
                                                                        {item.label}
                                                                    </p>

                                                                </div>
                                                            );
                                                        })}

                                                    </div>

                                                )}

                                                {/* =================================================
                                                    ISSUES
                                                ================================================= */}

                                                {issues.length > 0 && (

                                                    <div className="relative rounded-[28px] border border-white/[0.13] bg-[#050506] overflow-hidden shadow-[0_25px_80px_rgba(0,0,0,.35)]">

                                                        <CornerBrackets />

                                                        <div className="px-6 py-5 border-b border-white/[0.09] bg-gradient-to-r from-red-500/[0.05] to-transparent">

                                                            <div className="flex items-center justify-between">

                                                                <div>

                                                                    <p className="text-sm font-bold text-white">
                                                                        Issues Found
                                                                    </p>

                                                                    <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 mt-1">
                                                                        Problems detected by AI
                                                                    </p>

                                                                </div>

                                                                <span className="rounded-full border border-red-300/25 bg-red-500/[0.08] px-3 py-1.5 text-[9px] font-mono text-red-100">
                                                                    {issues.length} detected
                                                                </span>

                                                            </div>

                                                        </div>

                                                        <div className="p-5 space-y-3">

                                                            {issues.map((issue, index) => (

                                                                <div
                                                                    key={index}
                                                                    className="group relative rounded-2xl border border-white/[0.08] bg-white/[0.025] p-5 transition-all duration-300 hover:border-red-300/25 hover:bg-white/[0.045]"
                                                                >

                                                                    <div className="absolute left-0 top-4 bottom-4 w-px bg-gradient-to-b from-red-400/70 via-red-400/20 to-transparent opacity-70" />

                                                                    <div className="flex gap-4">

                                                                        <div className="flex-none w-8 h-8 rounded-xl border border-red-300/20 bg-red-500/[0.08] flex items-center justify-center text-xs font-bold text-red-200">
                                                                            {String(index + 1).padStart(2, "0")}
                                                                        </div>

                                                                        <div className="min-w-0 flex-1">

                                                                            <div className="flex flex-wrap items-center gap-2">

                                                                                <span className="text-sm font-bold text-white">
                                                                                    {issue.title}
                                                                                </span>

                                                                                {issue.category && (
                                                                                    <span className="text-[8px] uppercase tracking-wider px-2 py-1 rounded-full border border-red-300/20 bg-red-500/[0.06] text-red-100">
                                                                                        {issue.category}
                                                                                    </span>
                                                                                )}

                                                                                {issue.severity && (
                                                                                    <span className="text-[8px] uppercase tracking-wider px-2 py-1 rounded-full border border-orange-300/20 bg-orange-500/[0.05] text-orange-100">
                                                                                        {issue.severity}
                                                                                    </span>
                                                                                )}

                                                                            </div>

                                                                            {issue.description && (
                                                                                <p className="mt-3 text-xs leading-6 text-zinc-200">
                                                                                    {issue.description}
                                                                                </p>
                                                                            )}

                                                                            {issue.line && (
                                                                                <div className="mt-3 inline-flex items-center gap-2 text-[9px] font-mono text-zinc-300 bg-black/40 border border-white/[0.07] rounded-lg px-2.5 py-1.5">
                                                                                    <Code2 className="w-3 h-3" />
                                                                                    Line {issue.line}
                                                                                </div>
                                                                            )}

                                                                        </div>

                                                                    </div>

                                                                </div>

                                                            ))}

                                                        </div>

                                                    </div>

                                                )}

                                                {/* =================================================
                                                    SUGGESTIONS
                                                ================================================= */}

                                                {suggestions.length > 0 && (

                                                    <div className="relative rounded-[28px] border border-white/[0.13] bg-[#050506] overflow-hidden">

                                                        <CornerBrackets />

                                                        <div className="px-6 py-5 border-b border-white/[0.09] bg-gradient-to-r from-emerald-500/[0.04] to-transparent">

                                                            <p className="text-sm font-bold text-white">
                                                                AI Suggestions
                                                            </p>

                                                            <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 mt-1">
                                                                Recommended improvements
                                                            </p>

                                                        </div>

                                                        <div className="p-5 grid md:grid-cols-2 gap-3">

                                                            {suggestions.map((suggestion, index) => (

                                                                <div
                                                                    key={index}
                                                                    className="flex gap-3 rounded-2xl border border-white/[0.08] bg-white/[0.025] p-4 hover:border-emerald-300/25 hover:bg-emerald-400/[0.03] transition-all"
                                                                >

                                                                    <span className="flex-none w-7 h-7 rounded-lg bg-emerald-500/[0.08] border border-emerald-300/20 flex items-center justify-center text-[9px] font-bold text-emerald-200">
                                                                        {index + 1}
                                                                    </span>

                                                                    <span className="text-xs leading-6 text-zinc-100">
                                                                        {suggestion}
                                                                    </span>

                                                                </div>

                                                            ))}

                                                        </div>

                                                    </div>

                                                )}

                                                {/* =================================================
                                                    UPDATED CODE
                                                ================================================= */}

                                                <div className="relative rounded-[28px] border border-emerald-300/25 bg-[#050706] overflow-hidden shadow-[0_25px_90px_rgba(16,185,129,.07)]">

                                                    <CornerBrackets />

                                                    <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-emerald-300/70 to-transparent" />

                                                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 px-6 py-5 border-b border-emerald-300/10 bg-gradient-to-r from-emerald-500/[0.07] via-transparent to-transparent">

                                                        <div className="flex items-center gap-3">

                                                            <div className="w-10 h-10 rounded-xl border border-emerald-300/25 bg-emerald-400/[0.08] flex items-center justify-center">

                                                                <WandSparkles className="w-5 h-5 text-emerald-200" />

                                                            </div>

                                                            <div>

                                                                <p className="text-sm font-bold text-white">
                                                                    Updated Code
                                                                </p>

                                                                <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 mt-1">
                                                                    AI suggested improved version
                                                                </p>

                                                            </div>

                                                        </div>

                                                        <span className="inline-flex items-center gap-2 text-[9px] font-mono uppercase tracking-wider text-emerald-100 border border-emerald-300/25 bg-emerald-400/[0.08] px-3 py-1.5 rounded-full">

                                                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_8px_rgba(110,231,183,.9)]" />

                                                            Improved

                                                        </span>

                                                    </div>

                                                    <div className="p-5">

                                                        <ImprovedCode
                                                            code={result.improved_code || ""}
                                                            language={language}
                                                        />

                                                    </div>

                                                </div>

                                                {/* =================================================
                                                    AI CHAT
                                                ================================================= */}

                                                <div className="relative rounded-[28px] border border-red-300/20 bg-[#050506] overflow-hidden shadow-[0_25px_90px_rgba(239,68,68,.07)]">

                                                    <CornerBrackets />

                                                    <div className="absolute top-0 right-0 w-72 h-40 bg-red-500/[0.08] blur-[80px]" />

                                                    <div className="relative px-6 py-5 border-b border-white/[0.09] flex items-center justify-between">

                                                        <div className="flex items-center gap-3">

                                                            <div className="relative">

                                                                <div className="absolute inset-0 rounded-xl bg-red-500/30 blur-lg" />

                                                                <div className="relative w-10 h-10 rounded-xl border border-red-300/25 bg-red-500/[0.08] flex items-center justify-center">

                                                                    <Sparkles className="w-5 h-5 text-red-200" />

                                                                </div>

                                                            </div>

                                                            <div>

                                                                <p className="text-sm font-bold text-white">
                                                                    AI Assistant
                                                                </p>

                                                                <p className="text-[9px] uppercase tracking-[0.15em] text-zinc-400 mt-1">
                                                                    Ask anything about your code
                                                                </p>

                                                            </div>

                                                        </div>

                                                        <span className="hidden sm:inline-flex items-center gap-2 text-[9px] font-mono text-red-100 border border-red-300/15 bg-red-500/[0.05] rounded-full px-3 py-1.5">

                                                            <Sparkles className="w-3 h-3" />

                                                            CodePilot AI

                                                        </span>

                                                    </div>

                                                    <div className="relative p-5">

                                                        <AIChat
                                                            language={language}
                                                            originalCode={code}
                                                            improvedCode={result?.improved_code || ""}
                                                        />

                                                    </div>

                                                </div>

                                            </div>

                                        )}

                                    </div>

                                )}

                                {/* STATUS */}

                                <div className="px-6 lg:px-8 py-3.5 border-t border-white/[0.08] bg-[#040404] flex items-center justify-between">

                                    <span className="flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.15em] text-zinc-400">

                                        <span className="w-1.5 h-1.5 rounded-full bg-red-300 shadow-[0_0_8px_rgba(248,113,113,.8)]" />

                                        CodePilot AI Engine

                                    </span>

                                    <span
                                        className={`flex items-center gap-2 text-[9px] font-mono uppercase tracking-[0.15em] ${status.text}`}
                                    >

                                        <span
                                            className={`w-1.5 h-1.5 rounded-full ${status.dot} ${loading ? "animate-pulse" : ""}`}
                                        />

                                        {status.label}

                                    </span>

                                </div>

                            </div>

                        </div>

                    </Reveal>

                </section>

                {/* =================================================
                    CAPABILITIES
                ================================================= */}

                <section className="mt-28">

                    <Reveal>

                        <div className="text-center mb-10">

                            <SectionLabel icon={ScanSearch}>
                                What CodePilot checks
                            </SectionLabel>

                            <h2 className="mt-5 text-3xl sm:text-4xl font-black tracking-tight text-white">

                                One review.

                                <span className="text-zinc-400">
                                    {" "}Four layers of intelligence.
                                </span>

                            </h2>

                            <p className="mt-4 max-w-xl mx-auto text-sm leading-6 text-zinc-300">
                                Go beyond basic linting with an AI-powered review focused on the things that actually matter.
                            </p>

                        </div>

                    </Reveal>

                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">

                        {CAPABILITIES.map((item, index) => {

                            const Icon = item.icon;

                            return (

                                <Reveal
                                    key={item.title}
                                    delay={index * 100}
                                >

                                    <div className="group relative h-full overflow-hidden rounded-[26px] border border-red-300/20 bg-[#050506] transition-all duration-500 hover:-translate-y-2 hover:border-red-300/40 hover:shadow-[0_25px_70px_rgba(239,68,68,.12)]">

                                        <CornerBrackets />

                                        <div className="absolute -top-20 -right-20 w-40 h-40 rounded-full bg-red-500/[0.08] blur-3xl group-hover:bg-red-500/[0.15] transition-all duration-500" />

                                        <div className="relative p-6">

                                            <div className="flex items-center justify-between">

                                                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-red-400 to-rose-700 border border-red-200/20 shadow-[0_10px_30px_rgba(239,68,68,.25)] flex items-center justify-center group-hover:scale-105 transition-transform duration-300">

                                                    <Icon className="w-5 h-5 text-white" />

                                                </div>

                                                <span className="text-[10px] font-mono text-zinc-500">
                                                    /{item.number}
                                                </span>

                                            </div>

                                            <p className="mt-7 text-[9px] uppercase tracking-[0.18em] text-red-200 font-mono">
                                                Analysis layer
                                            </p>

                                            <h3 className="mt-2 text-base font-bold text-white">
                                                {item.title}
                                            </h3>

                                            <p className="mt-3 text-xs leading-6 text-zinc-300">
                                                {item.text}
                                            </p>

                                            <div className="mt-6 flex items-center gap-2 text-[9px] uppercase tracking-wider text-zinc-400 group-hover:text-red-200 transition-colors">

                                                Explore analysis

                                                <ArrowRight className="w-3 h-3 group-hover:translate-x-1 transition-transform" />

                                            </div>

                                        </div>

                                    </div>

                                </Reveal>

                            );
                        })}

                    </div>

                </section>

                {/* =================================================
                    CTA
                ================================================= */}

                <Reveal>

                    <section className="mt-28 max-w-4xl mx-auto">

                        <div className="relative overflow-hidden rounded-[30px] border border-red-300/25 bg-gradient-to-br from-red-500/[0.12] via-white/[0.035] to-orange-500/[0.08] px-7 sm:px-10 py-10 shadow-[0_30px_100px_rgba(239,68,68,.10)]">

                            <CornerBrackets />

                            <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-80 h-80 rounded-full bg-red-500/[0.12] blur-[100px]" />

                            <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-7">

                                <div>

                                    <div className="flex items-center gap-2 text-red-200">

                                        <Sparkles className="w-4 h-4" />

                                        <span className="text-[10px] uppercase tracking-[0.2em] font-mono font-semibold">
                                            Keep building
                                        </span>

                                    </div>

                                    <h3 className="mt-3 text-2xl font-black text-white">
                                        Ready for another review?
                                    </h3>

                                    <p className="mt-2 text-sm text-zinc-300">
                                        Paste another snippet and let CodePilot find what you missed.
                                    </p>

                                </div>

                                <a
                                    href="#workspace"
                                    className="group flex-none inline-flex items-center justify-center gap-2 rounded-xl border border-red-300/35 bg-red-500/15 px-5 py-3 text-xs font-semibold text-white hover:bg-red-500/25 hover:border-red-200/50 transition-all duration-300 shadow-[0_10px_35px_rgba(239,68,68,.15)]"
                                >

                                    Try another snippet

                                    <ArrowRight className="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />

                                </a>

                            </div>

                        </div>

                    </section>

                </Reveal>

            </main>

            {/* =====================================================
                FOOTER
            ===================================================== */}

            <div className="relative z-10">
                <Footer />
            </div>

            {/* =====================================================
                ANIMATIONS
            ===================================================== */}

            <style>{`

                @keyframes float-1 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }

                    50% {
                        transform: translate(-25px, 28px) scale(1.06);
                    }
                }

                @keyframes float-2 {
                    0%, 100% {
                        transform: translate(0, 0) scale(1);
                    }

                    50% {
                        transform: translate(25px, -25px) scale(1.07);
                    }
                }

                @keyframes ping-slow {
                    0% {
                        transform: scale(1);
                        opacity: .55;
                    }

                    100% {
                        transform: scale(1.4);
                        opacity: 0;
                    }
                }

                @keyframes loadingBar {
                    0% {
                        transform: translateX(-110%);
                    }

                    50% {
                        transform: translateX(60%);
                    }

                    100% {
                        transform: translateX(230%);
                    }
                }

                @media (prefers-reduced-motion: reduce) {
                    *,
                    *::before,
                    *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                        transition-duration: 0.01ms !important;
                    }
                }

            `}</style>

        </div>
    );
}