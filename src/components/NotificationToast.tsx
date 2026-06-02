import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, MessageSquare, X } from 'lucide-react';

export interface ToastMessage {
  id: string;
  title: string;
  message: string;
  type: 'success' | 'whatsapp';
}

interface NotificationToastProps {
  toasts: ToastMessage[];
  onClose: (id: string) => void;
}

export default function NotificationToast({ toasts, onClose }: NotificationToastProps) {
  return (
    <div className="fixed bottom-5 right-5 z-50 flex flex-col gap-3 max-w-sm w-full font-sans">
      <AnimatePresence>
        {toasts.map((toast) => (
          <motion.div
            key={toast.id}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className={`p-4 rounded-xl shadow-xl border flex gap-3 items-start justify-between ${
              toast.type === 'whatsapp'
                ? 'bg-neutral-950 text-white border-neutral-800'
                : 'bg-white text-gray-800 border-neutral-100'
            }`}
          >
            <div className="flex gap-3">
              <div className={`p-2 rounded-lg mt-0.5 ${
                toast.type === 'whatsapp' ? 'bg-neutral-900 text-pink-400' : 'bg-pink-50/80 text-pink-600'
              }`}>
                {toast.type === 'whatsapp' ? (
                  <MessageSquare className="w-5 h-5 animate-pulse" />
                ) : (
                  <CheckCircle2 className="w-5 h-5" />
                )}
              </div>
              <div>
                <h4 className="font-semibold text-sm flex items-center gap-1.5 leading-tight">
                  {toast.type === 'whatsapp' && (
                    <span className="bg-pink-600 text-white text-[9px] px-1.5 py-0.5 rounded-md font-bold uppercase tracking-wider">
                      Notif. WhatsApp
                    </span>
                  )}
                  {toast.title}
                </h4>
                <p className={`text-xs mt-1 leading-relaxed ${
                  toast.type === 'whatsapp' ? 'text-gray-300' : 'text-gray-500'
                }`}>
                  {toast.message}
                </p>
              </div>
            </div>
            <button
              onClick={() => onClose(toast.id)}
              className={`p-1 rounded-lg transition-colors hover:cursor-pointer ${
                toast.type === 'whatsapp' ? 'hover:bg-neutral-900 text-pink-400' : 'hover:bg-neutral-50 text-neutral-400'
              }`}
            >
              <X className="w-4 h-4" />
            </button>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
}
