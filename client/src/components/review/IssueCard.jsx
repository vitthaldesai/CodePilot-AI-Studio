export default function IssueCard({
    title,
    category,
    severity,
    description,
    line,
}) {

    const severityColor = {
        High: "bg-red-500/20 text-red-400",
        Medium: "bg-yellow-500/20 text-yellow-400",
        Low: "bg-green-500/20 text-green-400",
    };

    return (
        <div className="bg-slate-900 border border-slate-800 rounded-2xl p-5">

            <div className="flex justify-between items-start">

                <div>

                    <h3 className="font-semibold text-lg">
                        {title}
                    </h3>

                    <div className="flex gap-2 mt-2">

                        <span className="px-3 py-1 rounded-full bg-blue-500/20 text-blue-400 text-xs">
                            {category}
                        </span>

                        <span
                            className={`px-3 py-1 rounded-full text-xs ${severityColor[severity] ||
                                "bg-slate-700 text-white"
                                }`}
                        >
                            {severity}
                        </span>

                    </div>

                </div>

            </div>

            <p className="text-slate-400 mt-4">
                {description}
            </p>

            <p className="text-sm text-slate-500 mt-3">
                Line: {line}
            </p>

        </div>
    );
}