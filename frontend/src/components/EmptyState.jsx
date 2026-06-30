import { ClipboardList } from "lucide-react";

export default function EmptyState({
    title = "No Habits Yet",
    subtitle = "Create your first habit above to begin tracking."
}) {
    return (
        <div className="card p-12 text-center">
            <div className="mx-auto h-16 w-16 rounded-2xl bg-brand-50 text-brand-500 flex items-center justify-center mb-5">
                <ClipboardList size={28} />
            </div>
            <h2 className="text-xl font-bold text-ink-900">
                {title}
            </h2>
            <p className="text-ink-400 mt-2 text-sm">
                {subtitle}
            </p>
        </div>
    );
}
