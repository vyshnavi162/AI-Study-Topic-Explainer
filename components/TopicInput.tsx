"use client";

import { useState, FormEvent, KeyboardEvent } from "react";

interface TopicInputProps {
  onSubmit: (topic: string) => void;
  isLoading: boolean;
}

const SUGGESTED_TOPICS = [
  "Photosynthesis",
  "Newton's Laws",
  "Binary Search",
  "World War II",
  "DNA Replication",
  "Supply & Demand",
  "Solar System",
  "Machine Learning",
];

export default function TopicInput({ onSubmit, isLoading }: TopicInputProps) {
  const [topic, setTopic] = useState("");

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    onSubmit(topic.trim());
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onSubmit(topic.trim());
    }
  };

  const handleChipClick = (suggestion: string) => {
    setTopic(suggestion);
    onSubmit(suggestion);
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      {/* Input Row */}
      <form onSubmit={handleSubmit} className="relative">
        <div className="input-glow relative flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <div className="absolute left-4 top-1/2 -translate-y-1/2 text-white/30 pointer-events-none">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="11" cy="11" r="8" />
                <line x1="21" y1="21" x2="16.65" y2="16.65" />
              </svg>
            </div>
            <input
              type="text"
              value={topic}
              onChange={(e) => setTopic(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Enter a topic... e.g. Photosynthesis"
              disabled={isLoading}
              className="w-full pl-11 pr-5 py-4 rounded-2xl border border-white/10 bg-white/[0.05] backdrop-blur-xl
                         text-white placeholder-white/35 text-base
                         focus:outline-none focus:ring-2 focus:ring-cyan-400/40 focus:border-cyan-400/30
                         disabled:opacity-50 transition-all duration-300"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="group relative px-8 py-4 rounded-2xl font-semibold text-base text-white
                       overflow-hidden
                       disabled:opacity-50 disabled:cursor-not-allowed
                       transition-all duration-300 whitespace-nowrap"
          >
            {/* Button gradient background */}
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-blue-500 to-violet-500 transition-opacity duration-300" />
            <span className="absolute inset-0 bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            {/* Button shimmer on hover */}
            <span className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: "linear-gradient(105deg, transparent 30%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.15) 55%, transparent 70%)",
                    backgroundSize: "200% 100%",
                    animation: "shimmer 1.5s ease-in-out infinite",
                  }}
            />
            <span className="relative flex items-center gap-2">
              {isLoading ? (
                <>
                  <svg className="animate-spin h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                  </svg>
                  Generating…
                </>
              ) : (
                <>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polygon points="13 2 3 14 12 14 11 22 21 10 12 10 13 2" />
                  </svg>
                  Explain Topic
                </>
              )}
            </span>
          </button>
        </div>
      </form>

      {/* Suggested Topics */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
        <span className="text-[11px] uppercase tracking-widest text-white/30 font-medium mr-1">Try:</span>
        {SUGGESTED_TOPICS.map((suggestion) => (
          <button
            key={suggestion}
            onClick={() => handleChipClick(suggestion)}
            disabled={isLoading}
            className="topic-chip disabled:opacity-40 disabled:cursor-not-allowed"
          >
            {suggestion}
          </button>
        ))}
      </div>
    </div>
  );
}
