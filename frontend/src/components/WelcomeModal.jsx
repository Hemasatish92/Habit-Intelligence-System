import { Flame, ListPlus, CheckCircle2, Sparkles, X } from "lucide-react";

const steps = [
    {
        icon: ListPlus,
        title: "Add a habit",
        desc: "Go to the Habits page and create something you want to track, like Yoga or Reading."
    },
    {
        icon: CheckCircle2,
        title: "Mark it done daily",
        desc: "Each day you complete it, hit \"Mark Complete\" on the habit card. That builds your streak."
    },
    {
        icon: Sparkles,
        title: "Check AI Insights weekly",
        desc: "Once you've logged a few days, visit AI Insights for a personalized recommendation and summary."
    }
];

export default function WelcomeModal({ onClose }) {
    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <div className="relative w-full max-w-md bg-white rounded-2xl shadow-soft-lg p-8">

                <button
                    onClick={onClose}
                    aria-label="Close"
                    className="absolute top-4 right-4 text-ink-400 hover:text-ink-700 transition-colors"
                >
                    <X size={20} />
                </button>

                <div className="flex flex-col items-center text-center mb-6">
                    <div className="h-12 w-12 rounded-xl bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center mb-3">
                        <Flame size={24} className="text-white" />
                    </div>
                    <h2 className="text-xl font-extrabold text-ink-900">
                        Welcome to Habit AI 👋
                    </h2>
                    <p className="text-ink-500 text-sm mt-1">
                        Here's how it works, in three steps.
                    </p>
                </div>

                <div className="space-y-4">
                    {steps.map((step, idx) => {
                        const Icon = step.icon;
                        return (
                            <div key={step.title} className="flex items-start gap-3">
                                <div className="h-9 w-9 shrink-0 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center font-bold text-sm">
                                    {idx + 1}
                                </div>
                                <div>
                                    <p className="font-semibold text-ink-900 text-sm flex items-center gap-1.5">
                                        <Icon size={14} className="text-brand-500" />
                                        {step.title}
                                    </p>
                                    <p className="text-xs text-ink-500 mt-0.5">{step.desc}</p>
                                </div>
                            </div>
                        );
                    })}
                </div>

                <button
                    onClick={onClose}
                    className="w-full mt-7 bg-brand-600 hover:bg-brand-700 text-white font-semibold text-sm py-3 rounded-lg transition-colors"
                >
                    Let's Go
                </button>

            </div>
        </div>
    );
}
