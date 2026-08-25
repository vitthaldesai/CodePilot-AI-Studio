import { ArrowRight, PlayCircle } from "lucide-react";
import { Link } from "react-router-dom";

export default function HeroContent() {
    return (
        <div className="max-w-xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 pl-2.5 pr-3.5 py-1.5 font-mono text-xs uppercase tracking-[0.15em] text-white/70">
                <span className="h-1.5 w-1.5 rounded-full bg-green-400 animate-[pulseDot_2s_ease-out_infinite]" />
                AI Powered Code Reviews
            </p>

            <h1 className="mt-6 text-[2.6rem] sm:text-5xl lg:text-6xl font-semibold leading-[1.04] tracking-tight text-white">
                Ship Better
                <br />
                Code{" "}
                <span className="italic bg-gradient-to-r from-[#ff6a52] to-[#d4262a] bg-clip-text text-transparent">
                    Faster.
                </span>
            </h1>

            <p className="mt-6 max-w-md text-base sm:text-lg leading-relaxed text-white/70">
                Analyze code instantly with AI. Detect bugs, security vulnerabilities, performance
                issues and receive production-ready improvements.
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-4">
                <Link
                    to="/review"
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-to-br from-[#ef3b39] to-[#a8171a] px-6 py-3.5 text-sm font-semibold text-white shadow-[0_8px_22px_-6px_rgba(216,38,38,0.65)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_26px_-6px_rgba(216,38,38,0.8)]"
                >
                    Start Reviewing <ArrowRight size={16} />
                </Link>

            </div>
        </div>
    );
}
