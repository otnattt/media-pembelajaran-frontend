export default function Button({
  children,
  className = "",
  variant = "primary",
  type = "button",
  onClick,
}) {

  const variants = {
    primary:
      "bg-blue-600 hover:bg-blue-700 text-white",

    outline:
      "border border-slate-300 bg-white hover:bg-slate-50 text-slate-700",
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-xl px-4 py-2 text-sm font-medium transition ${variants[variant]} ${className}`}
    >
      {children}
    </button>
  );
}