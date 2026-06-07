import { useHistoryContext } from "../context/HistoryContext";

export interface HistoryListProps {
  setQuestion: (q: string) => void;
}

export function HistoryList({ setQuestion }: HistoryListProps) {
  const { history } = useHistoryContext();

  return (
    <ul className="history-list">
      {history.map((h, idx) => (
        <li key={idx} onClick={() => setQuestion(h.question)}>
          {h.question}
        </li>
      ))}
    </ul>
  );
}
