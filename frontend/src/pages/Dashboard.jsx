import { useEffect, useState } from "react";

import api from "../services/api";

import StatCard from "../components/StatCard";
import WeeklyChart from "../components/WeeklyChart";

export default function Dashboard() {

    const [habits, setHabits] = useState([]);

    const [dashboard, setDashboard] = useState({
        consistency: 0,
        current_streak: 0,
        longest_streak: 0,
        risk: "Low"
    });

    const [weekly, setWeekly] = useState({
        completed: 0,
        total: 0,
        completion_rate: 0
    });

    useEffect(() => {

        loadDashboard();

    }, []);

    async function loadDashboard() {

        try {

            // Load Habits
            const habitResponse = await api.get("/habits/");

            setHabits(habitResponse.data);

            // Load Weekly Summary
            const weeklyResponse = await api.get("/analytics/weekly");

            setWeekly(weeklyResponse.data);

            // Load Dashboard Analytics
            if (habitResponse.data.length > 0) {

                const firstHabit = habitResponse.data[0];

                const analyticsResponse = await api.get(
                    `/analytics/dashboard/${firstHabit.id}`
                );

                setDashboard(analyticsResponse.data);

            }

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    Welcome Back 👋

                </h1>

                <p className="text-gray-500 mt-2">

                    Monitor your productivity with AI.

                </p>

            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">

                <StatCard
                    title="Total Habits"
                    value={habits.length}
                    color="text-blue-600"
                />

                <StatCard
                    title="Consistency"
                    value={`${dashboard.consistency}%`}
                    color="text-green-600"
                />

                <StatCard
                    title="Current Streak"
                    value={dashboard.current_streak}
                    color="text-orange-500"
                />

                <StatCard
                    title="Longest Streak"
                    value={dashboard.longest_streak}
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

            <div className="bg-white rounded-xl shadow-md p-6">

                <h2 className="text-2xl font-bold mb-4">

                    Weekly Summary

                </h2>

                <div className="space-y-2">

                    <p>

                        <strong>Total Logs:</strong> {weekly.total}

                    </p>

                    <p>

                        <strong>Completed:</strong> {weekly.completed}

                    </p>

                    <p>

                        <strong>Completion Rate:</strong> {weekly.completion_rate}%

                    </p>

                    <p>

                        <strong>Risk Level:</strong> {dashboard.risk}

                    </p>

                </div>

            </div>

        </div>

    );

}