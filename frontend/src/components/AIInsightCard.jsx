import { Sparkles } from "lucide-react";
import FormattedAIText from "../utils/formatAIText";

export default function AIInsightCard({
    title,
    content
}) {

    return (
        <div className="card p-6">
            <div className="flex items-center gap-2 mb-3">
                <div className="h-8 w-8 rounded-lg bg-brand-50 text-brand-600 flex items-center justify-center">
                    <Sparkles size={16} />
                </div>
                <h2 className="text-base font-bold text-ink-900">
                    {title}
                </h2>
            </div>

            {content ? (
                <div className="text-ink-600 leading-7 text-sm">
                    <FormattedAIText text={content} />
                </div>
            ) : (
                <p className="text-ink-400 text-sm italic">
                    No AI response yet — generate one above.
                </p>
            )}
        </div>
    );
}
