import { ShieldCheck, Sparkles, Zap } from "lucide-react";

export default function HeroCodeCard() {
    return (
        <div className="relative flex items-center justify-center h-[620px]">

            {/* AI Image */}
            <img
                src="/hero-ai.png"
                alt="AI"
                className="absolute -top-28 w-[320px] z-0 opacity-90 pointer-events-none"
            />

            {/* Glow */}
            <div className="absolute -top-24 w-[340px] h-[340px] rounded-full bg-violet-500/20 blur-[120px]" />

            {/* AI Score */}
            <div className="absolute top-8 -left-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-5 z-20">
                <p className="text-xs uppercase text-slate-400">AI Score</p>
                <h2 className="text-5xl font-bold text-violet-300">96</h2>
            </div>

            {/* Issues */}
            <div className="absolute bottom-10 -right-10 rounded-3xl bg-white/10 backdrop-blur-xl border border-white/10 px-6 py-5 z-20">
                <p className="text-xs uppercase text-slate-400">Issues</p>
                <h2 className="text-4xl font-bold text-white">3</h2>
            </div>

            {/* Main Card */}
            <div className="relative mt-28 w-[560px] rounded-[36px] overflow-hidden border border-white/10 bg-[#0B1020]/90 backdrop-blur-3xl shadow-[0_30px_90px_rgba(0,0,0,.45)]">

                {/* Header */}
                <div className="flex items-center justify-between px-8 py-6 border-b border-white/10">

                    <div>
                        <p className="text-xs uppercase tracking-[4px] text-violet-300">
                            CodePilot AI
                        </p>

                        <h2 className="text-3xl font-bold text-white mt-2">
                            Python Review
                        </h2>
                    </div>

                    <div className="flex items-center gap-2 bg-violet-500/20 rounded-full px-4 py-2">
                        <Sparkles size={18} className="text-violet-300" />
                        <span className="text-violet-200">Reviewing</span>
                    </div>

                </div>

                {/* Code */}

                <div className="p-7">

                    <pre className="rounded-3xl bg-[#060B17] p-6 h-[210px] overflow-hidden text-sm leading-7 text-slate-300">
                        {`def login(username, password):

    if authenticate():

        return True

    return False

# Security Scan...

# Performance...

# AI Suggestions...
`}
                    </pre>

                </div>

                {/* Bottom */}

                <div className="grid grid-cols-3 gap-4 border-t border-white/10 p-6">

                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <ShieldCheck size={22} className="text-emerald-400 mb-3" />
                        <p className="text-xs uppercase text-slate-500">Security</p>
                        <h3 className="text-white font-semibold mt-1">Passed</h3>
                    </div>

                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <Zap size={22} className="text-sky-400 mb-3" />
                        <p className="text-xs uppercase text-slate-500">Performance</p>
                        <h3 className="text-white font-semibold mt-1">Fast</h3>
                    </div>

                    <div className="rounded-2xl bg-white/5 border border-white/10 p-4">
                        <Sparkles size={22} className="text-violet-400 mb-3" />
                        <p className="text-xs uppercase text-slate-500">Quality</p>
                        <h3 className="text-white font-semibold mt-1">A+</h3>
                    </div>

                </div>

            </div>

        </div>
    );
}