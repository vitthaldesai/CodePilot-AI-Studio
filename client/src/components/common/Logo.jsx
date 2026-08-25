import { Cpu } from "lucide-react";

export default function Logo() {
    return (
        <div className="flex items-center gap-3 cursor-pointer">

            <div className="
                w-10
                h-10
                rounded-full
                bg-gradient-to-br
                from-sky-400
                to-cyan-500
                flex
                items-center
                justify-center
                shadow-[0_0_30px_rgba(56,189,248,.45)]
            ">
                <Cpu size={20} className="text-white" />
            </div>

            <div className="leading-tight">

                <h1 className="text-lg font-semibold tracking-tight text-white">
                    CodePilot
                </h1>

                <p className="text-xs text-sky-400 font-medium tracking-widest uppercase">
                    AI REVIEW
                </p>

            </div>

        </div>
    );
}