'use client';
const options = [
    { label: "Todas", value: "" },
    { label: "Alta", value: "alta" },
    { label: "Media", value: "media" },
    { label: "Baja", value: "baja" },
];

export default function FilterBar({ active, onChange }) {
    return (
        <div className="flex gap-2 mb-4">
            {options.map((opt) => (
                <button
                    key={opt.value}
                    onClick={() => onChange(opt.value)}
                    className={`px-3 py-1 rounded 
            ${active === opt.value
                            ? "bg-[#312b2b] text-gray-300 shadow-[3px_3px_10px_#141111,-3px_-3px_10px_#4e4545]"
                            : "bg-[#312b2b] text-gray-500 hover:text-gray-300 hover:shadow-[5px_5px_10px_#141111,-5px_-5px_10px_#4e4545] shadow-[inset_5px_5px_10px_#141111,inset_-5px_-5px_10px_#4e4545]"}`}
                >
                    {opt.label}
                </button>
            ))}
        </div>
    );
}
