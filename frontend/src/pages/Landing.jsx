import { Link } from "react-router-dom";
import {
    Flame,
    Sparkles,
    BarChart3,
    Target,
    ArrowRight,
    CheckCircle2
} from "lucide-react";

const features = [
    {
        icon: Target,
        title: "Track Every Habit",
        desc: "Set daily or weekly targets and log completions in seconds."
    },
    {
        icon: BarChart3,
        title: "Visual Analytics",
        desc: "See your consistency, streaks, and risk levels at a glance."
    },
    {
        icon: Sparkles,
        title: "AI-Powered Coaching",
        desc: "Get personalized recommendations and weekly AI summaries."
    }
];

export default function Landing() {
    return (
        <div className="min-h-screen bg-ink-950 text-white overflow-hidden relative">

            <div className="absolute -top-40 -left-40 h-96 w-96 bg-brand-600/30 rounded-full blur-3xl" />
            <div className="absolute top-1/3 -right-40 h-96 w-96 bg-purple-600/20 rounded-full blur-3xl" />

            <header className="relative max-w-6xl mx-auto flex items-center justify-between px-6 py-6">
                <div className="flex items-center gap-2.5">
                    <div className="h-9 w-9 rounded-lg bg-gradient-to-br from-brand-400 to-brand-600 flex items-center justify-center">
                        <Flame size={18} />
                    </div>
                    <span className="font-extrabold text-lg">Habit AI</span>
                </div>

                <div className="flex items-center gap-3">
                    <Link to="/login" className="text-sm font-medium text-ink-300 hover:text-white transition-colors px-4 py-2">
                        Login
                    </Link>
                    <Link
                        to="/register"
                        className="text-sm font-semibold bg-brand-600 hover:bg-brand-700 px-4 py-2 rounded-lg transition-colors"
                    >
                        Get Started
                    </Link>
                </div>
            </header>

            <main className="relative max-w-4xl mx-auto text-center px-6 pt-16 pb-24">

                <span className="inline-flex items-center gap-2 bg-white/5 border border-white/10 text-brand-300 text-xs font-semibold px-3 py-1.5 rounded-full mb-6">
                    <Sparkles size={13} />
                    AI-Powered Habit Tracking
                </span>

                <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight leading-tight">
                    Build habits that
                    <span className="bg-gradient-to-r from-brand-400 to-purple-400 bg-clip-text text-transparent"> actually stick</span>
                </h1>

                <p className="text-ink-300 text-lg mt-6 max-w-xl mx-auto">
                    Habit Intelligence System helps you track, analyze, and improve your habits with real-time analytics and AI-driven coaching.
                </p>

                <div className="flex items-center justify-center gap-4 mt-10">
                    <Link
                        to="/register"
                        className="inline-flex items-center gap-2 bg-brand-600 hover:bg-brand-700 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors shadow-soft"
                    >
                        Start Tracking Free
                        <ArrowRight size={18} />
                    </Link>
                    <Link
                        to="/login"
                        className="inline-flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 text-white font-semibold px-6 py-3.5 rounded-xl transition-colors"
                    >
                        Sign In
                    </Link>
                </div>

                <div className="grid sm:grid-cols-3 gap-5 mt-20 text-left">
                    {features.map((f) => {
                        const Icon = f.icon;
                        return (
                            <div key={f.title} className="bg-white/5 border border-white/10 rounded-2xl p-6 backdrop-blur">
                                <div className="h-10 w-10 rounded-xl bg-brand-500/20 text-brand-300 flex items-center justify-center mb-4">
                                    <Icon size={20} />
                                </div>
                                <h3 className="font-bold text-white">{f.title}</h3>
                                <p className="text-sm text-ink-400 mt-2 leading-relaxed">{f.desc}</p>
                            </div>
                        );
                    })}
                </div>

                <div className="flex flex-wrap items-center justify-center gap-x-8 gap-y-3 mt-16 text-sm text-ink-400">
                    <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> Free to start</span>
                    <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> No credit card needed</span>
                    <span className="flex items-center gap-2"><CheckCircle2 size={16} className="text-emerald-400" /> AI insights included</span>
                </div>

            </main>

        </div>
    );
}
