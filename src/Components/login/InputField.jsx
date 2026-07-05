import { AlertCircle } from "lucide-react";

export default function InputField({
    id,
    label,
    value,
    onChange,
    type = "text",
    placeholder = "",
    autoComplete = "",
    required = false,
    error = "",
    icon,
    suffix,
}) {
    return (
        <div>
            <label
                htmlFor={id}
                className="block text-sm font-medium text-slate-700 mb-1.5"
            >
                {label}
            </label>

            <div
                className={`group flex items-center gap-2 rounded-xl border bg-white px-3.5 py-2.5 transition-all duration-200 ${
                    error
                        ? "border-red-500"
                        : "border-slate-300 hover:border-slate-400 focus-within:border-blue-500"
                }`}
            >
                {icon && (
                    <span
                        className={`transition-colors ${
                            error
                                ? "text-red-500"
                                : "text-slate-400 group-focus-within:text-blue-600"
                        }`}
                    >
                        {icon}
                    </span>
                )}

                <input
                    id={id}
                    type={type}
                    value={value}
                    onChange={onChange}
                    placeholder={placeholder}
                    autoComplete={autoComplete}
                    required={required}
                    className="flex-1 bg-transparent outline-none text-sm text-slate-900 placeholder:text-slate-400"
                />

                {suffix && <div>{suffix}</div>}
            </div>

            {error && (
                <div className="mt-2 flex items-center gap-2 rounded-lg bg-red-50 border border-red-200 px-3 py-2 animate-fade-in">
                    <AlertCircle className="w-4 h-4 text-red-500 flex-shrink-0" />

                    <p className="text-sm text-red-600 font-medium">
                        {error}
                    </p>
                </div>
            )}
        </div>
    );
}