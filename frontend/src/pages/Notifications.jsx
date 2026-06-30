import { BellOff } from "lucide-react";

export default function Notifications() {

    return (
        <div>

            <div className="mb-8">
                <h1 className="text-3xl font-extrabold text-ink-900">
                    Notifications
                </h1>
                <p className="text-ink-500 mt-1">
                    Stay on top of reminders and AI alerts.
                </p>
            </div>

            <div className="card p-12 text-center">
                <div className="mx-auto h-16 w-16 rounded-2xl bg-ink-100 text-ink-400 flex items-center justify-center mb-5">
                    <BellOff size={28} />
                </div>
                <h2 className="text-xl font-bold text-ink-900">
                    No Notifications Yet
                </h2>
                <p className="text-ink-400 mt-2 text-sm max-w-sm mx-auto">
                    Habit reminders and AI nudges will show up here once notifications are enabled.
                </p>
            </div>

        </div>
    );
}
