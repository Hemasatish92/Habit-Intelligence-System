import {
    ResponsiveContainer,
    BarChart,
    Bar,
    CartesianGrid,
    Tooltip,
    XAxis,
    YAxis,
    Cell
} from "recharts";

export default function WeeklyChart({

    data = [],
    title = "Weekly Progress"

}) {

    const colors = [
        "#6366F1",
        "#8B5CF6",
        "#06B6D4",
        "#10B981",
        "#F59E0B",
        "#EF4444",
        "#3B82F6"
    ];

    return (

        <div className="card p-6">

            <div className="flex items-center justify-between mb-5">

                <div>

                    <h2 className="text-lg font-bold text-ink-900">

                        {title}

                    </h2>

                    <p className="text-sm text-ink-500 mt-1">

                        Your habit completions over the last 7 days

                    </p>

                </div>

            </div>

            <ResponsiveContainer
                width="100%"
                height={320}
            >

                <BarChart
                    data={data}
                    margin={{
                        top: 10,
                        right: 20,
                        left: -20,
                        bottom: 0
                    }}
                >

                    <CartesianGrid
                        strokeDasharray="3 3"
                        vertical={false}
                        stroke="#e5e7eb"
                    />

                    <XAxis
                        dataKey="day"
                        tickLine={false}
                        axisLine={false}
                        tick={{
                            fill: "#64748b",
                            fontSize: 13
                        }}
                    />

                    <YAxis
                        allowDecimals={false}
                        tickLine={false}
                        axisLine={false}
                        tick={{
                            fill: "#64748b",
                            fontSize: 13
                        }}
                    />

                    <Tooltip
                        formatter={(value) => [
                            `${value} habit(s)`,
                            "Completed"
                        ]}
                        labelFormatter={(label) => `Day: ${label}`}
                        cursor={{
                            fill: "#f8fafc"
                        }}
                        contentStyle={{
                            borderRadius: 12,
                            border: "1px solid #e2e8f0",
                            boxShadow:
                                "0 8px 24px -8px rgba(15,23,42,0.15)"
                        }}
                    />

                    <Bar
                        dataKey="completed"
                        radius={[8, 8, 0, 0]}
                    >

                        {data.map((entry, index) => (

                            <Cell
                                key={index}
                                fill={colors[index % colors.length]}
                            />

                        ))}

                    </Bar>

                </BarChart>

            </ResponsiveContainer>

        </div>

    );

}