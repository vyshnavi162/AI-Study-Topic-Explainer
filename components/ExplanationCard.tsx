"use client";

import { useState } from "react";

interface ExplanationCardProps {
  topic: string;
  explanation: string;
}

export default function ExplanationCard({ topic, explanation }: ExplanationCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(explanation);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="w-full max-w-2xl mx-auto mt-8 animate-fade-in-up">
      <div className="card-glow rounded-2xl bg-white/[0.04] backdrop-blur-xl overflow-hidden">
        {/* Header */}
        <div className="px-6 py-4 flex items-center justify-between border-b border-white/[0.06]">
          <div className="flex items-center gap-3">
            {/* Pulsing dot */}
            <div className="relative flex items-center justify-center">
              <span className="absolute w-3 h-3 rounded-full bg-cyan-400/30 animate-ping" />
              <span className="relative w-2 h-2 rounded-full bg-cyan-400" />
            </div>
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-cyan-400/70">
                Topic
              </p>
              <h2 className="text-lg font-bold text-white capitalize leading-tight">
                {topic}
              </h2>
            </div>
          </div>

          {/* Copy Button */}
          <button
            onClick={handleCopy}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
                       bg-white/[0.05] border border-white/[0.08] text-white/50
                       hover:bg-white/[0.1] hover:text-white/80 hover:border-white/[0.15]
                       active:scale-95 transition-all duration-200"
            title="Copy explanation"
          >
            {copied ? (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="text-emerald-400">
                  <polyline points="20 6 9 17 4 12" />
                </svg>
                <span className="text-emerald-400">Copied!</span>
              </>
            ) : (
              <>
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                  <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1" />
                </svg>
                Copy
              </>
            )}
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-5">
          <p className="text-[10px] font-semibold uppercase tracking-[0.15em] text-violet-400/60 mb-3">
            AI Explanation
          </p>
          <p className="text-white/85 leading-[1.8] text-[15px]">
            {explanation}
          </p>
        </div>

        {/* Footer */}
        <div className="px-6 py-3 border-t border-white/[0.04] flex items-center gap-2">
          <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-white/20">
            <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
          </svg>
          <span className="text-[11px] text-white/20">Powered by Google Gemini</span>
        </div>
      </div>
    </div>
  );
}
