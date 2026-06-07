import { GoogleGenerativeAIFetchError } from '@google/generative-ai';

export class EmptyResponseError extends Error {
  constructor() {
    super('Модель вернула пустой ответ');
    this.name = 'EmptyResponseError';
  }
}

export class MissingApiKeyError extends Error {
  constructor() {
    super('API-ключ Gemini не настроен. Добавьте GEMINI_API_KEY в .env');
    this.name = 'MissingApiKeyError';
  }
}

export function mapErrorToHttp(error: unknown): { status: number; message: string } {
  if (error instanceof MissingApiKeyError) {
    return { status: 500, message: error.message };
  }

  if (error instanceof EmptyResponseError) {
    return { status: 502, message: error.message };
  }

  if (error instanceof GoogleGenerativeAIFetchError) {
    const status = error.status ?? 500;

    if (status === 400) {
      return { status: 400, message: 'Некорректный запрос к Gemini API' };
    }
    if (status === 401) {
      return { status: 401, message: 'Неверный API-ключ Gemini' };
    }
    if (status === 403) {
      return { status: 403, message: 'Доступ к API запрещён, проверьте ключ' };
    }
    if (status === 429) {
      return { status: 429, message: 'Слишком много запросов, подождите' };
    }

    return {
      status: status >= 400 && status < 600 ? status : 500,
      message: 'Не удалось связаться с AI, попробуйте снова',
    };
  }

  if (error instanceof Error) {
    const networkCodes = ['ECONNREFUSED', 'ENOTFOUND', 'ETIMEDOUT', 'ECONNRESET'];
    if (networkCodes.some((code) => error.message.includes(code))) {
      return { status: 503, message: 'Не удалось связаться с AI, попробуйте снова' };
    }
  }

  return { status: 500, message: 'Не удалось связаться с AI, попробуйте снова' };
}
