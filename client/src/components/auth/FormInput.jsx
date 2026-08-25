export default function FormInput({
    label,
    name,
    type = "text",
    placeholder,
    value,
    onChange,
}) {
    return (
        <div className="mb-5">

            <label className="block text-sm text-slate-300 mb-2">
                {label}
            </label>


            <input
                name={name}
                type={type}
                placeholder={placeholder}
                value={value}
                onChange={onChange}
                className="
                w-full 
                bg-slate-800
                border
                border-slate-700
                rounded-xl
                px-4
                py-3
                text-white
                outline-none
                focus:border-blue-500
                "
            />

        </div>
    );
}