import {
    Pencil,
    Trash2,
    CheckCircle2,
    Circle,
    Repeat,
    Target,
    Undo2
} from "lucide-react";

const categoryColors = [
    "from-brand-400 to-brand-600",
    "from-emerald-400 to-emerald-600",
    "from-orange-400 to-orange-600",
    "from-pink-400 to-pink-600",
    "from-cyan-400 to-cyan-600",
];

function colorFor(name = "") {
    const idx =
        name
            .split("")
            .reduce((a, c) => a + c.charCodeAt(0), 0) %
        categoryColors.length;

    return categoryColors[idx];
}

export default function HabitCard({
    habit,
    onEdit,
    onDelete,
    onComplete,
    completedToday
}) {

    return (

        <div
            className={`card p-5 hover:shadow-soft-lg transition-shadow flex flex-col ${
                completedToday
                    ? "ring-2 ring-emerald-300"
                    : ""
            }`}
        >

            <div className="flex items-start justify-between gap-3">

                <div className="flex items-center gap-3 min-w-0">

                    <div
                        className={`h-11 w-11 shrink-0 rounded-xl bg-gradient-to-br ${colorFor(
                            habit.name
                        )} flex items-center justify-center text-white font-bold text-lg`}
                    >
                        {habit.name?.[0]?.toUpperCase() || "H"}
                    </div>

                    <div className="min-w-0">

                        <h2 className="text-base font-bold text-ink-900 truncate">
                            {habit.name}
                        </h2>

                        <p className="text-sm text-ink-400 truncate">
                            {habit.category || "Uncategorized"}
                        </p>

                    </div>

                </div>

                <span className="shrink-0 inline-flex items-center gap-1 bg-brand-50 text-brand-700 text-xs font-semibold px-2.5 py-1 rounded-full">

                    <Repeat size={12} />

                    {habit.frequency_type}

                </span>

            </div>

            <div className="mt-4 flex items-center gap-2 text-sm text-ink-500">

                <Target
                    size={15}
                    className="text-ink-400"
                />

                <span>

                    <span className="font-semibold text-ink-700">

                        {habit.target_per_week}

                    </span>

                    {" "}times / week

                </span>

            </div>

            {completedToday && (

                <div className="mt-3 inline-flex items-center gap-2 bg-emerald-50 text-emerald-700 px-3 py-1 rounded-full text-xs font-semibold w-fit">

                    <CheckCircle2 size={14} />

                    Completed Today

                </div>

            )}

            <div className="flex gap-2 mt-5 pt-4 border-t border-ink-100">

                <button
                    onClick={() => onComplete(habit.id)}
                    className={`flex-1 inline-flex items-center justify-center gap-2 text-sm font-semibold px-3 py-2.5 rounded-lg transition-all duration-200 ${
                        completedToday
                            ? "bg-orange-100 text-orange-700 hover:bg-orange-200"
                            : "bg-emerald-50 text-emerald-700 hover:bg-emerald-100"
                    }`}
                >

                    {completedToday ? (

                        <Undo2 size={16} />

                    ) : (

                        <CheckCircle2 size={16} />

                    )}

                    {completedToday
                        ? "Undo Today"
                        : "Mark Complete"}

                </button>

                <button
                    onClick={() => onEdit(habit)}
                    aria-label="Edit habit"
                    className="inline-flex items-center justify-center bg-ink-100 text-ink-600 hover:bg-ink-200 px-3 py-2.5 rounded-lg transition-colors"
                >

                    <Pencil size={16} />

                </button>

                <button
                    onClick={() => onDelete(habit.id)}
                    aria-label="Delete habit"
                    className="inline-flex items-center justify-center bg-red-50 text-red-600 hover:bg-red-100 px-3 py-2.5 rounded-lg transition-colors"
                >

                    <Trash2 size={16} />

                </button>

            </div>

        </div>

    );

}