export interface AskResponse {
  answer: string;
}

export async function askAi(question: string): Promise<string> {
  const res = await fetch('/api/ask', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ question }),
  });

  if (!res.ok) {
    try {
      const err = (await res.json()).error;
      throw new Error(err ?? 'Не удалось связаться с AI');
    } catch {
      throw new Error('Не удалось связаться с AI');
    }
  }

  const data: AskResponse = await res.json();
  return data.answer;
}
