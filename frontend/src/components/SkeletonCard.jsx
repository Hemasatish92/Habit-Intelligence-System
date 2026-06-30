export default function SkeletonCard() {
    return (
        <div className="animate-pulse card p-5">
            <div className="flex items-center gap-3 mb-4">
                <div className="h-11 w-11 rounded-xl bg-ink-200" />
                <div className="flex-1 space-y-2">
                    <div className="h-3.5 bg-ink-200 rounded w-2/3" />
                    <div className="h-3 bg-ink-100 rounded w-1/3" />
                </div>
            </div>
            <div className="h-3 bg-ink-100 rounded w-1/2" />
            <div className="h-9 bg-ink-100 rounded mt-5" />
        </div>
    );
}
