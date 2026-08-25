import { useState, useRef, useEffect } from "react";
import api from "../../api/axios";
import { Bot, User, SendHorizontal, Sparkles } from "lucide-react";

export default function AIChat({
    language,
    originalCode,
    improvedCode,
}) {
    const [question, setQuestion] = useState("");
    const [messages, setMessages] = useState([]);
    const [loading, setLoading] = useState(false);

    const bottomRef = useRef(null);

    useEffect(() => {
        bottomRef.current?.scrollIntoView({
            behavior: "smooth",
        });
    }, [messages]);

    async function askAI() {
        if (!question.trim()) return;

        const userQuestion = question;

        setMessages((prev) => [
            ...prev,
            {
                role: "user",
                text: userQuestion,
            },
        ]);

        setQuestion("");
        setLoading(true);

        console.log({
            language,
            originalCode,
            improvedCode,
            question: userQuestion,
        });

        try {
            const response = await api.post("/review/chat", {
                language: language || "",
                original_code: originalCode || "",
                improved_code: improvedCode || "",
                question: userQuestion,
            });

            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: response.data.answer,
                },
            ]);
        } catch (err) {
            setMessages((prev) => [
                ...prev,
                {
                    role: "assistant",
                    text: "Sorry, something went wrong.",
                },
            ]);

            console.log(err);
        }

        setLoading(false);
    }

    function handleKeyDown(e) {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            askAI();
        }
    }

    return (
        <div className="overflow-hidden rounded-2xl border border-white/[0.07] bg-[#080808] shadow-[0_20px_60px_rgba(0,0,0,0.35)]">

            {/* Header */}
            <div className="flex items-center justify-between border-b border-white/[0.07] px-5 py-4">

                <div className="flex items-center gap-3">

                    <div className="relative flex h-9 w-9 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.07]">
                        <Sparkles className="h-4 w-4 text-red-400" />

                        <span className="absolute -right-0.5 -top-0.5 h-2 w-2 rounded-full bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.7)]" />
                    </div>

                    <div>
                        <h2 className="text-sm font-semibold text-zinc-200">
                            Ask AI About Your Code
                        </h2>

                        <p className="mt-0.5 text-[10px] text-zinc-600">
                            Ask follow-up questions about your review
                        </p>
                    </div>

                </div>

                <span className="hidden rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1 font-mono text-[9px] uppercase tracking-wider text-zinc-600 sm:block">
                    AI Assistant
                </span>

            </div>


            {/* Messages */}
            <div className="h-96 space-y-5 overflow-y-auto p-5">

                {/* Empty State */}
                {messages.length === 0 && (

                    <div className="flex h-full flex-col items-center justify-center text-center">

                        <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-2xl border border-white/[0.07] bg-white/[0.025]">
                            <Bot className="h-5 w-5 text-zinc-600" />
                        </div>

                        <p className="text-xs font-medium text-zinc-400">
                            Ask anything about your code
                        </p>

                        <p className="mt-1 text-[10px] text-zinc-700">
                            CodePilot can explain findings and suggest improvements.
                        </p>

                        <div className="mt-5 flex flex-wrap justify-center gap-2">

                            {[
                                "Why is this insecure?",
                                "Explain line 2",
                                "Optimize this code",
                                "Rewrite using best practices",
                            ].map((item) => (

                                <button
                                    key={item}
                                    onClick={() => setQuestion(item)}
                                    className="rounded-full border border-white/[0.06] bg-white/[0.02] px-3 py-1.5 text-[10px] text-zinc-600 transition hover:border-red-500/20 hover:bg-red-500/[0.05] hover:text-red-400"
                                >
                                    {item}
                                </button>

                            ))}

                        </div>

                    </div>

                )}


                {/* Messages */}
                {messages.map((message, index) => (

                    <div
                        key={index}
                        className={`flex gap-3 ${message.role === "user"
                            ? "justify-end"
                            : "justify-start"
                            }`}
                    >

                        {/* AI Icon */}
                        {message.role === "assistant" && (

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.07]">
                                <Bot className="h-4 w-4 text-red-400" />
                            </div>

                        )}


                        {/* Message */}
                        <div
                            className={`max-w-[80%] whitespace-pre-wrap rounded-2xl px-4 py-3 text-xs leading-6 ${message.role === "user"
                                ? "rounded-br-md bg-gradient-to-br from-[#ef3b39] to-[#b51b1f] text-white shadow-[0_8px_25px_-10px_rgba(239,59,57,0.6)]"
                                : "rounded-bl-md border border-white/[0.06] bg-white/[0.025] text-zinc-400"
                                }`}
                        >
                            {message.text}
                        </div>


                        {/* User Icon */}
                        {message.role === "user" && (

                            <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-xl border border-white/[0.08] bg-white/[0.04]">
                                <User className="h-4 w-4 text-zinc-500" />
                            </div>

                        )}

                    </div>

                ))}


                {/* Loading */}
                {loading && (

                    <div className="flex gap-3">

                        <div className="flex h-8 w-8 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/[0.07]">
                            <Bot className="h-4 w-4 animate-pulse text-red-400" />
                        </div>

                        <div className="flex items-center gap-2 rounded-2xl rounded-bl-md border border-white/[0.06] bg-white/[0.025] px-4 py-3">

                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400" />
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 [animation-delay:150ms]" />
                            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-red-400 [animation-delay:300ms]" />

                        </div>

                    </div>

                )}

                <div ref={bottomRef} />

            </div>


            {/* Input */}
            <div className="border-t border-white/[0.07] bg-white/[0.01] p-4">

                <div className="flex gap-3">

                    <textarea
                        value={question}
                        onChange={(e) => setQuestion(e.target.value)}
                        onKeyDown={handleKeyDown}
                        placeholder="Ask anything about your review..."
                        className="h-14 flex-1 resize-none rounded-xl border border-white/[0.07] bg-[#050505] px-4 py-3 text-xs text-zinc-300 outline-none placeholder:text-zinc-700 transition focus:border-red-500/30 focus:ring-1 focus:ring-red-500/10"
                    />

                    <button
                        onClick={askAI}
                        disabled={loading || !question.trim()}
                        className="flex w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-[#ef3b39] to-[#b51b1f] text-white shadow-[0_8px_25px_-8px_rgba(239,59,57,0.7)] transition hover:-translate-y-0.5 hover:shadow-[0_12px_30px_-8px_rgba(239,59,57,0.9)] disabled:cursor-not-allowed disabled:opacity-40"
                    >
                        <SendHorizontal className="h-4 w-4" />
                    </button>

                </div>

                <p className="mt-2 px-1 font-mono text-[8px] uppercase tracking-wider text-zinc-800">
                    Enter to send • Shift + Enter for new line
                </p>

            </div>

        </div>
    );
}