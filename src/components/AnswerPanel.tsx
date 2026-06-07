import ReactMarkdown from 'react-markdown';
import { useNotifications } from '../context/NotificationContext';

export interface AnswerPanelProps {
  answer: string;
}

export function AnswerPanel({ answer }: AnswerPanelProps) {
  const addToast = useNotifications();

  const copy = async () => {
    await navigator.clipboard.writeText(answer);
    addToast('Скопировано!');
  };

  return (
    <div className="answer-panel">
      <ReactMarkdown>{answer}</ReactMarkdown>
      <button onClick={copy}>Копировать ответ</button>
    </div>
  );
}
