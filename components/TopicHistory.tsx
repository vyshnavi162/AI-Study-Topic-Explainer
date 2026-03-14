"use client";

interface HistoryItem {
  topic: string;
  explanation: string;
}

interface TopicHistoryProps {
  history: HistoryItem[];
  onSelect: (item: HistoryItem) => void;
}

export default function TopicHistory({ history, onSelect }: TopicHistoryProps) {
  if (history.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mt-10 animate-fade-in">
      <div className="flex items-center gap-2 mb-3">
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/30">
          <circle cx="12" cy="12" r="10" />
          <polyline points="12 6 12 12 16 14" />
        </svg>
        <h3 className="text-xs font-semibold uppercase tracking-[0.15em] text-white/30">
          Recent Topics
        </h3>
      </div>
      <div className="flex flex-wrap gap-2">
        {history.map((item, idx) => (
          <button
            key={`${item.topic}-${idx}`}
            onClick={() => onSelect(item)}
            className="group flex items-center gap-2 px-4 py-2 rounded-xl text-sm
                       bg-white/[0.03] border border-white/[0.06]
                       hover:bg-white/[0.07] hover:border-cyan-400/20
                       text-white/50 hover:text-cyan-300
                       active:scale-95 transition-all duration-200"
          >
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20 group-hover:text-cyan-400/50 transition-colors">
              <path d="M2 3h6a4 4 0 014 4v14a3 3 0 00-3-3H2z" />
              <path d="M22 3h-6a4 4 0 00-4 4v14a3 3 0 013-3h7z" />
            </svg>
            <span className="capitalize">{item.topic}</span>
          </button>
        ))}
      </div>
    </div>
  );
}
