import { FaClipboardList } from "react-icons/fa";

export default function EmptyState() {

    return (

        <div className="bg-white rounded-xl shadow p-12 text-center">

            <FaClipboardList
                size={60}
                className="mx-auto text-gray-400"
            />

            <h2 className="text-2xl font-bold mt-5">

                No Habits Yet

            </h2>

            <p className="text-gray-500 mt-2">

                Create your first habit to begin tracking.

            </p>

        </div>

    );

}