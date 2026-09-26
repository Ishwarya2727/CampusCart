import React from 'react';
import { CheckCircle, AlertCircle, Info } from 'lucide-react';
import { useCart } from '../context/CartContext';

export const Toast = () => {
  const { toastMessage } = useCart();

  if (!toastMessage) return null;

  const { message, type } = toastMessage;

  const getIcon = () => {
    switch (type) {
      case 'error':
        return <AlertCircle size={20} color="#ef4444" />;
      case 'info':
        return <Info size={20} color="#4f46e5" />;
      default:
        return <CheckCircle size={20} color="#10b981" />;
    }
  };

  return (
    <div className="toast-container">
      <div className={`toast toast-${type}`}>
        {getIcon()}
        <span style={{ fontSize: '0.9rem', fontWeight: 500 }}>{message}</span>
      </div>
    </div>
  );
};
