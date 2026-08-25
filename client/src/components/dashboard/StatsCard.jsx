export default function StatsCard({
    title,
    value,
    change,
    icon,
}) {
    return (
        <div className="
            group
            relative
            overflow-hidden
            rounded-2xl
            border border-white/[0.07]
            bg-white/[0.025]
            p-6
            backdrop-blur-xl
            hover:border-red-500/20
            hover:bg-white/[0.04]
            transition-all
            duration-300
        ">

            <div className="
                absolute
                -right-10
                -top-10
                w-28
                h-28
                rounded-full
                bg-red-600/10
                blur-3xl
                opacity-0
                group-hover:opacity-100
                transition
            " />

            <div className="relative flex justify-between items-start">

                <div>
                    <p className="text-sm text-slate-500">
                        {title}
                    </p>

                    <h2 className="text-3xl font-bold mt-4 text-white tabular-nums">
                        {value}
                    </h2>

                    <p className="text-xs text-slate-500 mt-2">
                        {change}
                    </p>
                </div>

                <div className="
                    w-10
                    h-10
                    rounded-xl
                    bg-red-500/10
                    border border-red-500/15
                    flex
                    items-center
                    justify-center
                    text-red-400
                    group-hover:bg-red-500/15
                    transition
                ">
                    {icon}
                </div>

            </div>
        </div>
    );
}