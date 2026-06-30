import { useEffect, useState } from "react";
import { CheckCircle2, Circle, X, Sparkles } from "lucide-react";
import api from "../services/api";

export default function OnboardingChecklist() {

    const [dismissed, setDismissed] = useState(
        localStorage.getItem("checklist_dismissed") === "1"
    );
    const [steps, setSteps] = useState({
        hasHabit: false,
        hasLog: false,
        usedAI: localStorage.getItem("ai_used") === "1"
    });
    const [loaded, setLoaded] = useState(false);

    useEffect(() => {
        if (dismissed) return;
        check();
        // Re-check whenever the user navigates between pages, since this
        // component lives at the layout level and stays mounted.
        const interval = setInterval(check, 4000);
        return () => clearInterval(interval);
    }, [dismissed]);

    async function check() {
        try {
            const [habitsRes, logsRes] = await Promise.all([
                api.get("/habits/"),
                api.get("/logs/")
            ]);
            setSteps({
                hasHabit: habitsRes.data.length > 0,
                hasLog: logsRes.data.length > 0,
                usedAI: localStorage.getItem("ai_used") === "1"
            });
            setLoaded(true);
        }
        catch (err) {
            console.log(err);
        }
    }

    function dismiss() {
        localStorage.setItem("checklist_dismissed", "1");
        setDismissed(true);
    }

    if (dismissed || !loaded) return null;

    const items = [
        { key: "hasHabit", label: "Add a habit" },
        { key: "hasLog", label: "Mark one complete" },
        { key: "usedAI", label: "Check your first AI insight" }
    ];

    const allDone = items.every(item => steps[item.key]);

    return (
        <div className="fixed bottom-5 right-5 z-30 w-72 bg-white rounded-2xl shadow-soft-lg border border-ink-100 p-4">

            <div className="flex items-center justify-between mb-3">
                <p className="text-sm font-bold text-ink-900 flex items-center gap-1.5">
                    <Sparkles size={14} className="text-brand-500" />
                    {allDone ? "You're all set!" : "Getting Started"}
                </p>
                <button onClick={dismiss} aria-label="Dismiss checklist" className="text-ink-300 hover:text-ink-600 transition-colors">
                    <X size={16} />
                </button>
            </div>

            <div className="space-y-2">
                {items.map(item => (
                    <div key={item.key} className="flex items-center gap-2 text-sm">
                        {steps[item.key] ? (
                            <CheckCircle2 size={16} className="text-emerald-500 shrink-0" />
                        ) : (
                            <Circle size={16} className="text-ink-300 shrink-0" />
                        )}
                        <span className={steps[item.key] ? "text-ink-400 line-through" : "text-ink-700"}>
                            {item.label}
                        </span>
                    </div>
                ))}
            </div>

        </div>
    );
}
