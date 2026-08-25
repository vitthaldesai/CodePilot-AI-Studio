export default function HeroBackground() {
    return (
        <>
            {/* Base Background */}
            <div className="absolute inset-0 -z-30 bg-[#050816]" />

            {/* Top Purple Glow */}
            <div
                className="
                    absolute
                    -top-72
                    left-1/2
                    -translate-x-1/2
                    h-[700px]
                    w-[700px]
                    rounded-full
                    bg-violet-500/20
                    blur-[180px]
                    -z-20
                "
            />

            {/* Left Glow */}
            <div
                className="
                    absolute
                    top-40
                    -left-44
                    h-[450px]
                    w-[450px]
                    rounded-full
                    bg-fuchsia-500/10
                    blur-[170px]
                    -z-20
                "
            />

            {/* Right Glow */}
            <div
                className="
                    absolute
                    top-24
                    -right-44
                    h-[450px]
                    w-[450px]
                    rounded-full
                    bg-sky-400/10
                    blur-[170px]
                    -z-20
                "
            />

            {/* Bottom Glow */}
            <div
                className="
                    absolute
                    bottom-[-220px]
                    left-1/2
                    -translate-x-1/2
                    h-[700px]
                    w-[700px]
                    rounded-full
                    bg-indigo-500/10
                    blur-[220px]
                    -z-20
                "
            />

            {/* Noise Overlay */}
            <div
                className="
                    absolute
                    inset-0
                    opacity-[0.03]
                    bg-[url('https://www.transparenttextures.com/patterns/noise.png')]
                    -z-10
                "
            />
        </>
    );
}