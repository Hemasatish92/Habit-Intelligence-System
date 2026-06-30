import { useEffect, useState } from "react";
import { Link } from "react-router-dom";

import api from "../services/api";

import AIInsightCard from "../components/AIInsightCard";
import { Sparkles, MessageSquareText, BarChart2, Bot } from "lucide-react";
import { toast } from "react-toastify";

export default function AIInsights() {

    const [habits, setHabits] = useState([]);
    const [selectedHabit, setSelectedHabit] = useState("");
    const [recommendation, setRecommendation] = useState("");
    const [summary, setSummary] = useState("");
    const [analysis, setAnalysis] = useState("");
    const [busy, setBusy] = useState("");

    useEffect(() => {
        loadHabits();
    }, []);

    async function loadHabits() {
        try {
            const response = await api.get("/habits/");
            setHabits(response.data);
            if (response.data.length > 0) {
                setSelectedHabit(response.data[0].id);
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    async function generateRecommendation() {
        setBusy("recommendation");
        try {
            const response = await api.post(`/ai/recommendation/${selectedHabit}`);
            setRecommendation(response.data.recommendation);
            localStorage.setItem("ai_used", "1");
        }
        catch (error) {
            console.log(error);
            toast.error("Could not generate recommendation");
        }
        finally {
            setBusy("");
        }
    }

    async function generateSummary() {
        setBusy("summary");
        try {
            const response = await api.post("/ai/summary");
            setSummary(response.data.summary);
            localStorage.setItem("ai_used", "1");
        }
        catch (error) {
            console.log(error);
            toast.error("Could not generate summary");
        }
        finally {
            setBusy("");
        }
    }

    async function analyzeHabit() {
        setBusy("analysis");
        try {
            const response = await api.post(`/ai/analyze/${selectedHabit}`);
            setAnalysis(response.data.analysis);
            localStorage.setItem("ai_used", "1");
        }
        catch (error) {
            console.log(error);
            toast.error("Could not analyze habit");
        }
        finally {
            setBusy("");
        }
    }

    const btnBase = "inline-flex items-center gap-2 text-white text-sm font-semibold px-5 py-2.5 rounded-lg transition-colors disabled:opacity-60 disabled:cursor-not-allowed";

    return (
        <div className="space-y-8">

            <div>
                <h1 className="text-3xl font-extrabold text-ink-900 flex items-center gap-2">
                    AI Habit Coach <Sparkles className="text-brand-500" size={26} />
                </h1>
                <p className="text-ink-500 mt-1">
                    Generate personalized AI insights from your habit data.
                </p>
            </div>

            <div className="card p-6">

                <label className="block text-sm font-semibold text-ink-700 mb-2">
                    Select Habit
                </label>

                {habits.length === 0 ? (
                    <div className="text-center py-4">
                        <p className="text-sm text-ink-500 mb-3">Create a habit first to unlock AI insights.</p>
                        <Link
                            to="/habits"
                            className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white text-sm font-semibold px-4 py-2 rounded-lg transition-colors"
                        >
                            Go to Habits
                        </Link>
                    </div>
                ) : (
                    <select
                        className="border border-ink-200 rounded-lg p-3 w-full text-sm focus:outline-none focus:ring-2 focus:ring-brand-500"
                        value={selectedHabit}
                        onChange={(e) => setSelectedHabit(e.target.value)}
                    >
                        {habits.map(habit => (
                            <option key={habit.id} value={habit.id}>
                                {habit.name}
                            </option>
                        ))}
                    </select>
                )}

                <div className="flex flex-wrap gap-3 mt-6">

                    <button
                        onClick={generateRecommendation}
                        disabled={!selectedHabit || busy === "recommendation"}
                        className={`${btnBase} bg-brand-600 hover:bg-brand-700`}
                    >
                        <MessageSquareText size={16} />
                        {busy === "recommendation" ? "Thinking..." : "Recommendation"}
                    </button>

                    <button
                        onClick={generateSummary}
                        disabled={busy === "summary"}
                        className={`${btnBase} bg-emerald-600 hover:bg-emerald-700`}
                    >
                        <BarChart2 size={16} />
                        {busy === "summary" ? "Thinking..." : "Weekly Summary"}
                    </button>

                    <button
                        onClick={analyzeHabit}
                        disabled={!selectedHabit || busy === "analysis"}
                        className={`${btnBase} bg-purple-600 hover:bg-purple-700`}
                    >
                        <Bot size={16} />
                        {busy === "analysis" ? "Thinking..." : "Analyze Habit"}
                    </button>

                </div>

            </div>

            <AIInsightCard title="Recommendation" content={recommendation} />
            <AIInsightCard title="Weekly Summary" content={summary} />
            <AIInsightCard title="Habit Analysis" content={analysis} />

        </div>
    );
}
