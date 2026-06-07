import { createContext, useContext, useEffect, useState } from "react";

export interface HistoryItem {
  question: string;
  answer: string;
  timestamp: number; // ms epoch
}

const KEY = 'ai_history';
const MAX_ITEMS = 5;

const HistoryCtx = createContext<{
  history: HistoryItem[];
  add: (item: HistoryItem) => void;
} | null>(null);

export const HistoryProvider = ({ children }: { children: React.ReactNode }) => {
  const [history, setHistory] = useState<HistoryItem[]>([]);

  useEffect(() => {
    const stored = localStorage.getItem(KEY);
    if (stored) {
      try {
        setHistory(JSON.parse(stored));
      } catch {}
    }
  }, []);

  const add = (item: HistoryItem) => {
    setHistory(prev => {
      const newArr = [item, ...prev].slice(0, MAX_ITEMS);
      localStorage.setItem(KEY, JSON.stringify(newArr));
      return newArr;
    });
  };

  return (
    <HistoryCtx.Provider value={{ history, add }}>
      {children}
    </HistoryCtx.Provider>
  );
};

export const useHistoryContext = () => {
  const ctx = useContext(HistoryCtx);
  if (!ctx) throw new Error("useHistoryContext must be used inside HistoryProvider");
  return ctx;
};
