# AI‑ассистент продуктовой команды

## Описание проекта
Простой одностраничный веб‑дашборд, который позволяет команде быстро получить структурированный ответ от LLM (Google Gemini) на любой вопрос о продукте.

## Стек
- **Frontend** – React + TypeScript, Vite
- **Стили** – CSS‑модули
- **Backend** – Express + SDK `@google/generative-ai`

## Структура проекта
```
├─ server/
│   ├─ index.ts               # Express‑прокси, обрабатывает POST /api/ask
│   ├─ gemini.ts              # вызов Gemini + обработка ошибок
│   └─ prompts/systemPrompt.ts
└─ src/
    ├─ App.tsx                # корневой компонент
    ├─ index.tsx
    ├─ main.tsx
    ├─ App.css
    ├─ components/
    │   ├─ QuestionForm.tsx
    │   ├─ AnswerPanel.tsx
    │   ├─ HistoryList.tsx
    │   └─ LoadingState.tsx
    ├─ context/
    │   ├─ NotificationContext.tsx
    │   └─ HistoryContext.tsx
    ├─ hooks/
    │   └─ useHistory.ts (deprecated – now context)
    └─ api/askAi.ts
```

## Как запустить локально
1. **Клонируйте репозиторий**
   ```bash
   git clone https://github.com/<your-username>/dashboard_ai.git
   cd dashboard_ai
   ```
2. **Установите зависимости**
   ```bash
   npm install
   ```
3. **Создайте `.env` из примера `.env.example`** и укажите ваш ключ Gemini (см. https://aistudio.google.com/apikey). Поставьте `MOCK_API=true`, чтобы работать без реального ключа.
   ```bash
   cp .env.example .env
   echo "GEMINI_API_KEY=YOUR_KEY" >> .env
   echo "MOCK_API=false" >> .env
   ```
4. **Запустите сервер**:
   ```bash
   npm run dev
   ```
   - Vite слушает `localhost:5173`
   - Express‑прокси – `localhost:3001`
5. Перейдите по адресу: <http://localhost:5173>
