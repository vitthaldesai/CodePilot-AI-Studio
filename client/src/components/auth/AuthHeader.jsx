export default function AuthHeader({
    title,
    description,
}) {
    return (
        <div className="text-center mb-8">

            <h1 className="text-3xl font-bold">
                {title}
            </h1>


            <p className="text-slate-400 mt-3">
                {description}
            </p>

        </div>
    );
}