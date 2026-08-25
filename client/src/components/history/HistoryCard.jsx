import { Link } from "react-router-dom";
import {
    Eye,
    Calendar,
    Code2,
    AlertTriangle,
    ArrowRight,
    Sparkles,
    ShieldCheck,
} from "lucide-react";

export default function HistoryCard({ review }) {
    const score = Number(review?.score ?? 0);
    const issues = review?.issues?.length ?? 0;

    const getScoreLabel = () => {
        if (score >= 80) return "Strong";
        if (score >= 60) return "Needs Work";
        return "Attention";
    };

    const getScoreColor = () => {
        if (score >= 80) return "text-emerald-300";
        if (score >= 60) return "text-orange-300";
        return "text-red-300";
    };

    return (
        <article
            className="
                group relative overflow-hidden
                rounded-[26px]
                border border-white/[0.12]
                bg-[#080808]/95
                backdrop-blur-xl
                shadow-[0_25px_70px_rgba(0,0,0,.45)]
                transition-all duration-500
                hover:-translate-y-1
                hover:border-red-400/30
                hover:shadow-[0_30px_90px_rgba(239,68,68,.12)]
            "
        >
            {/* =====================================================
                AMBIENT GLOW
            ====================================================== */}

            <div
                className="
                    absolute -top-24 -right-24
                    w-64 h-64
                    rounded-full
                    bg-red-500/[0.08]
                    blur-[90px]
                    pointer-events-none
                    transition-all duration-500
                    group-hover:bg-red-500/[0.14]
                "
            />

            <div
                className="
                    absolute -bottom-24 -left-24
                    w-56 h-56
                    rounded-full
                    bg-orange-500/[0.05]
                    blur-[90px]
                    pointer-events-none
                "
            />

            {/* =====================================================
                TOP EDGE LIGHT
            ====================================================== */}

            <div
                className="
                    absolute top-0 left-[12%] right-[12%]
                    h-px
                    bg-gradient-to-r
                    from-transparent
                    via-red-400/70
                    to-transparent
                    opacity-70
                "
            />

            <div
                className="
                    absolute top-0 left-1/2
                    -translate-x-1/2
                    w-24 h-[3px]
                    rounded-full
                    bg-red-400/70
                    blur-sm
                "
            />

            {/* =====================================================
                DECORATIVE CORNER LINES
            ====================================================== */}

            <div className="absolute top-4 left-4 w-7 h-7 pointer-events-none">
                <div className="absolute top-0 left-0 w-7 h-px bg-red-400/40" />
                <div className="absolute top-0 left-0 w-px h-7 bg-red-400/40" />
            </div>

            <div className="absolute top-4 right-4 w-7 h-7 pointer-events-none">
                <div className="absolute top-0 right-0 w-7 h-px bg-red-400/30" />
                <div className="absolute top-0 right-0 w-px h-7 bg-red-400/30" />
            </div>

            <div className="absolute bottom-4 left-4 w-7 h-7 pointer-events-none">
                <div className="absolute bottom-0 left-0 w-7 h-px bg-orange-400/20" />
                <div className="absolute bottom-0 left-0 w-px h-7 bg-orange-400/20" />
            </div>

            <div className="absolute bottom-4 right-4 w-7 h-7 pointer-events-none">
                <div className="absolute bottom-0 right-0 w-7 h-px bg-orange-400/20" />
                <div className="absolute bottom-0 right-0 w-px h-7 bg-orange-400/20" />
            </div>

            {/* =====================================================
                HEADER
            ====================================================== */}

            <div className="relative px-6 pt-6 pb-5">

                <div className="flex items-start justify-between gap-5">

                    {/* LANGUAGE */}

                    <div className="min-w-0">

                        <div className="flex items-center gap-3">

                            <div
                                className="
                                    relative flex-none
                                    w-11 h-11
                                    rounded-xl
                                    border border-red-400/25
                                    bg-gradient-to-br
                                    from-red-500/[0.18]
                                    to-rose-500/[0.04]
                                    flex items-center justify-center
                                    shadow-[0_0_25px_rgba(239,68,68,.08)]
                                "
                            >
                                <div className="absolute inset-0 rounded-xl bg-red-500/10 blur-md" />

                                <Code2 className="relative w-5 h-5 text-red-300" />
                            </div>

                            <div className="min-w-0">

                                <div className="flex items-center gap-2.5">

                                    <h3
                                        className="
                                            text-sm
                                            font-bold
                                            uppercase
                                            tracking-wide
                                            text-white
                                        "
                                    >
                                        {review?.language || "Unknown"}
                                    </h3>

                                    <span
                                        className="
                                            inline-flex items-center gap-1.5
                                            rounded-full
                                            border border-emerald-400/20
                                            bg-emerald-400/[0.06]
                                            px-2 py-1
                                            text-[8px]
                                            uppercase
                                            tracking-wider
                                            font-mono
                                            text-emerald-300
                                        "
                                    >
                                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-300 shadow-[0_0_7px_rgba(110,231,183,.8)]" />
                                        Reviewed
                                    </span>

                                </div>

                                <div className="flex items-center gap-2 mt-1.5 text-zinc-300">

                                    <Calendar className="w-3.5 h-3.5 text-red-300" />

                                    <span className="text-[10px] font-mono">
                                        {review?.created_at
                                            ? new Date(
                                                review.created_at
                                            ).toLocaleString()
                                            : "Unknown date"}
                                    </span>

                                </div>

                            </div>

                        </div>

                    </div>

                    {/* SCORE */}

                    <div className="relative flex-none text-right">

                        <p className="text-[8px] uppercase tracking-[0.2em] text-zinc-400 font-mono">
                            Score
                        </p>

                        <div className="flex items-baseline justify-end gap-1 mt-0.5">

                            <span
                                className={`
                                    text-3xl
                                    font-black
                                    tracking-tight
                                    ${getScoreColor()}
                                `}
                            >
                                {score}
                            </span>

                            <span className="text-[10px] font-mono text-zinc-500">
                                /100
                            </span>

                        </div>

                        <span
                            className={`
                                text-[8px]
                                uppercase
                                tracking-[0.15em]
                                font-mono
                                ${score >= 80
                                    ? "text-emerald-300"
                                    : score >= 60
                                        ? "text-orange-300"
                                        : "text-red-300"
                                }
                            `}
                        >
                            {getScoreLabel()}
                        </span>

                    </div>

                </div>

                {/* =================================================
                    SCORE BAR
                ================================================== */}

                <div className="mt-5">

                    <div className="flex items-center justify-between mb-2">

                        <span className="text-[8px] uppercase tracking-[0.16em] text-zinc-500 font-mono">
                            Code quality
                        </span>

                        <span className="text-[8px] font-mono text-zinc-500">
                            {score}%
                        </span>

                    </div>

                    <div className="h-1.5 rounded-full bg-white/[0.06] overflow-hidden border border-white/[0.04]">

                        <div
                            className="
                                h-full
                                rounded-full
                                bg-gradient-to-r
                                from-red-500
                                via-rose-400
                                to-orange-300
                                shadow-[0_0_12px_rgba(239,68,68,.45)]
                                transition-all duration-700
                            "
                            style={{
                                width: `${Math.min(
                                    Math.max(score, 0),
                                    100
                                )}%`,
                            }}
                        />

                    </div>

                </div>

            </div>

            {/* =====================================================
                DIVIDER
            ====================================================== */}

            <div className="relative mx-6">

                <div className="h-px bg-gradient-to-r from-transparent via-white/[0.10] to-transparent" />

                <div className="absolute left-1/2 -translate-x-1/2 -top-px w-12 h-px bg-red-400/40" />

            </div>

            {/* =====================================================
                DETAILS
            ====================================================== */}

            <div className="relative px-6 py-5">

                <div className="grid grid-cols-2 gap-3">

                    {/* ISSUES */}

                    <div
                        className="
                            group/stat
                            rounded-2xl
                            border border-red-400/[0.12]
                            bg-red-500/[0.035]
                            px-4 py-3
                            transition-all duration-300
                            hover:border-red-400/25
                            hover:bg-red-500/[0.06]
                        "
                    >

                        <div className="flex items-center justify-between">

                            <div
                                className="
                                    w-8 h-8
                                    rounded-lg
                                    border border-red-400/15
                                    bg-red-500/[0.06]
                                    flex items-center justify-center
                                "
                            >
                                <AlertTriangle className="w-4 h-4 text-red-300" />
                            </div>

                            <span className="text-xl font-black text-red-300">
                                {issues}
                            </span>

                        </div>

                        <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-zinc-400 font-mono">
                            Issues found
                        </p>

                    </div>

                    {/* STATUS */}

                    <div
                        className="
                            rounded-2xl
                            border border-emerald-400/[0.12]
                            bg-emerald-500/[0.025]
                            px-4 py-3
                            transition-all duration-300
                            hover:border-emerald-400/25
                            hover:bg-emerald-500/[0.05]
                        "
                    >

                        <div className="flex items-center justify-between">

                            <div
                                className="
                                    w-8 h-8
                                    rounded-lg
                                    border border-emerald-400/15
                                    bg-emerald-500/[0.06]
                                    flex items-center justify-center
                                "
                            >
                                <ShieldCheck className="w-4 h-4 text-emerald-300" />
                            </div>

                            <span className="text-[9px] font-mono uppercase tracking-wider text-emerald-300">
                                Complete
                            </span>

                        </div>

                        <p className="mt-2 text-[8px] uppercase tracking-[0.16em] text-zinc-400 font-mono">
                            AI analysis
                        </p>

                    </div>

                </div>

                {/* =================================================
                    VIEW BUTTON
                ================================================== */}

                <Link
                    to={`/history/${review?._id}`}
                    className="
                        group/button
                        relative
                        mt-4
                        w-full
                        overflow-hidden
                        inline-flex
                        items-center
                        justify-center
                        gap-2.5
                        rounded-xl
                        border border-red-400/25
                        bg-gradient-to-r
                        from-red-500/[0.12]
                        via-red-500/[0.08]
                        to-orange-500/[0.08]
                        px-5 py-3.5
                        text-[10px]
                        uppercase
                        tracking-[0.16em]
                        font-semibold
                        text-red-100
                        transition-all duration-300
                        hover:border-red-300/45
                        hover:bg-red-500/[0.16]
                        hover:text-white
                        hover:shadow-[0_10px_35px_rgba(239,68,68,.12)]
                        active:scale-[0.99]
                    "
                >

                    {/* button shine */}

                    <span
                        className="
                            absolute inset-y-0 -left-full
                            w-1/2
                            skew-x-[-20deg]
                            bg-gradient-to-r
                            from-transparent
                            via-white/[0.10]
                            to-transparent
                            transition-all duration-700
                            group-hover/button:left-[130%]
                        "
                    />

                    <Eye className="relative w-4 h-4 text-red-300 group-hover/button:text-white transition-colors" />

                    <span className="relative">
                        View Review
                    </span>

                    <ArrowRight
                        className="
                            relative
                            w-3.5 h-3.5
                            text-red-300
                            transition-all duration-300
                            group-hover/button:translate-x-1
                            group-hover/button:text-white
                        "
                    />

                </Link>

            </div>

            {/* =====================================================
                BOTTOM STATUS LINE
            ====================================================== */}

            <div
                className="
                    relative
                    px-6 py-3
                    border-t border-white/[0.06]
                    bg-white/[0.015]
                    flex items-center justify-between
                "
            >

                <div className="flex items-center gap-2">

                    <Sparkles className="w-3 h-3 text-red-300" />

                    <span className="text-[8px] uppercase tracking-[0.15em] text-zinc-500 font-mono">
                        CodePilot AI
                    </span>

                </div>

                <span className="text-[8px] font-mono text-zinc-600">
                    REVIEW #{String(review?._id || "").slice(-6)}
                </span>

            </div>

        </article>
    );
}