import { useEffect, useState } from "react";

import api from "../services/api";

import AIInsightCard from "../components/AIInsightCard";

export default function AIInsights() {

    const [habits, setHabits] = useState([]);

    const [selectedHabit, setSelectedHabit] = useState("");

    const [recommendation, setRecommendation] = useState("");

    const [summary, setSummary] = useState("");

    const [analysis, setAnalysis] = useState("");

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

        try {

            const response = await api.post(

                `/ai/recommendation/${selectedHabit}`

            );

            setRecommendation(response.data.recommendation);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function generateSummary() {

        try {

            const response = await api.post(

                "/ai/summary"

            );

            setSummary(response.data.summary);

        }

        catch (error) {

            console.log(error);

        }

    }

    async function analyzeHabit() {

        try {

            const response = await api.post(

                `/ai/analyze/${selectedHabit}`

            );

            setAnalysis(response.data.analysis);

        }

        catch (error) {

            console.log(error);

        }

    }

    return (

        <div className="space-y-8">

            <div>

                <h1 className="text-4xl font-bold">

                    AI Habit Coach 🤖

                </h1>

                <p className="text-gray-500 mt-2">

                    Generate personalized AI insights.

                </p>

            </div>

            <div className="bg-white rounded-xl shadow-md p-6">

                <label className="font-semibold">

                    Select Habit

                </label>

                <select

                    className="border rounded-lg p-3 mt-3 w-full"

                    value={selectedHabit}

                    onChange={(e)=>setSelectedHabit(e.target.value)}

                >

                    {

                        habits.map(habit=>(

                            <option

                                key={habit.id}

                                value={habit.id}

                            >

                                {habit.name}

                            </option>

                        ))

                    }

                </select>

                <div className="flex flex-wrap gap-4 mt-6">

                    <button

                        onClick={generateRecommendation}

                        className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 rounded-lg"

                    >

                        Recommendation

                    </button>

                    <button

                        onClick={generateSummary}

                        className="bg-green-600 hover:bg-green-700 text-white px-5 py-3 rounded-lg"

                    >

                        Weekly Summary

                    </button>

                    <button

                        onClick={analyzeHabit}

                        className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-3 rounded-lg"

                    >

                        Analyze Habit

                    </button>

                </div>

            </div>

            <AIInsightCard

                title="Recommendation"

                content={recommendation}

            />

            <AIInsightCard

                title="Weekly Summary"

                content={summary}

            />

            <AIInsightCard

                title="Habit Analysis"

                content={analysis}

            />

        </div>

    );

}