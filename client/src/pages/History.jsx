
import { useEffect, useMemo, useState } from "react";
import api from "../api/axios";
import HistoryCard from "../components/history/HistoryCard";

import Navbar from "../components/layout/Navbar";
import Footer from "../components/layout/Footer";

import {
    Search,
    Filter,
    SlidersHorizontal,
    Clock3,
    FileCode2,
    Sparkles,
    ChevronDown,
    RefreshCw,
    X,
    History as HistoryIcon,
} from "lucide-react";

export default function History() {
    const [reviews, setReviews] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState("");
    const [language, setLanguage] = useState("all");
    const [sortBy, setSortBy] = useState("newest");

    /* =====================================================
       FETCH HISTORY
    ====================================================== */

    const fetchHistory = async () => {
        try {
            setLoading(true);

            const response = await api.get("/review/history");
            setReviews(response.data || []);
        } catch (err) {
            console.log(err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchHistory();
    }, []);

    /* =====================================================
       LANGUAGES
    ====================================================== */

    const languages = useMemo(() => {
        const values = reviews
            .map((review) => review.language)
            .filter(Boolean);

        return ["all", ...new Set(values)];
    }, [reviews]);

    /* =====================================================
       FILTER + SORT
    ====================================================== */

    const filteredReviews = useMemo(() => {
        let result = [...reviews];

        if (search.trim()) {
            const query = search.toLowerCase();

            result = result.filter((review) => {
                return (
                    review.language?.toLowerCase().includes(query) ||
                    review.code?.toLowerCase().includes(query) ||
                    review.summary?.toLowerCase().includes(query) ||
                    review._id?.toLowerCase().includes(query)
                );
            });
        }

        if (language !== "all") {
            result = result.filter(
                (review) => review.language === language
            );
        }

        result.sort((a, b) => {
            const dateA = new Date(
                a.created_at || a.createdAt || 0
            ).getTime();

            const dateB = new Date(
                b.created_at || b.createdAt || 0
            ).getTime();

            return sortBy === "newest"
                ? dateB - dateA
                : dateA - dateB;
        });

        return result;
    }, [reviews, search, language, sortBy]);

    /* =====================================================
       CLEAR FILTERS
    ====================================================== */

    const clearFilters = () => {
        setSearch("");
        setLanguage("all");
        setSortBy("newest");
    };

    const hasFilters =
        search.trim() !== "" ||
        language !== "all" ||
        sortBy !== "newest";

    /* =====================================================
       PAGE
    ====================================================== */

    return (
        <div className="min-h-screen bg-[#070709] text-white">

            {/* =================================================
                GLOBAL BACKGROUND
            ================================================= */}

            <div className="fixed inset-0 z-0 pointer-events-none">

                <img
                    src="/images/codepilot-bg1.png"
                    alt=""
                    className="absolute inset-0 h-full w-full object-cover"
                />

                {/* Dark overlay */}

                <div className="absolute inset-0 bg-black/52" />

                {/* Red atmosphere */}

                <div className="absolute inset-0 bg-red-950/20" />

                {/* Center red glow */}

                <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(220,38,38,0.08),transparent_45%)]" />

            </div>


            {/* =================================================
                PAGE CONTENT
            ================================================= */}

            <div className="relative z-10">

                <Navbar />


                {/* =================================================
                    MAIN
                ================================================= */}

                <main className="relative mx-auto max-w-7xl px-5 pb-20 pt-24 sm:px-8 lg:px-10">

                    {/* =================================================
                        HEADER
                    ================================================= */}

                    <section className="mb-10">

                        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">

                            <div>

                                {/* Badge */}

                                <div className="mb-4 inline-flex items-center gap-2 rounded-full border border-red-500/20 bg-red-500/[0.06] px-4 py-2 font-mono text-[11px] tracking-[0.15em] text-red-400 shadow-[0_0_30px_rgba(239,68,68,0.08)] backdrop-blur-xl">

                                    <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />

                                    <HistoryIcon size={13} />

                                    REVIEW ARCHIVE

                                </div>


                                {/* Heading */}

                                <h1 className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl">

                                    <span className="text-white">
                                        Review
                                    </span>{" "}

                                    <span className="text-red-500 drop-shadow-[0_0_25px_rgba(239,68,68,0.45)]">
                                        History
                                    </span>

                                </h1>


                                <p className="mt-4 max-w-2xl text-sm leading-7 text-zinc-400 sm:text-base">

                                    Browse, search and revisit your previous
                                    AI-powered code reviews.

                                </p>

                            </div>


                            {/* Refresh */}

                            <button
                                onClick={fetchHistory}
                                disabled={loading}
                                className="
                                    group inline-flex w-fit items-center gap-2
                                    rounded-xl
                                    border border-red-500/20
                                    bg-black
                                    px-5 py-3
                                    text-sm font-medium
                                    text-zinc-300
                                    shadow-[0_0_30px_rgba(220,38,38,0.05)]
                                    transition-all duration-300
                                    hover:-translate-y-0.5
                                    hover:border-red-500/50
                                    hover:bg-red-500/[0.05]
                                    hover:text-red-300
                                    hover:shadow-[0_0_35px_rgba(220,38,38,0.12)]
                                    disabled:cursor-not-allowed
                                    disabled:opacity-50
                                "
                            >

                                <RefreshCw
                                    size={16}
                                    className={
                                        loading
                                            ? "animate-spin"
                                            : "transition-transform duration-500 group-hover:rotate-180"
                                    }
                                />

                                Refresh

                            </button>

                        </div>

                    </section>


                    {/* =================================================
                        STATS
                    ================================================= */}

                    <section className="mb-10 grid grid-cols-1 gap-5 sm:grid-cols-3">

                        {[
                            {
                                label: "Total Reviews",
                                value: reviews.length,
                                icon: FileCode2,
                            },
                            {
                                label: "Languages Used",
                                value: Math.max(languages.length - 1, 0),
                                icon: Sparkles,
                            },
                            {
                                label: "Currently Showing",
                                value: filteredReviews.length,
                                icon: Clock3,
                            },
                        ].map((stat, index) => {

                            const Icon = stat.icon;

                            return (
                                <div
                                    key={stat.label}
                                    className="group relative"
                                >

                                    {/* Outer glow */}

                                    <div className="absolute -inset-3 rounded-[28px] bg-red-600/15 blur-2xl opacity-100 transition duration-500 group-hover:bg-red-600/25" />

                                    {/* Card */}

                                    <div
                                        className="
                                            relative overflow-hidden
                                            rounded-3xl
                                            border border-red-500/20
                                            bg-black
                                            p-6
                                            shadow-[0_25px_70px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.06)]
                                            transition-all duration-500
                                            group-hover:-translate-y-1
                                            group-hover:border-red-500/40
                                            group-hover:shadow-[0_30px_80px_rgba(0,0,0,0.8),0_0_40px_rgba(220,38,38,0.14)]
                                        "
                                    >

                                        {/* Top red line */}

                                        <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.7)]" />

                                        {/* Corner glow */}

                                        <div className="absolute -right-16 -top-16 h-40 w-40 rounded-full bg-red-600/10 blur-3xl" />


                                        <div className="relative flex items-center justify-between">

                                            <div>

                                                <p className="font-mono text-xs tracking-[0.12em] text-zinc-500">
                                                    {stat.label.toUpperCase()}
                                                </p>

                                                <p className="mt-3 text-3xl font-bold text-white">
                                                    {stat.value}
                                                </p>

                                            </div>


                                            <div
                                                className="
                                                    flex h-12 w-12 items-center justify-center
                                                    rounded-2xl
                                                    border border-red-500/30
                                                    bg-red-500/10
                                                    text-red-400
                                                    shadow-[0_0_25px_rgba(239,68,68,0.10)]
                                                    transition-all duration-500
                                                    group-hover:scale-110
                                                    group-hover:border-red-500/60
                                                    group-hover:bg-red-500/15
                                                    group-hover:shadow-[0_0_35px_rgba(239,68,68,0.25)]
                                                "
                                            >
                                                <Icon size={20} />
                                            </div>

                                        </div>


                                        {/* Bottom line */}

                                        <div className="absolute bottom-0 left-8 right-8 h-px bg-gradient-to-r from-transparent via-red-500/30 to-transparent" />

                                    </div>

                                </div>
                            );
                        })}

                    </section>


                    {/* =================================================
                        SEARCH + FILTERS
                    ================================================= */}

                    <section className="relative mb-10">

                        {/* Outer glow */}

                        <div className="absolute -inset-3 rounded-[30px] bg-red-600/10 blur-2xl" />


                        <div
                            className="
                                relative overflow-hidden
                                rounded-3xl
                                border border-red-500/20
                                bg-black
                                p-5
                                shadow-[0_25px_80px_rgba(0,0,0,0.7),0_0_35px_rgba(220,38,38,0.06)]
                            "
                        >

                            {/* Top line */}

                            <div className="absolute left-8 right-8 top-0 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.5)]" />


                            <div className="flex flex-col gap-3 lg:flex-row">

                                {/* Search */}

                                <div className="relative flex-1">

                                    <Search
                                        size={18}
                                        className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600"
                                    />

                                    <input
                                        type="text"
                                        value={search}
                                        onChange={(e) =>
                                            setSearch(e.target.value)
                                        }
                                        placeholder="Search reviews, languages or code..."
                                        className="
                                            h-12 w-full rounded-xl
                                            border border-red-500/15
                                            bg-[#08080b]
                                            pl-11 pr-10
                                            text-sm text-white
                                            outline-none
                                            transition-all duration-300
                                            placeholder:text-zinc-600
                                            focus:border-red-500/50
                                            focus:bg-red-500/[0.025]
                                            focus:ring-2
                                            focus:ring-red-500/10
                                        "
                                    />

                                    {search && (
                                        <button
                                            onClick={() => setSearch("")}
                                            className="
                                                absolute right-3 top-1/2
                                                -translate-y-1/2
                                                rounded-lg p-1.5
                                                text-zinc-600
                                                transition
                                                hover:bg-red-500/10
                                                hover:text-red-400
                                            "
                                        >
                                            <X size={15} />
                                        </button>
                                    )}

                                </div>


                                {/* Language */}

                                <div className="relative">

                                    <select
                                        value={language}
                                        onChange={(e) =>
                                            setLanguage(e.target.value)
                                        }
                                        className="
                                            h-12 min-w-[170px]
                                            appearance-none
                                            rounded-xl
                                            border border-red-500/15
                                            bg-[#08080b]
                                            px-4 pr-10
                                            text-sm text-zinc-300
                                            outline-none
                                            transition-all duration-300
                                            focus:border-red-500/50
                                            focus:ring-2
                                            focus:ring-red-500/10
                                        "
                                    >

                                        {languages.map((lang) => (
                                            <option
                                                key={lang}
                                                value={lang}
                                                className="bg-black"
                                            >
                                                {lang === "all"
                                                    ? "All Languages"
                                                    : lang}
                                            </option>
                                        ))}

                                    </select>

                                    <ChevronDown
                                        size={16}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
                                    />

                                </div>


                                {/* Sort */}

                                <div className="relative">

                                    <select
                                        value={sortBy}
                                        onChange={(e) =>
                                            setSortBy(e.target.value)
                                        }
                                        className="
                                            h-12 min-w-[170px]
                                            appearance-none
                                            rounded-xl
                                            border border-red-500/15
                                            bg-[#08080b]
                                            px-4 pr-10
                                            text-sm text-zinc-300
                                            outline-none
                                            transition-all duration-300
                                            focus:border-red-500/50
                                            focus:ring-2
                                            focus:ring-red-500/10
                                        "
                                    >

                                        <option
                                            value="newest"
                                            className="bg-black"
                                        >
                                            Newest First
                                        </option>

                                        <option
                                            value="oldest"
                                            className="bg-black"
                                        >
                                            Oldest First
                                        </option>

                                    </select>

                                    <SlidersHorizontal
                                        size={16}
                                        className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-zinc-600"
                                    />

                                </div>

                            </div>


                            {/* Active filters */}

                            {hasFilters && (
                                <div className="mt-4 flex items-center justify-between border-t border-red-500/10 pt-4">

                                    <div className="flex items-center gap-2 font-mono text-[11px] tracking-wide text-zinc-500">

                                        <Filter size={14} />

                                        FILTERS ACTIVE

                                    </div>

                                    <button
                                        onClick={clearFilters}
                                        className="font-mono text-[11px] tracking-wide text-red-400 transition hover:text-red-300"
                                    >
                                        CLEAR FILTERS
                                    </button>

                                </div>
                            )}

                        </div>

                    </section>


                    {/* =================================================
                        REVIEWS
                    ================================================= */}

                    {loading ? (

                        /* =================================================
                           LOADING
                        ================================================= */

                        <div className="grid gap-5">

                            {[1, 2, 3].map((item) => (

                                <div
                                    key={item}
                                    className="
                                        relative overflow-hidden
                                        rounded-3xl
                                        border border-red-500/15
                                        bg-black
                                        p-6
                                        shadow-[0_25px_70px_rgba(0,0,0,0.65)]
                                    "
                                >

                                    <div className="absolute left-0 right-0 top-0 h-[2px] bg-gradient-to-r from-transparent via-red-500/50 to-transparent" />

                                    <div className="animate-pulse">

                                        <div className="h-5 w-1/4 rounded bg-zinc-800" />

                                        <div className="mt-4 h-4 w-3/4 rounded bg-zinc-900" />

                                        <div className="mt-3 h-4 w-1/2 rounded bg-zinc-900" />

                                        <div className="mt-6 h-24 rounded-2xl bg-zinc-900" />

                                    </div>

                                </div>

                            ))}

                        </div>

                    ) : filteredReviews.length === 0 ? (

                        /* =================================================
                           EMPTY STATE
                        ================================================= */

                        <div className="relative">

                            <div className="absolute -inset-5 rounded-[35px] bg-red-600/10 blur-3xl" />

                            <div
                                className="
                                    relative overflow-hidden
                                    rounded-3xl
                                    border border-red-500/20
                                    bg-black
                                    px-6 py-24
                                    text-center
                                    shadow-[0_30px_90px_rgba(0,0,0,0.75),0_0_40px_rgba(220,38,38,0.06)]
                                "
                            >

                                {/* Top line */}

                                <div className="absolute left-10 right-10 top-0 h-px bg-gradient-to-r from-transparent via-red-500/70 to-transparent shadow-[0_0_15px_rgba(239,68,68,0.6)]" />


                                <div className="relative mx-auto flex max-w-md flex-col items-center">

                                    <div
                                        className="
                                            mb-6 flex h-16 w-16 items-center justify-center
                                            rounded-2xl
                                            border border-red-500/25
                                            bg-red-500/10
                                            text-red-400
                                            shadow-[0_0_30px_rgba(239,68,68,0.12)]
                                        "
                                    >
                                        <HistoryIcon size={30} />
                                    </div>


                                    <h2 className="text-2xl font-bold text-white">
                                        {hasFilters
                                            ? "No matching reviews"
                                            : "No reviews yet"}
                                    </h2>


                                    <p className="mt-3 text-sm leading-7 text-zinc-500">

                                        {hasFilters
                                            ? "Try changing your search or filters to find what you're looking for."
                                            : "Your completed AI code reviews will appear here. Start reviewing code to build your history."}

                                    </p>


                                    {hasFilters && (
                                        <button
                                            onClick={clearFilters}
                                            className="
                                                mt-7 rounded-xl
                                                border border-red-400/30
                                                bg-gradient-to-r
                                                from-red-700
                                                via-red-500
                                                to-red-700
                                                px-6 py-3
                                                text-sm font-semibold
                                                text-white
                                                shadow-[0_0_30px_rgba(239,68,68,0.20)]
                                                transition-all duration-300
                                                hover:-translate-y-1
                                                hover:border-red-300/60
                                                hover:shadow-[0_0_45px_rgba(239,68,68,0.40)]
                                            "
                                        >
                                            Clear Filters
                                        </button>
                                    )}

                                </div>

                            </div>

                        </div>

                    ) : (

                        /* =================================================
                           REVIEW LIST
                        ================================================= */

                        <section>

                            {/* Section heading */}

                            <div className="mb-5 flex items-center justify-between">

                                <div>

                                    <div className="flex items-center gap-3">

                                        <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]" />

                                        <h2 className="text-lg font-semibold text-white">
                                            Your Reviews
                                        </h2>

                                    </div>

                                    <p className="mt-2 font-mono text-[11px] tracking-wide text-zinc-600">

                                        {filteredReviews.length}{" "}
                                        {filteredReviews.length === 1
                                            ? "REVIEW"
                                            : "REVIEWS"}{" "}
                                        FOUND

                                    </p>

                                </div>


                                <div className="hidden items-center gap-2 font-mono text-[10px] tracking-[0.12em] text-zinc-600 sm:flex">

                                    <span className="h-1.5 w-1.5 rounded-full bg-red-500 shadow-[0_0_8px_rgba(239,68,68,0.7)]" />

                                    AI ANALYZED

                                </div>

                            </div>


                            {/* Cards */}

                            <div className="grid gap-6">

                                {filteredReviews.map((review) => (

                                    <div
                                        key={review._id}
                                        className="group relative"
                                    >

                                        {/* Permanent ambient glow */}

                                        <div className="absolute -inset-3 rounded-[30px] bg-red-600/5 blur-2xl transition duration-500 group-hover:bg-red-600/10" />


                                        {/* Left red indicator */}

                                        <div className="absolute -left-[1px] bottom-5 top-5 z-20 w-[2px] rounded-full bg-gradient-to-b from-red-500 via-red-500 to-transparent opacity-0 shadow-[0_0_12px_rgba(239,68,68,0.8)] transition duration-300 group-hover:opacity-100" />


                                        <div className="relative">

                                            <HistoryCard review={review} />

                                        </div>

                                    </div>

                                ))}

                            </div>

                        </section>

                    )}

                </main>


                {/* =================================================
                    FOOTER
                ================================================= */}

                <Footer />

            </div>

        </div>
    );
}