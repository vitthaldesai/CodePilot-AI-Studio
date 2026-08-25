import { Code2 } from "lucide-react";

const languages = [
    ["Python", "Fully Supported"],
    ["JavaScript", "Supported"],
    ["Java", "Supported"],
    ["C++", "Supported"],
];

export default function LanguageChart() {
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
                    <Code2 size={18} className="text-red-400" />
                </div>

                <div>
                    <h2 className="font-semibold text-white">
                        Supported Languages
                    </h2>

                    <p className="text-xs text-slate-500">
                        Available for analysis
                    </p>
                </div>

            </div>

            <div className="grid grid-cols-2 gap-3">

                {languages.map(([name, status]) => (

                    <div
                        key={name}
                        className="
                            rounded-xl
                            border border-white/[0.06]
                            bg-white/[0.02]
                            p-4
                            hover:border-red-500/15
                            transition
                        "
                    >

                        <h3 className="text-sm font-semibold text-white">
                            {name}
                        </h3>

                        <div className="flex items-center gap-2 mt-2">

                            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />

                            <p className="text-xs text-slate-500">
                                {status}
                            </p>

                        </div>

                    </div>

                ))}

            </div>

        </div>
    );
}