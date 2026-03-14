"use client";

import { useState, useCallback } from "react";
import TopicInput from "@/components/TopicInput";
import ExplanationCard from "@/components/ExplanationCard";
import TopicHistory from "@/components/TopicHistory";
import { ExplainResponse, ExplainError } from "@/types";

interface HistoryItem {
  topic: string;
  explanation: string;
}

export default function Home() {
  const [explanation, setExplanation] = useState("");
  const [currentTopic, setCurrentTopic] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [history, setHistory] = useState<HistoryItem[]>([]);

  const handleExplain = useCallback(async (topic: string) => {
    if (!topic) {
      setError("Please enter a topic to continue.");
      return;
    }

    setError("");
    setExplanation("");
    setCurrentTopic(topic);
    setIsLoading(true);

    try {
      const res = await fetch("/api/explain", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic }),
      });

      const data: ExplainResponse | ExplainError = await res.json();

      if (!res.ok) {
        setError((data as ExplainError).error || "Something went wrong. Please try again.");
        return;
      }

      const result = (data as ExplainResponse).explanation;
      setExplanation(result);

      // Add to history (avoid duplicates, keep most recent 8)
      setHistory((prev) => {
        const filtered = prev.filter(
          (h) => h.topic.toLowerCase() !== topic.toLowerCase()
        );
        return [{ topic, explanation: result }, ...filtered].slice(0, 8);
      });
    } catch {
      setError("Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleHistorySelect = useCallback((item: HistoryItem) => {
    setCurrentTopic(item.topic);
    setExplanation(item.explanation);
    setError("");
  }, []);

  return (
    <>
      {/* Animated background */}
      <div className="bg-animated" />

      {/* Glow orbs */}
      <div className="glow-orb w-[500px] h-[500px] bg-cyan-500/10 -top-40 -left-40 fixed" />
      <div className="glow-orb w-[400px] h-[400px] bg-violet-500/10 -bottom-32 -right-32 fixed" style={{ animationDelay: "3s" }} />
      <div className="glow-orb w-[300px] h-[300px] bg-blue-500/10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 fixed" style={{ animationDelay: "1.5s" }} />

      <main className="relative z-10 min-h-screen flex flex-col items-center justify-center px-4 py-20">
        {/* Badge */}
        <div className="animate-fade-in mb-6">
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-medium uppercase tracking-wider
                           bg-cyan-400/10 text-cyan-400/80 border border-cyan-400/15">
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
            AI Powered
          </span>
        </div>

        {/* Heading */}
        <div className="text-center mb-10 animate-fade-in" style={{ animationDelay: "0.1s" }}>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-violet-400 mb-4 leading-tight">
            AI Study Topic Explainer
          </h1>
          <p className="text-white/45 text-base sm:text-lg max-w-lg mx-auto leading-relaxed">
            Type any academic topic and get a clear, student-friendly explanation in seconds.
          </p>
        </div>

        {/* Input */}
        <div className="w-full animate-fade-in" style={{ animationDelay: "0.2s" }}>
          <TopicInput onSubmit={handleExplain} isLoading={isLoading} />
        </div>

        {/* Error */}
        {error && (
          <div className="mt-6 w-full max-w-2xl mx-auto text-center animate-fade-in">
            <div className="flex items-center justify-center gap-2 text-red-400 bg-red-500/[0.08] border border-red-500/15 rounded-xl px-4 py-3 text-sm">
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <circle cx="12" cy="12" r="10" />
                <line x1="12" y1="8" x2="12" y2="12" />
                <line x1="12" y1="16" x2="12.01" y2="16" />
              </svg>
              {error}
            </div>
          </div>
        )}

        {/* Loading */}
        {isLoading && (
          <div className="mt-10 flex flex-col items-center gap-4 animate-fade-in">
            {/* Animated rings */}
            <div className="relative w-16 h-16">
              <div className="absolute inset-0 rounded-full border-2 border-cyan-400/20 animate-ping" />
              <div className="absolute inset-2 rounded-full border-2 border-blue-400/30 animate-ping" style={{ animationDelay: "0.3s" }} />
              <div className="absolute inset-4 rounded-full border-2 border-violet-400/40 animate-ping" style={{ animationDelay: "0.6s" }} />
              <div className="absolute inset-0 flex items-center justify-center">
                <svg className="animate-spin h-6 w-6 text-cyan-400" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                </svg>
              </div>
            </div>
            <p className="text-sm text-white/40 font-medium">Generating explanation…</p>

            {/* Shimmer placeholder */}
            <div className="w-full max-w-2xl space-y-3 mt-2">
              <div className="h-4 rounded-lg bg-white/[0.03] animate-shimmer" />
              <div className="h-4 rounded-lg bg-white/[0.03] animate-shimmer w-[90%]" style={{ animationDelay: "0.2s" }} />
              <div className="h-4 rounded-lg bg-white/[0.03] animate-shimmer w-[75%]" style={{ animationDelay: "0.4s" }} />
            </div>
          </div>
        )}

        {/* Result */}
        {explanation && !isLoading && (
          <ExplanationCard topic={currentTopic} explanation={explanation} />
        )}

        {/* History */}
        {!isLoading && (
          <TopicHistory history={history} onSelect={handleHistorySelect} />
        )}
      </main>
    </>
  );
}
