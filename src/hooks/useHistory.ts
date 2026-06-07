import { useState, useEffect } from 'react';

export interface HistoryItem {
  question: string;
  answer: string;
  timestamp: number; // ms epoch
}

const KEY = 'ai_history';
const MAX_ITEMS = 5;

export function useHistory() {
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

  const clear = () => {
    setHistory([]);
    localStorage.removeItem(KEY);
  };

  return { history, add, clear };
}
