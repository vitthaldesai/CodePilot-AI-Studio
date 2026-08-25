import { ArrowRight, Sparkles } from "lucide-react";
import { Link } from "react-router-dom";

export default function WelcomeBanner() {
    return (
        <section className="
            relative
            overflow-hidden
            rounded-2xl
            border border-red-500/15
            bg-gradient-to-br from-red-950/30 via-[#0b0d18] to-[#080a12]
            p-7
        ">

            {/* Glow */}
            <div className="
                absolute
                -top-24
                -right-20
                w-72
                h-72
                rounded-full
                bg-red-600/15
                blur-[100px]
                pointer-events-none
            " />

            <div className="relative z-10">

                <div className="
                    inline-flex
                    items-center
                    gap-2
                    px-3
                    py-1.5
                    rounded-full
                    bg-red-500/10
                    border border-red-500/20
                    text-red-400
                    text-xs
                    font-medium
                ">
                    <Sparkles size={13} />
                    AI CODE ANALYSIS
                </div>

                <h1 className="mt-4 text-3xl lg:text-4xl font-bold tracking-tight">
                    Welcome back, Developer 👋
                </h1>

                <p className="mt-3 text-slate-400 max-w-xl leading-6">
                    Analyze your code with AI, find bugs, improve security,
                    and receive professional development suggestions.
                </p>

                <Link
                    to="/review"
                    className="
                        inline-flex
                        items-center
                        gap-2
                        mt-6
                        px-5
                        py-3
                        rounded-xl
                        bg-gradient-to-br
                        from-[#ef3b39]
                        to-[#b51b1f]
                        text-sm
                        font-semibold
                        text-white
                        shadow-[0_10px_30px_-10px_rgba(239,59,57,0.7)]
                        hover:-translate-y-0.5
                        hover:shadow-[0_14px_35px_-10px_rgba(239,59,57,0.9)]
                        transition-all
                    "
                >
                    Start New Review
                    <ArrowRight size={16} />
                </Link>

            </div>
        </section>
    );
}