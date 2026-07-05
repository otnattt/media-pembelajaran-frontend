export default function StatCard({
  title,
  value,
  icon: Icon,
  gradient = "bg-gradient-primary",
  trend,
}) {
  return (
    <div className="rounded-3xl bg-white p-6 border border-slate-200 shadow-sm hover:shadow-md transition-all duration-300">
      <div className="flex justify-between items-start">

        {/* Kiri */}
        <div className="flex-1">

          {/* Area Judul dibuat tinggi tetap */}
          <div className="h-16">
            <p className="text-[15px] text-slate-500 font-medium leading-relaxed">
              {title}
            </p>
          </div>

          {/* Angka */}
          <p className="text-5xl font-bold text-slate-800">
            {value}
          </p>

          {trend && (
            <p className="text-sm text-slate-500 mt-3">
              {trend}
            </p>
          )}
        </div>

        {/* Icon */}
        <div
          className={`
            h-16
            w-16
            rounded-2xl
            ${gradient}
            flex
            items-center
            justify-center
            shrink-0
            mt-1
          `}
        >
          {Icon && (
            <Icon
              className="h-8 w-8"
              strokeWidth={2.2}
            />
          )}
        </div>

      </div>
    </div>
  );
}