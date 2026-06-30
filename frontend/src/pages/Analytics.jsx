import { useEffect, useState } from "react";
import api from "../services/api";
import WeeklyChart from "../components/WeeklyChart";
import StatCard from "../components/StatCard";

export default function Analytics() {

    const [weekly, setWeekly] = useState({
        completed: 0,
        total: 0,
        completion_rate: 0,
        strongest_habit: "-",
        weakest_habit: "-"
    });

    const [monthly, setMonthly] = useState({
        total_completions: 0,
        completion_rate: 0,
        best_category: "-",
        worst_category: "-"
    });

    useEffect(() => {
        loadAnalytics();
    }, []);

    async function loadAnalytics() {

        try {

            const weeklyResponse = await api.get("/analytics/weekly");
            setWeekly(weeklyResponse.data);

            const monthlyResponse = await api.get("/analytics/monthly");
            setMonthly(monthlyResponse.data);

        }
        catch (error) {
            console.log(error);
        }
    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">
                    Analytics Dashboard
                </h1>

                <p className="text-gray-500 mt-2">
                    Analyze your habit performance.
                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <StatCard
                    title="Completed"
                    value={weekly.completed}
                    color="text-green-600"
                />

                <StatCard
                    title="Total Logs"
                    value={weekly.total}
                    color="text-blue-600"
                />

                <StatCard
                    title="Completion Rate"
                    value={`${weekly.completion_rate}%`}
                    color="text-orange-500"
                />

                <StatCard
                    title="Monthly Rate"
                    value={`${monthly.completion_rate}%`}
                    color="text-purple-600"
                />

            </div>

            <WeeklyChart
                data={[
                    {
                        day: "Completed",
                        completed: weekly.completed
                    },
                    {
                        day: "Remaining",
                        completed: weekly.total - weekly.completed
                    }
                ]}
            />

            <div className="grid md:grid-cols-2 gap-6">

                <div className="bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-xl font-bold mb-4">
                        Weekly Summary
                    </h2>

                    <p>
                        <strong>Strongest Habit:</strong> {weekly.strongest_habit}
                    </p>

                    <p>
                        <strong>Weakest Habit:</strong> {weekly.weakest_habit}
                    </p>

                </div>

                <div className="bg-white rounded-xl shadow-md p-6">

                    <h2 className="text-xl font-bold mb-4">
                        Monthly Summary
                    </h2>

                    <p>
                        <strong>Best Category:</strong> {monthly.best_category}
                    </p>

                    <p>
                        <strong>Worst Category:</strong> {monthly.worst_category}
                    </p>

                </div>

            </div>

        </div>

    );

}