import { createContext, useContext, useState } from "react";
import type { ReactNode } from "react";

type Toast = {
  id: number;
  message: string;
};

const NotificationCtx = createContext<{
  toasts: Toast[];
  addToast: (msg: string) => void;
} | null>(null);

export const NotificationProvider = ({ children }: { children: ReactNode }) => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const addToast = (msg: string) => {
    const id = Date.now();
    setToasts((prev) => [...prev, { id, message: msg }]);
    setTimeout(() => setToasts((t) => t.filter((x) => x.id !== id)), 2000);
  };

  return (
    <NotificationCtx.Provider value={{ toasts, addToast }}>
      {children}
      <div className="toast-container">
        {toasts.map((t) => (
          <div key={t.id} className="toast">
            {t.message}
          </div>
        ))}
      </div>
    </NotificationCtx.Provider>
  );
};

export const useNotifications = () => {
  const ctx = useContext(NotificationCtx);
  if (!ctx)
    throw new Error("useNotifications must be inside NotificationProvider");
  return ctx.addToast;
};
