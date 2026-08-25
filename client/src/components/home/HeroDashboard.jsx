"use client";

import { useEffect, useState } from "react";
import { ArrowRight, CheckCircle2, Sparkles } from "lucide-react";

export default function HeroDashboard() {
    const [score, setScore] = useState(0);

    useEffect(() => {
        const target = 96;
        const duration = 1400;
        const start = performance.now();
        let frame;

        const tick = (now) => {
            const progress = Math.min((now - start) / duration, 1);
            const eased = 1 - Math.pow(1 - progress, 3); // ease-out-cubic
            setScore(Math.round(eased * target));
            if (progress < 1) frame = requestAnimationFrame(tick);
        };

        frame = requestAnimationFrame(tick);
        return () => cancelAnimationFrame(frame);
    }, []);

    const checks = [
        { icon: CheckCircle2, color: "text-emerald-400", label: "Security checks passed" },
        { icon: CheckCircle2, color: "text-sky-400", label: "Performance optimized" },
        { icon: CheckCircle2, color: "text-violet-400", label: "Best practices detected" },
    ];

    return (
        <div className="relative flex justify-center items-center">

            {/* AI Image — now correctly centered */}
            <img
                src="/hero-ai.png"
                alt="AI"
                className="
                    absolute
                    -top-(-10)
                    left-1/2
                    -translate-x-1/2
                    w-[380px]
                    opacity-70
                    z-0
                    pointer-events-none
                    select-none
                    drop-shadow-[0_0_100px_rgba(168,85,247,.45)]
                    animate-[dash-float_5s_ease-in-out_infinite]
                "
            />

            {/* Glow — same centering fix applied */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-[420px] h-[420px] rounded-full bg-violet-500/20 blur-[160px] animate-[dash-glow_6s_ease-in-out_infinite]" />

            {/* Dashboard */}
            <div className="
                group
                relative
                mt-28
                w-[520px]
                rounded-[34px]
                border
                border-white/10
                bg-white/5
                backdrop-blur-3xl
                overflow-hidden
                shadow-[0_30px_80px_rgba(0,0,0,.45)]
                transition-all
                duration-500
                hover:border-white/20
                hover:shadow-[0_40px_100px_rgba(0,0,0,.55)]
                hover:-translate-y-1
            ">

                {/* Ambient inner glow on hover */}
                <div className="pointer-events-none absolute inset-0 rounded-[34px] opacity-0 group-hover:opacity-100 transition-opacity duration-500 shadow-[inset_0_0_60px_rgba(167,139,250,0.15)]" />

                {/* Header */}
                <div className="px-8 py-7 border-b border-white/10">
                    <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-violet-500/20 flex items-center justify-center animate-[dash-pulse_3.5s_ease-in-out_infinite]">
                            <Sparkles className="text-violet-300" />
                        </div>
                        <div>
                            <p className="text-sm text-slate-400">
                                AI Analysis
                            </p>
                            <h2 className="text-3xl font-bold text-white">
                                Review Complete
                            </h2>
                        </div>
                    </div>
                </div>

                {/* Score */}
                <div className="px-8 py-8">
                    <h1 className="text-7xl font-black text-white tabular-nums">
                        {score}<span className="text-violet-400">%</span>
                    </h1>
                    <p className="text-slate-400 mt-2">
                        Overall Code Quality Score
                    </p>
                </div>

                {/* Results — reveal one at a time */}
                <div className="px-8 space-y-5">
                    {checks.map(({ icon: Icon, color, label }, i) => (
                        <div
                            key={label}
                            className="flex items-center gap-4 opacity-0 animate-[dash-rise_0.6s_ease-out_forwards]"
                            style={{ animationDelay: `${0.5 + i * 0.18}s` }}
                        >
                            <Icon className={color} />
                            <span className="text-white">{label}</span>
                        </div>
                    ))}
                </div>

                {/* Bottom */}
                <div className="mt-8 border-t border-white/10 px-8 py-7 flex justify-between items-center">
                    <div>
                        <p className="text-slate-500 text-sm">
                            Suggestions
                        </p>
                        <h3 className="text-white text-2xl font-bold">
                            3 Improvements
                        </h3>
                    </div>
                    <button
                        type="button"
                        className="group/btn flex items-center gap-2 text-violet-300 hover:text-white transition-colors"
                    >
                        View Report
                        <ArrowRight
                            size={18}
                            className="transition-transform duration-300 group-hover/btn:translate-x-1"
                        />
                    </button>
                </div>

            </div>

            <style>{`
                @keyframes dash-float {
                    0%, 100% { margin-top: 0px; }
                    50% { margin-top: -14px; }
                }
                @keyframes dash-glow {
                    0%, 100% { opacity: 0.7; scale: 1; }
                    50% { opacity: 1; scale: 1.08; }
                }
                @keyframes dash-pulse {
                    0%, 100% { transform: scale(1); }
                    50% { transform: scale(1.08); }
                }
                @keyframes dash-rise {
                    from { opacity: 0; transform: translateX(-10px); }
                    to { opacity: 1; transform: translateX(0); }
                }
                @media (prefers-reduced-motion: reduce) {
                    *, *::before, *::after {
                        animation-duration: 0.01ms !important;
                        animation-iteration-count: 1 !important;
                    }
                }
            `}</style>
        </div>
    );
}