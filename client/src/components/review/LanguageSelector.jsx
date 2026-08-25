// Best-guess rebuild in the red/rose theme — kept to the three languages this
// page already knows how to load starter snippets for. If your real selector
// supports more languages, merge this styling into that instead of overwriting it.
const OPTIONS = [
    { value: "python", label: "Python" },
    { value: "javascript", label: "JavaScript" },
    { value: "typescript", label: "TypeScript" },
];

export default function LanguageSelector({ language, setLanguage }) {
    return (
        <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="rounded-lg border border-white/[0.08] bg-white/[0.03] px-3 py-1.5 text-xs font-mono text-zinc-300 outline-none transition focus:border-red-500/40 focus:ring-2 focus:ring-red-500/20"
        >
            {OPTIONS.map((opt) => (
                <option key={opt.value} value={opt.value} className="bg-[#0b0b0b] text-zinc-200">
                    {opt.label}
                </option>
            ))}
        </select>
    );
}
