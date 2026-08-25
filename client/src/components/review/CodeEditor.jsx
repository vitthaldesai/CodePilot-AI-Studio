export default function CodeEditor({ code, setCode }) {
    return (
        <div>

            <label className="block text-slate-300 mb-3">
                Paste your code
            </label>

            <textarea
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="// Write your code here..."
                className="
                w-full
                h-80
                bg-slate-900
                border
                border-slate-800
                rounded-2xl
                p-5
                text-white
                font-mono
                outline-none
                focus:border-blue-500
                resize-none
                "
            />

        </div>
    );
}