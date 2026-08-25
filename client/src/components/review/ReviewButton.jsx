import { Loader2, Sparkles } from "lucide-react";

// Best-guess rebuild in the red/rose theme — I don't have your original
// ReviewButton source, so if it had extra behavior beyond onClick/loading
// (e.g. a disabled-when-empty state passed as a prop), fold that back in.
export default function ReviewButton({ onClick, loading }) {
    return (
        <button
            onClick={onClick}
            disabled={loading}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-red-500 to-rose-600 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_8px_24px_-8px_rgba(239,68,68,0.6)] transition-all duration-200 hover:-translate-y-0.5 hover:shadow-[0_10px_28px_-6px_rgba(239,68,68,0.75)] active:scale-[0.98] disabled:cursor-not-allowed disabled:opacity-70 disabled:hover:translate-y-0"
        >
            {loading ? (
                <>
                    <Loader2 className="h-4 w-4 animate-spin" />
                    Analyzing…
                </>
            ) : (
                <>
                    <Sparkles className="h-4 w-4" />
                    Review Code
                </>
            )}
        </button>
    );
}
