import { Info } from "lucide-react";

export default function StatCard({
    title,
    value,
    icon: Icon,
    tone = "brand",
    tooltip
}) {

    const tones = {
        brand: "bg-brand-50 text-brand-600",
        green: "bg-emerald-50 text-emerald-600",
        orange: "bg-orange-50 text-orange-600",
        purple: "bg-purple-50 text-purple-600"
    };

    return (
        <div className="card p-5 flex items-start justify-between hover:shadow-soft-lg transition-shadow">
            <div>
                <div className="flex items-center gap-1.5">
                    <p className="text-sm text-ink-500 font-medium">{title}</p>
                    {tooltip && (
                        <div className="group relative flex items-center">
                            <Info size={13} className="text-ink-300 cursor-help" />
                            <div className="pointer-events-none absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 rounded-lg bg-ink-900 text-white text-xs leading-relaxed p-2.5 opacity-0 scale-95 group-hover:opacity-100 group-hover:scale-100 transition-all duration-150 z-20 shadow-soft-lg">
                                {tooltip}
                                <div className="absolute top-full left-1/2 -translate-x-1/2 border-4 border-transparent border-t-ink-900" />
                            </div>
                        </div>
                    )}
                </div>
                <p className="text-3xl font-extrabold mt-2 text-ink-900">{value}</p>
            </div>
            {Icon && (
                <div className={`h-11 w-11 rounded-xl flex items-center justify-center ${tones[tone] || tones.brand}`}>
                    <Icon size={20} />
                </div>
            )}
        </div>
    );
}
