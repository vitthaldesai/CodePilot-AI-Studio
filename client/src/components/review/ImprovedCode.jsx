import { useState } from "react";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { Copy, Check } from "lucide-react";

export default function ImprovedCode({ code, language }) {

    console.log("TYPE:", typeof code);
    console.log("VALUE:", code);

    const [copied, setCopied] = useState(false);

    function copyCode() {

        navigator.clipboard.writeText(code);

        setCopied(true);

        setTimeout(() => {
            setCopied(false);
        }, 2000);

    }

    return (

        <div className="mt-8 bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

            <div className="flex justify-between items-center px-5 py-4 border-b border-slate-800">

                <div>

                    <h2 className="text-xl font-bold">
                        Improved Code
                    </h2>

                    <p className="text-sm text-slate-400 mt-1">
                        AI-generated improved version
                    </p>

                </div>

                <button
                    onClick={copyCode}
                    className="
                        flex
                        items-center
                        gap-2
                        bg-blue-600
                        hover:bg-blue-700
                        px-4
                        py-2
                        rounded-lg
                        transition
                    "
                >

                    {copied ? (
                        <>
                            <Check size={18} />
                            Copied
                        </>
                    ) : (
                        <>
                            <Copy size={18} />
                            Copy
                        </>
                    )}

                </button>

            </div>

            <div className="max-h-[500px] overflow-auto">

                <pre className="p-5 whitespace-pre-wrap overflow-x-auto bg-slate-950 text-white">
                    {code || "// No improved code generated"}
                </pre>

            </div>

        </div>

    );
}