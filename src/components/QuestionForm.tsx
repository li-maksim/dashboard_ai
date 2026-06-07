import { useState } from "react";
import { askAi } from "../api/askAi";
import { useHistoryContext } from "../context/HistoryContext";
import { useNotifications } from "../context/NotificationContext";

export interface QuestionFormProps {
  question: string;
  setQuestion: (q: string) => void;
  onAnswer: (ans: string) => void;
}

export function QuestionForm({
  question,
  setQuestion,
  onAnswer,
}: QuestionFormProps) {
  const [loading, setLoading] = useState(false);
  const { add } = useHistoryContext();
  const addToast = useNotifications();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;
    setLoading(true);
    try {
      const ans = await askAi(question);
      onAnswer(ans);
      add({ question, answer: ans, timestamp: Date.now() });
    } catch (err: any) {
      addToast(err.message || "Ошибка при запросе");
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="question-form">
      <textarea
        placeholder="Например, какие метрики отслеживать при запуске фичи?"
        value={question}
        onChange={(e) => setQuestion(e.target.value)}
        disabled={loading}
      />
      <button type="submit" disabled={loading || !question.trim()}>
        {" "}
        {loading ? "Загружается..." : "Спросить AI"}{" "}
      </button>
    </form>
  );
}
