import { useState, useEffect } from "react";

export default function HabitForm({

    onSubmit,

    editingHabit

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

    }

    return (

        <form
            onSubmit={submit}
            className="bg-white rounded-xl shadow-md p-6 mb-8"
        >

            <h2 className="text-2xl font-bold mb-6">

                {editingHabit ? "Edit Habit" : "Create Habit"}

            </h2>

            <div className="grid md:grid-cols-2 gap-5">

                <input

                    className="border rounded-lg p-3"

                    placeholder="Habit Name"

                    value={name}

                    onChange={(e)=>setName(e.target.value)}

                />

                <input

                    className="border rounded-lg p-3"

                    placeholder="Category"

                    value={category}

                    onChange={(e)=>setCategory(e.target.value)}

                />

                <select

                    className="border rounded-lg p-3"

                    value={frequencyType}

                    onChange={(e)=>setFrequencyType(e.target.value)}

                >

                    <option>Daily</option>

                    <option>Weekly</option>

                </select>

                <input

                    type="number"

                    className="border rounded-lg p-3"

                    value={target}

                    onChange={(e)=>setTarget(e.target.value)}

                />

            </div>

            <button

                className="mt-6 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"

            >

                {editingHabit ? "Update Habit" : "Create Habit"}

            </button>

        </form>

    );

}