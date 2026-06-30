export default function Loader() {
    return (
        <div className="flex flex-col justify-center items-center h-40 gap-3">
            <div className="animate-spin rounded-full h-10 w-10 border-2 border-ink-200 border-t-brand-600"></div>
            <p className="text-sm text-ink-400">Loading...</p>
        </div>
    );
}
