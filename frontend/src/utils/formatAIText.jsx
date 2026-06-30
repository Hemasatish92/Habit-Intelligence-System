// Cleans up AI-generated text that may still contain stray Markdown
// (bold **text**, bullet "* "/"- ", numbered lists) and renders it
// as proper React elements instead of raw symbols.

function renderInline(text, keyPrefix) {
    // Convert **bold** segments into <strong>, strip any leftover # or ` symbols
    const cleaned = text.replace(/#+\s?/g, "").replace(/`/g, "");
    const parts = cleaned.split(/(\*\*[^*]+\*\*)/g).filter(Boolean);

    return parts.map((part, i) => {
        if (part.startsWith("**") && part.endsWith("**")) {
            return (
                <strong key={`${keyPrefix}-${i}`} className="font-semibold text-ink-900">
                    {part.slice(2, -2)}
                </strong>
            );
        }
        return <span key={`${keyPrefix}-${i}`}>{part}</span>;
    });
}

export default function FormattedAIText({ text }) {
    if (!text) return null;

    const lines = text.split("\n").map(l => l.trim()).filter(Boolean);

    const bulletPattern = /^[-*]\s+(.*)/;
    const numberedPattern = /^\d+[.)]\s+(.*)/;

    const elements = [];
    let listBuffer = [];
    let listType = null; // "ul" | "ol"

    function flushList(key) {
        if (listBuffer.length === 0) return;
        const Tag = listType === "ol" ? "ol" : "ul";
        elements.push(
            <Tag
                key={`list-${key}`}
                className={`${listType === "ol" ? "list-decimal" : "list-disc"} pl-5 space-y-1`}
            >
                {listBuffer.map((item, i) => (
                    <li key={i}>{renderInline(item, `li-${key}-${i}`)}</li>
                ))}
            </Tag>
        );
        listBuffer = [];
        listType = null;
    }

    lines.forEach((line, idx) => {
        const bulletMatch = line.match(bulletPattern);
        const numberedMatch = line.match(numberedPattern);

        if (bulletMatch) {
            if (listType !== "ul") flushList(idx);
            listType = "ul";
            listBuffer.push(bulletMatch[1]);
        } else if (numberedMatch) {
            if (listType !== "ol") flushList(idx);
            listType = "ol";
            listBuffer.push(numberedMatch[1]);
        } else {
            flushList(idx);
            elements.push(
                <p key={`p-${idx}`}>{renderInline(line, `p-${idx}`)}</p>
            );
        }
    });

    flushList("end");

    return <div className="space-y-2">{elements}</div>;
}
