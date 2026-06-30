import {
    FaEdit,
    FaTrash,
    FaCheckCircle
} from "react-icons/fa";

export default function HabitCard({
    habit,
    onEdit,
    onDelete,
    onComplete
}) {

    return (

        <div className="bg-white rounded-xl shadow-md p-6 hover:shadow-lg transition">

            <div className="flex justify-between">

                <div>

                    <h2 className="text-xl font-bold">
                        {habit.name}
                    </h2>

                    <p className="text-gray-500">
                        {habit.category}
                    </p>

                </div>

                <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full">

                    {habit.frequency_type}

                </span>

            </div>

            <p className="mt-4">

                <strong>Weekly Target:</strong> {habit.target_per_week}

            </p>

            <div className="flex gap-3 mt-6">

                <button
                    onClick={() => onComplete(habit.id)}
                    className="bg-green-500 text-white px-4 py-2 rounded-lg"
                >
                    <FaCheckCircle />
                </button>

                <button
                    onClick={() => onEdit(habit)}
                    className="bg-yellow-500 text-white px-4 py-2 rounded-lg"
                >
                    <FaEdit />
                </button>

                <button
                    onClick={() => onDelete(habit.id)}
                    className="bg-red-500 text-white px-4 py-2 rounded-lg"
                >
                    <FaTrash />
                </button>

            </div>

        </div>

    );

}