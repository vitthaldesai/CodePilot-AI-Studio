import {
    User,
    Mail,
    Calendar,
    BadgeCheck,
    FileCode2,
    ShieldCheck,
} from "lucide-react";

export default function ProfileCard({ user }) {

    const name = user?.name || "User";

    const email =
        user?.email || "No email available";

    const initial =
        name.charAt(0).toUpperCase();


    let joinedDate = "Recently";

    if (user?.created_at) {

        joinedDate = new Date(
            user.created_at
        ).toLocaleDateString(
            "en-US",
            {
                month: "long",
                year: "numeric"
            }
        );

    }


    return (

        <div>

            {/* =================================================
                PROFILE HEADER
            ================================================= */}

            <div className="border-b border-slate-800 p-6 sm:p-8">

                <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                    {/* Avatar */}

                    <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-gradient-to-br from-rose-500 to-red-600 text-4xl font-bold text-white shadow-[0_0_35px_rgba(239,68,68,0.2)]">

                        {initial}

                    </div>


                    {/* User Info */}

                    <div>

                        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">

                            <h2 className="text-2xl font-bold tracking-tight sm:text-3xl">

                                {name}

                            </h2>


                            <span className="inline-flex w-fit items-center gap-1.5 rounded-full border border-rose-500/20 bg-rose-500/10 px-3 py-1 text-xs font-medium text-rose-300">

                                <BadgeCheck size={14} />

                                Active Account

                            </span>

                        </div>


                        <p className="mt-2 text-sm text-slate-500">

                            AI Code Review User

                        </p>

                    </div>

                </div>

            </div>


            {/* =================================================
                ACCOUNT INFORMATION
            ================================================= */}

            <div className="p-6 sm:p-8">

                <div className="mb-5">

                    <h3 className="text-lg font-semibold">

                        Account Information

                    </h3>

                    <p className="mt-1 text-sm text-slate-500">

                        Your CodePilot-AI account details.

                    </p>

                </div>


                <div className="grid gap-4 md:grid-cols-2">

                    {/* Email */}

                    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-[#09090c] p-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400">

                            <Mail size={19} />

                        </div>


                        <div className="min-w-0">

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-600">

                                Email

                            </p>

                            <p className="mt-1 truncate text-sm text-slate-200">

                                {email}

                            </p>

                        </div>

                    </div>


                    {/* Account Type */}

                    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-[#09090c] p-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">

                            <User size={19} />

                        </div>


                        <div>

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-600">

                                Account Type

                            </p>

                            <p className="mt-1 text-sm text-slate-200">

                                Developer

                            </p>

                        </div>

                    </div>


                    {/* Joined */}

                    <div className="flex items-center gap-4 rounded-2xl border border-slate-800 bg-[#09090c] p-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-pink-500/20 bg-pink-500/10 text-pink-400">

                            <Calendar size={19} />

                        </div>


                        <div>

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-600">

                                Joined

                            </p>

                            <p className="mt-1 text-sm text-slate-200">

                                {joinedDate}

                            </p>

                        </div>

                    </div>


                    {/* AI Reviewer */}

                    <div className="flex items-center gap-4 rounded-2xl border border-rose-500/20 bg-[#09090c] p-4">

                        <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400">

                            <ShieldCheck size={19} />

                        </div>


                        <div>

                            <p className="text-xs font-medium uppercase tracking-wide text-slate-600">

                                AI Reviewer

                            </p>

                            <p className="mt-1 flex items-center gap-2 text-sm text-slate-200">

                                Enabled

                                <span className="h-1.5 w-1.5 rounded-full bg-rose-500" />

                            </p>

                        </div>

                    </div>

                </div>


                {/* =================================================
                    CAPABILITIES
                ================================================= */}

                <div className="mt-10">

                    <div className="mb-5">

                        <h3 className="text-lg font-semibold">

                            CodePilot Capabilities

                        </h3>

                        <p className="mt-1 text-sm text-slate-500">

                            Your available AI-powered development tools.

                        </p>

                    </div>


                    <div className="grid gap-4 sm:grid-cols-2">

                        {/* Reviews */}

                        <div className="rounded-2xl border border-slate-800 bg-[#09090c] p-6 text-center">

                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-rose-500/20 bg-rose-500/10 text-rose-400">

                                <FileCode2 size={21} />

                            </div>


                            <h3 className="text-3xl font-bold">

                                ∞

                            </h3>


                            <p className="mt-1 text-sm text-slate-500">

                                Reviews Supported

                            </p>

                        </div>


                        {/* AI Analysis */}

                        <div className="rounded-2xl border border-slate-800 bg-[#09090c] p-6 text-center">

                            <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-xl border border-red-500/20 bg-red-500/10 text-red-400">

                                <ShieldCheck size={21} />

                            </div>


                            <h3 className="text-3xl font-bold">

                                AI

                            </h3>


                            <p className="mt-1 text-sm text-slate-500">

                                Powered Analysis

                            </p>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}