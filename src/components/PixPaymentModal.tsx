import React, { useState, useEffect } from 'react';
import { Check, Copy, Loader2, QrCode, ShieldCheck, X } from 'lucide-react';
import { motion } from 'motion/react';

interface PixPaymentModalProps {
  isOpen: boolean;
  onClose: () => void;
  onPaymentConfirmed: () => void;
  amount: number;
  serviceName: string;
  storeName: string;
}

export default function PixPaymentModal({
  isOpen,
  onClose,
  onPaymentConfirmed,
  amount,
  serviceName,
  storeName,
}: PixPaymentModalProps) {
  const [copied, setCopied] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [pixCode] = useState(() => {
    return `00020101021126580014br.gov.bcb.pix0136e6530a21-4127-4402-be22-38e9e11fc5495204000053039865405${amount.toFixed(2)}5802BR5915NucleoAutoestima6009SAO%20PAULO62070503***6304`;
  });

  const handleCopy = () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleConfirmPay = () => {
    setIsProcessing(true);
    // Simulate real bank checking
    setTimeout(() => {
      setIsProcessing(false);
      onPaymentConfirmed();
    }, 2000);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/65 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.95, y: 15 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        className="bg-white rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden text-gray-800"
      >
        {/* Header decoration */}
        <div className="bg-black px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2">
            <ShieldCheck className="w-5 h-5 text-pink-400" />
            <span className="font-semibold tracking-tight">Checkout Seguro • Pix</span>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-full hover:bg-neutral-800 transition-colors text-white cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="text-center mb-5">
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest block">VALOR DO AGENDAMENTO</span>
            <span className="text-3xl font-extrabold text-pink-650 block mt-1">R$ {amount.toFixed(2)}</span>
            <p className="text-xs text-gray-500 mt-1">
              Referente a <b className="text-gray-700">{serviceName}</b> em <b className="text-gray-750">{storeName}</b>
            </p>
          </div>

          {/* Simulated QR Code representation */}
          <div className="flex flex-col items-center justify-center p-4 bg-pink-50/40 rounded-2xl border border-pink-100/60 mb-5 relative">
            <div className="bg-white p-3 rounded-xl shadow-inner border border-pink-100 flex items-center justify-center">
              <QrCode className="w-48 h-48 text-black" />
            </div>
            <p className="text-[11px] text-gray-400 text-center mt-3 max-w-xs uppercase font-medium">
              Abra o aplicativo do seu banco, escolha "Pagar com QR Code" ou Pix Copie e Cole.
            </p>
          </div>

          {/* Copy-paste string box */}
          <div className="mb-6">
            <label className="text-xs font-semibold text-gray-400 uppercase tracking-widest block mb-1.5">
              CÓDIGO PIX COPIA E COLA
            </label>
            <div className="flex gap-2">
              <input
                type="text"
                readOnly
                value={pixCode}
                className="flex-1 px-3 py-2 text-xs font-mono bg-gray-50 border border-gray-200 rounded-lg text-gray-500 truncate"
              />
              <button
                onClick={handleCopy}
                className="px-3 py-2 bg-pink-50 text-pink-600 border border-pink-200 rounded-lg text-xs font-semibold flex items-center gap-1.5 hover:bg-pink-100 transition-colors cursor-pointer"
              >
                {copied ? (
                  <>
                    <Check className="w-4 h-4 text-pink-600" />
                    <span>Copiado!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copiar</span>
                  </>
                )}
              </button>
            </div>
          </div>

          {/* Action trigger button */}
          <button
            onClick={handleConfirmPay}
            disabled={isProcessing}
            className="w-full py-3.5 bg-pink-600 hover:bg-pink-700 text-white font-semibold rounded-xl transition-all shadow-md shadow-pink-600/10 flex items-center justify-center gap-2 disabled:bg-pink-400 disabled:cursor-not-allowed cursor-pointer"
          >
            {isProcessing ? (
              <>
                <Loader2 className="w-5 h-5 animate-spin text-white" />
                <span>Validando pagamento...</span>
              </>
            ) : (
              <>
                <span>Já fiz o pagamento</span>
              </>
            )}
          </button>

          <p className="text-[10px] text-center text-gray-400 mt-4 font-medium flex items-center justify-center gap-1.5">
            🔒 Ambiente seguro certificado pelo Núcleo de Autoestima
          </p>
        </div>
      </motion.div>
    </div>
  );
}
