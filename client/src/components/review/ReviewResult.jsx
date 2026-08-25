import IssueCard from "./IssueCard";
import ImprovedCode from "./ImprovedCode";
import DownloadReport from "./DownloadReport";
import AIChat from "./AIChat";

export default function ReviewResult({
    result,
    language,
    originalCode,
    historyMode = false,
}) {
    return (
        <div className="space-y-6">

            {/* =========================
                REVIEW SUMMARY
            ========================= */}
            <div className="rounded-2xl border border-white/[0.07] bg-[#090909] p-6">

                <div className="flex items-center justify-between gap-4">
                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-red-400">
                            Review Results
                        </p>

                        <h2 className="mt-2 text-xl font-semibold text-white">
                            AI Review Summary
                        </h2>
                    </div>

                    <div className="text-right">
                        <p className="text-[9px] uppercase tracking-wider font-mono text-zinc-500">
                            Code Quality
                        </p>

                        <p className="mt-1 text-3xl font-bold text-red-400">
                            {result.score}%
                        </p>
                    </div>
                </div>

                {/* Overall review */}
                <div className="mt-6 rounded-xl border border-red-500/10 bg-red-500/[0.04] p-5">

                    <div className="flex items-center gap-2">
                        <div className="w-2 h-2 rounded-full bg-red-400" />

                        <h3 className="text-sm font-semibold text-red-300">
                            Overall Review
                        </h3>
                    </div>

                    <p className="mt-3 text-sm leading-7 text-zinc-300">
                        {result.summary}
                    </p>

                </div>

            </div>


            {/* =========================
                ISSUES
            ========================= */}
            <div className="rounded-2xl border border-white/[0.07] bg-[#090909] p-6">

                <div className="flex items-center justify-between">

                    <div>
                        <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-red-400">
                            Analysis
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                            Issues Found
                        </h2>
                    </div>

                    <span className="rounded-full border border-red-500/20 bg-red-500/[0.06] px-3 py-1 text-[10px] font-mono text-red-300">
                        {result.issues?.length || 0} Issues
                    </span>

                </div>


                <div className="mt-6 space-y-4">

                    {!result.issues || result.issues.length === 0 ? (

                        <div className="rounded-xl border border-emerald-500/15 bg-emerald-500/[0.04] p-5 text-sm text-emerald-400">
                            ✓ No issues found. Your code looks good.
                        </div>

                    ) : (

                        result.issues.map((issue, index) => (

                            <IssueCard
                                key={index}
                                title={issue.title}
                                category={issue.category}
                                severity={issue.severity}
                                description={issue.description}
                                line={issue.line}
                            />

                        ))

                    )}

                </div>

            </div>


            {/* =========================
                SUGGESTIONS
            ========================= */}
            {result.suggestions?.length > 0 && (

                <div className="rounded-2xl border border-white/[0.07] bg-[#090909] p-6">

                    <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-red-400">
                        Recommendations
                    </p>

                    <h2 className="mt-2 text-xl font-semibold">
                        Suggestions
                    </h2>


                    <div className="mt-5 space-y-3">

                        {result.suggestions.map((item, index) => (

                            <div
                                key={index}
                                className="flex gap-3 rounded-xl border border-white/[0.06] bg-white/[0.02] p-4"
                            >

                                <span className="flex-none flex items-center justify-center w-6 h-6 rounded-full bg-red-500/[0.08] text-[10px] font-semibold text-red-400">
                                    {index + 1}
                                </span>

                                <p className="text-sm leading-6 text-zinc-300">
                                    {item}
                                </p>

                            </div>

                        ))}

                    </div>

                </div>

            )}


            {/* =========================
                UPDATED CODE
            ========================= */}
            {result.improved_code && (

                <div className="rounded-2xl border border-white/[0.07] bg-[#090909] p-6">

                    <div className="mb-5">

                        <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-red-400">
                            AI Improvement
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                            Updated Code
                        </h2>

                        <p className="mt-2 text-xs text-zinc-400">
                            AI-generated version with the detected issues addressed.
                        </p>

                    </div>

                    <ImprovedCode
                        code={result.improved_code}
                        language={language}
                    />

                </div>

            )}


            {/* =========================
                AI CHAT
            ========================= */}
            {!historyMode && (

                <div className="rounded-2xl border border-white/[0.07] bg-[#090909] p-6">

                    <div className="mb-5">

                        <p className="text-[10px] uppercase tracking-[0.2em] font-mono text-red-400">
                            AI Assistant
                        </p>

                        <h2 className="mt-2 text-xl font-semibold">
                            Ask CodePilot
                        </h2>

                        <p className="mt-2 text-xs text-zinc-400">
                            Ask questions about your reviewed code, issues,
                            security findings or suggested improvements.
                        </p>

                    </div>

                    <AIChat
                        language={language}
                        originalCode={originalCode}
                        improvedCode={result.improved_code}
                    />

                </div>

            )}


            {/* =========================
                DOWNLOAD REPORT
            ========================= */}
            {!historyMode && (

                <div className="flex justify-end">

                    <DownloadReport
                        result={result}
                        language={language}
                    />

                </div>

            )}

        </div>
    );
}