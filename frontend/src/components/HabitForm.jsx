import { useState, useEffect } from "react";
import { PlusCircle, Save } from "lucide-react";

export default function HabitForm({
    onSubmit,
    editingHabit,
    existingCategories = []
}) {

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [frequencyType, setFrequencyType] = useState("Daily");
    const [target, setTarget] = useState(5);

    useEffect(() => {
        if (editingHabit) {
            setName(editingHabit.name);
            setCategory(editingHabit.category);
            setFrequencyType(editingHabit.frequency_type);
            setTarget(editingHabit.target_per_week);
        }
    }, [editingHabit]);

    function submit(e) {
        e.preventDefault();
        onSubmit({
            name,
            category,
            frequency_type: frequencyType,
            target_per_week: Number(target)
        });
        if (!editingHabit) {
            setName("");
            setCategory("");
            setFrequencyType("Daily");
            setTarget(5);
        }
    }

    const inputClasses = "w-full border border-ink-200 rounded-lg px-3.5 py-2.5 text-sm text-ink-900 placeholder:text-ink-400 focus:outline-none focus:ring-2 focus:ring-brand-500 focus:border-transparent transition";

    return (
        <form
            onSubmit={submit}
            className="card p-6 mb-8"
        >
            <div className="flex items-center gap-2 mb-5">
                {editingHabit ? <Save size={20} className="text-brand-600" /> : <PlusCircle size={20} className="text-brand-600" />}
                <h2 className="text-lg font-bold text-ink-900">
                    {editingHabit ? "Edit Habit" : "Create a New Habit"}
                </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-4">

                <div>
                    <label className="block text-xs font-semibold text-ink-500 mb-1.5">Habit Name</label>
                    <input
                        className={inputClasses}
                        placeholder="e.g. Morning Run"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        required
                    />
                </div>

                <div>
                    <label className="block text-xs font-semibold text-ink-500 mb-1.5">Category</label>
                    <input
                        className={inputClasses}
                        placeholder="e.g. Fitness"
                        value={category}
                        onChange={(e) => setCategory(e.target.value)}
                        list="habit-categories"
                    />
                    <datalist id="habit-categories">
                        {existingCategories.map(cat => (
                            <option key={cat} value={cat} />
                        ))}
                    </datalist>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-ink-500 mb-1.5">Frequency</label>
                    <select
                        className={inputClasses}
                        value={frequencyType}
                        onChange={(e) => setFrequencyType(e.target.value)}
                    >
                        <option>Daily</option>
                        <option>Weekly</option>
                    </select>
                </div>

                <div>
                    <label className="block text-xs font-semibold text-ink-500 mb-1.5">Weekly Target</label>
                    <input
                        type="number"
                        min="1"
                        className={inputClasses}
                        value={target}
                        onChange={(e) => setTarget(e.target.value)}
                    />
                </div>

            </div>

            <button
                className="mt-6 inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-6 py-2.5 rounded-lg transition-colors shadow-soft"
            >
                {editingHabit ? <Save size={16} /> : <PlusCircle size={16} />}
                {editingHabit ? "Update Habit" : "Create Habit"}
            </button>

        </form>
    );
}
