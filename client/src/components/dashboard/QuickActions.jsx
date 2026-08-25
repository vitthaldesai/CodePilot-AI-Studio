import { Link } from "react-router-dom";
import { Code2, History, User, ArrowUpRight } from "lucide-react";

const actions = [
    {
        title: "Review Code",
        description: "Start a new AI code review",
        icon: Code2,
        path: "/review",
    },
    {
        title: "View History",
        description: "Check previous reviews",
        icon: History,
        path: "/history",
    },
    {
        title: "Profile",
        description: "Manage your account",
        icon: User,
        path: "/profile",
    },
];

export default function QuickActions() {
    return (
        <section className="mt-8">

            <h2 className="text-lg font-semibold text-white mb-5">
                Quick Actions
            </h2>

            <div className="grid md:grid-cols-3 gap-4">

                {actions.map((action) => {

                    const Icon = action.icon;

                    return (
                        <Link
                            key={action.title}
                            to={action.path}
                            className="
                                group
                                relative
                                rounded-2xl
                                border border-white/[0.07]
                                bg-white/[0.025]
                                p-5
                                hover:border-red-500/20
                                hover:bg-white/[0.04]
                                transition-all
                                duration-300
                            "
                        >

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
                            ">
                                <Icon size={19} />
                            </div>

                            <div className="mt-4 flex justify-between items-start">

                                <div>
                                    <h3 className="font-semibold text-white">
                                        {action.title}
                                    </h3>

                                    <p className="text-sm text-slate-500 mt-1">
                                        {action.description}
                                    </p>
                                </div>

                                <ArrowUpRight
                                    size={16}
                                    className="
                                        text-slate-600
                                        group-hover:text-red-400
                                        transition
                                    "
                                />

                            </div>

                        </Link>
                    );
                })}

            </div>

        </section>
    );
}