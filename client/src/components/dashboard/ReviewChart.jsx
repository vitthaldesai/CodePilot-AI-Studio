import { Award, CheckCircle2 } from "lucide-react";

export default function ReviewChart() {
    return (
        <div className="
            rounded-2xl
            border border-white/[0.07]
            bg-white/[0.025]
            p-6
            backdrop-blur-xl
        ">

            <div className="flex items-center gap-3 mb-6">

                <div className="
                    w-9 h-9
                    rounded-xl
                    bg-red-500/10
                    border border-red-500/15
                    flex items-center justify-center
                ">
                    <Award size={18} className="text-red-400" />
                </div>

                <div>
                    <h2 className="font-semibold text-white">
                        Code Quality
                    </h2>

                    <p className="text-xs text-slate-500">
                        AI analysis coverage
                    </p>
                </div>

            </div>

            <div className="space-y-3">

                {[
                    "Security Issues",
                    "Bugs",
                    "Performance Problems",
                    "Best Practices",
                    "Maintainability",
                    "Readability",
                ].map((item) => (

                    <div
                        key={item}
                        className="
                            flex
                            items-center
                            gap-3
                            text-sm
                            text-slate-400
                        "
                    >
                        <CheckCircle2
                            size={16}
                            className="text-emerald-400"
                        />

                        {item}
                    </div>

                ))}

            </div>

        </div>
    );
}