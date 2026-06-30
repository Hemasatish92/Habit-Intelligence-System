import {
    CheckCircle2,
    Circle,
    ListTodo
} from "lucide-react";

import { Link } from "react-router-dom";

export default function TodayChecklist({
    habits,
    completedTodayIds,
    onComplete,
    loading
}) {

    if (loading) {
        return (
            <div className="card p-6 animate-pulse space-y-3">
                <div className="h-5 bg-ink-200 rounded w-1/3" />
                <div className="h-10 bg-ink-100 rounded" />
                <div className="h-10 bg-ink-100 rounded" />
            </div>
        );
    }

    if (habits.length === 0) {
        return null;
    }

    const doneCount = habits.filter(
        h => completedTodayIds.has(h.id)
    ).length;

    return (

        <div className="card p-6">

            <div className="flex items-center justify-between mb-4">

                <h2 className="text-lg font-bold text-ink-900 flex items-center gap-2">

                    <ListTodo
                        size={19}
                        className="text-brand-600"
                    />

                    Today's Checklist

                </h2>

                <span className="text-sm font-semibold text-ink-500">

                    {doneCount}/{habits.length} done

                </span>

            </div>

            <div className="space-y-2">

                {habits.map(habit => {

                    const done = completedTodayIds.has(habit.id);

                    return (

                        <button
                            key={habit.id}
                            onClick={() => onComplete(habit.id)}
                            className={`w-full flex items-center gap-3 text-left px-4 py-3 rounded-xl transition-all duration-200 ${
                                done
                                    ? "bg-emerald-50 hover:bg-emerald-100"
                                    : "hover:bg-ink-50"
                            }`}
                        >

                            {done ? (

                                <CheckCircle2
                                    size={22}
                                    className="text-emerald-600 shrink-0"
                                />

                            ) : (

                                <Circle
                                    size={22}
                                    className="text-gray-400 shrink-0"
                                />

                            )}

                            <span
                                className={`flex-1 font-medium ${
                                    done
                                        ? "text-ink-500 line-through"
                                        : "text-ink-900"
                                }`}
                            >

                                {habit.name}

                            </span>

                            <span
                                className="text-xs px-3 py-1 rounded-full bg-ink-100 text-ink-500"
                            >

                                {habit.category || "General"}

                            </span>

                        </button>

                    );

                })}

            </div>

            <Link
                to="/habits"
                className="inline-block mt-5 text-sm font-semibold text-brand-600 hover:text-brand-700"
            >

                Manage habits →

            </Link>

        </div>

    );

}