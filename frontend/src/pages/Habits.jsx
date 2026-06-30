import { useMemo, useRef, useState } from "react";

import api from "../services/api";

import HabitCard from "../components/HabitCard";
import HabitForm from "../components/HabitForm";
import SkeletonCard from "../components/SkeletonCard";
import EmptyState from "../components/EmptyState";
import ErrorMessage from "../components/ErrorMessage";
import useTodayHabits from "../hooks/useTodayHabits";

import { toast } from "react-toastify";
import { LayoutGrid } from "lucide-react";

export default function Habits() {

    const {
        habits,
        completedTodayIds,
        loading,
        error,
        reload,
        completeHabit
    } = useTodayHabits();

    const [editingHabit, setEditingHabit] = useState(null);
    const [activeCategory, setActiveCategory] = useState("All");
    const formRef = useRef(null);

    function scrollToForm() {
        formRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
        formRef.current?.querySelector("input")?.focus();
    }

    const categories = useMemo(() => {
        const set = new Set(
            habits.map(h => (h.category || "Uncategorized").trim() || "Uncategorized")
        );
        return ["All", ...Array.from(set).sort()];
    }, [habits]);

    const groupedHabits = useMemo(() => {
        const filtered = activeCategory === "All"
            ? habits
            : habits.filter(h => (h.category || "Uncategorized").trim() === activeCategory);

        const groups = {};
        filtered.forEach(habit => {
            const key = (habit.category || "Uncategorized").trim() || "Uncategorized";
            if (!groups[key]) groups[key] = [];
            groups[key].push(habit);
        });
        return groups;
    }, [habits, activeCategory]);

    async function saveHabit(data) {
        try {
            if (editingHabit) {
                await api.put(`/habits/${editingHabit.id}`, data);
                setEditingHabit(null);
                toast.success("Habit updated");
            }
            else {
                await api.post("/habits/", data);
                toast.success("Habit created");
            }
            reload();
        }
        catch (err) {
            console.log(err);
            toast.error("Something went wrong saving this habit");
        }
    }

    async function deleteHabit(id) {
        try {
            await api.delete(`/habits/${id}`);
            toast.success("Habit deleted");
            reload();
        }
        catch (err) {
            console.log(err);
            toast.error("Could not delete habit");
        }
    }

    return (
        <div>

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-ink-900">
                    Your Habits
                </h1>
                <p className="text-ink-500 mt-1">
                    Create, track, and stay accountable to your goals.
                </p>
            </div>

            {error && <div className="mb-6"><ErrorMessage message={error} /></div>}

            <div ref={formRef}>
                <HabitForm
                    onSubmit={saveHabit}
                    editingHabit={editingHabit}
                    existingCategories={categories.filter(c => c !== "All")}
                />
            </div>

            {loading ? (
                <div className="grid lg:grid-cols-2 gap-6">
                    <SkeletonCard />
                    <SkeletonCard />
                </div>
            ) : habits.length === 0 ? (
                <button onClick={scrollToForm} className="w-full text-left">
                    <EmptyState />
                </button>
            ) : (
                <>
                    <div className="flex items-center gap-2 mb-6 overflow-x-auto pb-1">
                        <LayoutGrid size={16} className="text-ink-400 shrink-0" />
                        {categories.map(cat => (
                            <button
                                key={cat}
                                onClick={() => setActiveCategory(cat)}
                                className={`shrink-0 text-sm font-semibold px-3.5 py-1.5 rounded-full transition-colors ${
                                    activeCategory === cat
                                        ? "bg-brand-600 text-white"
                                        : "bg-ink-100 text-ink-600 hover:bg-ink-200"
                                }`}
                            >
                                {cat}
                            </button>
                        ))}
                    </div>

                    <div className="space-y-10">
                        {Object.entries(groupedHabits).map(([category, items]) => (
                            <div key={category}>
                                <h2 className="text-sm font-bold text-ink-400 uppercase tracking-wider mb-4">
                                    {category}
                                    <span className="ml-2 text-ink-300 font-medium normal-case">
                                        {items.length} habit{items.length !== 1 ? "s" : ""}
                                    </span>
                                </h2>
                                <div className="grid lg:grid-cols-2 gap-6">
                                    {items.map(habit => (
                                        <HabitCard
                                            key={habit.id}
                                            habit={habit}
                                            onEdit={setEditingHabit}
                                            onDelete={deleteHabit}
                                            onComplete={completeHabit}
                                            completedToday={completedTodayIds.has(habit.id)}
                                        />
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                </>
            )}

        </div>
    );
}
