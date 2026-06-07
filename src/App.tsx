import { useState } from "react";
import "./App.css";
import { QuestionForm } from "./components/QuestionForm";
import { AnswerPanel } from "./components/AnswerPanel";
import { HistoryList } from "./components/HistoryList";
import { NotificationProvider } from "./context/NotificationContext";
import { HistoryProvider } from "./context/HistoryContext";

function Main() {
  const [question, setQuestion] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");

  return (
    <div className="app">
      <header className="app-header">
        <h1>AI‑ассистент для команды</h1>
      </header>

      <div className="grid">
        <section className="left">
          <QuestionForm
            question={question}
            setQuestion={setQuestion}
            onAnswer={setAnswer}
          />
          {answer && <AnswerPanel answer={answer} />}
        </section>
        <aside className="right">
          <HistoryList setQuestion={setQuestion} />
        </aside>
      </div>
    </div>
  );
}

export default function App() {
  return (
    <NotificationProvider>
      <HistoryProvider>
        <Main />
      </HistoryProvider>
    </NotificationProvider>
  );
}
