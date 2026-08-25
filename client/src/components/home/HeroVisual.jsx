const diffLines = [
    { type: "ctx", text: "  function calcTotal(items) {" },
    { type: "del", text: "-   let total = 0" },
    { type: "add", text: "+   let total = 0.0" },
    { type: "ctx", text: "    items.forEach(i => {" },
    { type: "del", text: "-     total += i.price" },
    { type: "add", text: "+     total += i.price * i.qty" },
    { type: "ctx", text: "    })" },
    { type: "ctx", text: "  }" },
];

export default function HeroVisual() {
    return (
        <>
            {/* Scanning beam sweeping over the photo */}
            <div
                className="pointer-events-none absolute left-[40%] right-[2%] top-0 z-[6] h-[2px] animate-[scan_5.5s_ease-in-out_infinite] [animation-delay:1.2s]"
                style={{
                    background:
                        "linear-gradient(90deg, transparent, #ff6a52 45%, #fff 50%, #ff6a52 55%, transparent)",
                    mixBlendMode: "screen",
                }}
            />

            {/* Analyzing pill, near the robot's head */}
            <div className="absolute right-4 top-[16%] z-[6] inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/45 px-3.5 py-2 font-mono text-[11px] tracking-wide text-white/85 backdrop-blur-md animate-[floatCard_5s_ease-in-out_infinite] sm:right-10 lg:right-[8%]">
                <span className="h-1.5 w-1.5 rounded-full bg-[#ff6a52] animate-[pulseDot_1.6s_ease-out_infinite]" />
                Analyzing repository…
            </div>

            {/* Diff card, over the robot's shoulder/chest */}
            <div className="absolute bottom-[9%] right-4 z-[6] w-[260px] overflow-hidden rounded-2xl border border-white/15 bg-black/55 shadow-[0_24px_60px_-18px_rgba(0,0,0,0.65)] backdrop-blur-lg animate-[floatCard_6s_ease-in-out_infinite] [animation-delay:.6s] sm:right-10 lg:right-[6%]">
                <div className="flex items-center gap-1.5 border-b border-white/10 px-3 py-2.5">
                    <span className="h-2 w-2 rounded-full bg-red-500" />
                    <span className="h-2 w-2 rounded-full bg-yellow-400" />
                    <span className="h-2 w-2 rounded-full bg-green-400" />
                    <span className="ml-1.5 font-mono text-[10px] text-white/55">review · cart.js</span>
                </div>
                <pre className="px-3.5 py-3 font-mono text-[11px] leading-[1.75] overflow-x-auto">
                    {diffLines.map((line, i) => (
                        <span
                            key={i}
                            className={`block ${line.type === "del"
                                    ? "bg-red-500/15 text-red-300"
                                    : line.type === "add"
                                        ? "bg-green-500/15 text-green-300"
                                        : "text-white/55"
                                }`}
                        >
                            {line.text}
                        </span>
                    ))}
                </pre>
                <div className="flex items-center gap-1.5 border-t border-white/10 bg-green-500/5 px-3.5 py-2.5 text-[11.5px] font-medium text-green-400">
                    ✓ 2 issues auto-fixed
                </div>
            </div>
        </>
    );
}
