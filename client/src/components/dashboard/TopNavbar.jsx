import { Bell } from "lucide-react";

export default function TopNavbar() {
    return (
        <header className="
            h-[76px]
            shrink-0
            flex
            items-center
            justify-between
            px-6
            lg:px-10
            bg-[#060812]/80
            backdrop-blur-xl
            border-b
            border-white/[0.06]
        ">

            {/* Page title */}
            <div>

                <h1 className="
                    text-lg
                    font-semibold
                    text-white
                ">
                    Dashboard
                </h1>

                <p className="
                    text-xs
                    text-slate-500
                    mt-1
                ">
                    Welcome back to CodePilot-AI
                </p>

            </div>

            {/* Right side */}
            <div className="flex items-center gap-5">

                <button
                    type="button"
                    className="
                        relative
                        w-9
                        h-9
                        rounded-xl
                        border
                        border-white/[0.07]
                        bg-white/[0.025]
                        flex
                        items-center
                        justify-center
                        text-slate-500
                        hover:text-white
                        hover:border-red-500/20
                        transition
                    "
                >
                    <Bell size={17} />

                    <span className="
                        absolute
                        top-2
                        right-2
                        w-1.5
                        h-1.5
                        rounded-full
                        bg-red-500
                    " />

                </button>

                {/* User */}
                <div className="
                    w-9
                    h-9
                    rounded-xl
                    bg-gradient-to-br
                    from-[#ef3b39]
                    to-[#a8171a]
                    flex
                    items-center
                    justify-center
                    text-sm
                    font-bold
                    text-white
                    shadow-[0_6px_20px_-8px_rgba(239,59,57,0.8)]
                ">
                    U
                </div>

            </div>

        </header>
    );
}