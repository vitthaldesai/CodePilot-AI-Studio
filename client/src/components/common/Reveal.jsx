import { useEffect, useRef, useState } from "react";

// Fades + rises elements into view on scroll. Deliberately avoids CSS `transform`
// (uses margin-top instead) so it's safe to wrap around anything that contains a
// `position: fixed` child — a transform on an ancestor would otherwise trap that
// child inside it instead of the viewport.
export default function Reveal({ children, className = "", delay = 0 }) {
    const ref = useRef(null);
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        const node = ref.current;
        if (!node) return;

        const observer = new IntersectionObserver(
            ([entry]) => {
                if (entry.isIntersecting) {
                    setVisible(true);
                    observer.unobserve(node);
                }
            },
            { threshold: 0.15 }
        );

        observer.observe(node);
        return () => observer.disconnect();
    }, []);

    return (
        <div
            ref={ref}
            className={className}
            style={{
                opacity: visible ? 1 : 0,
                marginTop: visible ? 0 : 22,
                transition: `opacity 700ms ease-out ${delay}ms, margin-top 700ms ease-out ${delay}ms`,
            }}
        >
            {children}
        </div>
    );
}
