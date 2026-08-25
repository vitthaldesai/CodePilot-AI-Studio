export default function Button({
    children,
    className = "",
    ...props
}) {
    return (
        <button
            {...props}
            className={`
                inline-flex
                items-center
                justify-center
                font-medium
                transition-all
                duration-300
                ${className}
            `}
        >
            {children}
        </button>
    );
}