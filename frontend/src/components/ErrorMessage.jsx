import { AlertTriangle } from "lucide-react";

export default function ErrorMessage({ message }) {
    return (
        <div className="flex items-center gap-2 bg-red-50 text-red-700 text-sm font-medium p-3.5 rounded-lg border border-red-100">
            <AlertTriangle size={16} className="shrink-0" />
            {message}
        </div>
    );
}
