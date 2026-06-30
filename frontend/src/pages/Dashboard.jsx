import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

import StatCard from "../components/StatCard";
import WeeklyChart from "../components/WeeklyChart";
import TodayChecklist from "../components/TodayChecklist";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";
import useTodayHabits from "../hooks/useTodayHabits";

import {
    ListChecks,
    TrendingUp,
    Flame,
    Trophy,
    PlusCircle,
    Sparkles,
    Info
} from "lucide-react";

export default function Dashboard() {

    const {
        habits,
        completedTodayIds,
        loading: habitsLoading,
        completeHabit
    } = useTodayHabits();

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

    const [dashboard, setDashboard] = useState({
        consistency: 0,
        current_streak: 0,
        longest_streak: 0,
        risk: "Low"
    });

    const [weekly, setWeekly] = useState({
        completed: 0,
        total: 0,
        completion_rate: 0,
        strongest_habit: "",
        weakest_habit: "",
        daily_progress: []
    });

    useEffect(() => {
        if (habits.length > 0) {
            loadDashboard();
        }
    }, [habits]);

    async function loadDashboard() {
        setLoading(true);
        setError("");

        try {

            const weeklyResponse = await api.get("/analytics/weekly");
            setWeekly(weeklyResponse.data);

            if (habits.length > 0) {

                const firstHabit = habits[0];

                const analyticsResponse = await api.get(
                    `/analytics/dashboard/${firstHabit.id}`
                );

                setDashboard(analyticsResponse.data);
            }

        } catch (error) {

            console.log(error);
            setError("Could not load dashboard data. Please check your connection.");

        } finally {

            setLoading(false);

        }
    }

    async function handleCompleteHabit(id) {

        await completeHabit(id);

        await loadDashboard();

    }

    const riskTone =
        dashboard.risk === "High"
            ? "text-red-600"
            : dashboard.risk === "Medium"
                ? "text-orange-500"
                : "text-emerald-600";

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-extrabold text-ink-900">
                    Welcome Back 👋
                </h1>

                <p className="text-ink-500 mt-1">
                    Monitor your productivity with AI.
                </p>
            </div>

            {error && <ErrorMessage message={error} />}

            {(loading || habitsLoading) ? (
                <Loader />
            ) : habits.length === 0 ? (

                <div className="card p-10 text-center max-w-xl mx-auto">

                    <div className="mx-auto h-14 w-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
                        <Sparkles size={26} />
                    </div>

                    <h2 className="text-xl font-bold text-ink-900">
                        Let's set up your first habit
                    </h2>

                    <p className="text-ink-500 mt-2 text-sm leading-relaxed">
                        Your dashboard will show streaks, consistency, and AI insights once you start tracking something. It takes about 10 seconds to add your first habit.
                    </p>

                    <Link
                        to="/habits"
                        className="inline-flex items-center gap-2 mt-6 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                    >
                        <PlusCircle size={16} />
                        Create Your First Habit
                    </Link>

                </div>

            ) : (

                <>

                    <TodayChecklist
                        habits={habits}
                        completedTodayIds={completedTodayIds}
                        onComplete={handleCompleteHabit}
                        loading={habitsLoading}
                    />

                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        <StatCard
                            title="Total Habits"
                            value={habits.length}
                            icon={ListChecks}
                            tone="brand"
                            tooltip="The number of habits you are currently tracking."
                        />

                        <StatCard
                            title="Consistency"
                            value={`${dashboard.consistency}%`}
                            icon={TrendingUp}
                            tone="green"
                            tooltip="The percentage of your target days you've actually completed for this habit."
                        />

                        <StatCard
                            title="Current Streak"
                            value={dashboard.current_streak}
                            icon={Flame}
                            tone="orange"
                            tooltip="How many days in a row you've completed this habit without missing a day."
                        />

                        <StatCard
                            title="Longest Streak"
                            value={dashboard.longest_streak}
                            icon={Trophy}
                            tone="purple"
                            tooltip="Your best-ever run of consecutive completions for this habit."
                        />

                    </div>

                    <WeeklyChart
                        title="Weekly Progress"
                        data={weekly.daily_progress || []}
                    />

                    <div className="card p-6">

                        <h2 className="text-lg font-bold text-ink-900 mb-4">
                            Weekly Summary
                        </h2>

                        <div className="grid sm:grid-cols-2 gap-4 text-sm">

                            <div className="flex justify-between py-2 border-b border-ink-100">
                                <span className="text-ink-500">Total Logs</span>
                                <span className="font-semibold text-ink-900">
                                    {weekly.total}
                                </span>
                            </div>

                            <div className="flex justify-between py-2 border-b border-ink-100">
                                <span className="text-ink-500">Completed</span>
                                <span className="font-semibold text-ink-900">
                                    {weekly.completed}
                                </span>
                            </div>

                            <div className="flex justify-between py-2 border-b border-ink-100">
                                <span className="text-ink-500">Completion Rate</span>
                                <span className="font-semibold text-ink-900">
                                    {weekly.completion_rate}%
                                </span>
                            </div>

                            <div className="flex justify-between py-2 border-b border-ink-100">
                                <span className="text-ink-500 flex items-center gap-1">
                                    Risk Level
                                    <span title="How likely you are to break this habit's streak soon, based on recent consistency.">
                                        <Info
                                            size={12}
                                            className="text-ink-300 cursor-help"
                                        />
                                    </span>
                                </span>

                                <span className={`font-semibold ${riskTone}`}>
                                    {dashboard.risk}
                                </span>

                            </div>

                        </div>

                    </div>

                </>

            )}

        </div>
    );
}