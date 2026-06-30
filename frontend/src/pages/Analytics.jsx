import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import api from "../services/api";
import WeeklyChart from "../components/WeeklyChart";
import StatCard from "../components/StatCard";
import Loader from "../components/Loader";
import ErrorMessage from "../components/ErrorMessage";

import {
    CheckCircle2,
    ListChecks,
    Percent,
    CalendarDays,
    BarChart3,
    PlusCircle
} from "lucide-react";

export default function Analytics() {

    const [loading, setLoading] = useState(true);
    const [error, setError] = useState("");

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
        setLoading(true);
        setError("");

        try {
            const weeklyResponse = await api.get("/analytics/weekly");
            setWeekly(weeklyResponse.data);

            const monthlyResponse = await api.get("/analytics/monthly");
            setMonthly(monthlyResponse.data);
        }
        catch (error) {
            console.log(error);
            setError("Could not load analytics data.");
        }
        finally {
            setLoading(false);
        }
    }

    return (

        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-extrabold text-ink-900">
                    Analytics Dashboard
                </h1>
                <p className="text-ink-500 mt-1">
                    Analyze your habit performance.
                </p>
            </div>

            {error && <ErrorMessage message={error} />}

            {loading ? (
                <Loader />
            ) : weekly.total === 0 ? (
                <div className="card p-10 text-center max-w-xl mx-auto">
                    <div className="mx-auto h-14 w-14 rounded-2xl bg-brand-50 text-brand-600 flex items-center justify-center mb-5">
                        <BarChart3 size={26} />
                    </div>
                    <h2 className="text-xl font-bold text-ink-900">
                        Nothing to analyze yet
                    </h2>
                    <p className="text-ink-500 mt-2 text-sm leading-relaxed">
                        Charts and completion rates will appear here once you start logging habit completions.
                    </p>
                    <Link
                        to="/habits"
                        className="inline-flex items-center gap-2 mt-6 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors"
                    >
                        <PlusCircle size={16} />
                        Go to Habits
                    </Link>
                </div>
            ) : (
                <>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        <StatCard title="Completed" value={weekly.completed} icon={CheckCircle2} tone="green" tooltip="Total habit completions logged this week." />
                        <StatCard title="Total Logs" value={weekly.total} icon={ListChecks} tone="brand" tooltip="Every log entry this week, including skipped or missed days." />
                        <StatCard title="Completion Rate" value={`${weekly.completion_rate}%`} icon={Percent} tone="orange" tooltip="Completed logs divided by total logs this week." />
                        <StatCard title="Monthly Rate" value={`${monthly.completion_rate}%`} icon={CalendarDays} tone="purple" tooltip="Your overall completion rate across the last 30 days." />

                    </div>

                    <WeeklyChart
                        data={[
                            { day: "Completed", completed: weekly.completed },
                            { day: "Remaining", completed: Math.max(weekly.total - weekly.completed, 0) }
                        ]}
                    />

                    <div className="grid md:grid-cols-2 gap-6">

                        <div className="card p-6">
                            <h2 className="text-lg font-bold text-ink-900 mb-4">
                                Weekly Summary
                            </h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b border-ink-100">
                                    <span className="text-ink-500">Strongest Habit</span>
                                    <span className="font-semibold text-ink-900">{weekly.strongest_habit}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-ink-100">
                                    <span className="text-ink-500">Weakest Habit</span>
                                    <span className="font-semibold text-ink-900">{weekly.weakest_habit}</span>
                                </div>
                            </div>
                        </div>

                        <div className="card p-6">
                            <h2 className="text-lg font-bold text-ink-900 mb-4">
                                Monthly Summary
                            </h2>
                            <div className="space-y-3 text-sm">
                                <div className="flex justify-between py-2 border-b border-ink-100">
                                    <span className="text-ink-500">Best Category</span>
                                    <span className="font-semibold text-ink-900">{monthly.best_category}</span>
                                </div>
                                <div className="flex justify-between py-2 border-b border-ink-100">
                                    <span className="text-ink-500">Worst Category</span>
                                    <span className="font-semibold text-ink-900">{monthly.worst_category}</span>
                                </div>
                            </div>
                        </div>

                    </div>
                </>
            )}

        </div>

    );
}
