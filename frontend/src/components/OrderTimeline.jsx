import React from 'react';
import { CheckCircle2, Clock, Circle } from 'lucide-react';

const STAGES = [
  'Order Placed',
  'Confirmed',
  'Packed',
  'Shipped',
  'Out for Delivery',
  'Delivered'
];

export const OrderTimeline = ({ currentStatus }) => {
  const currentIndex = STAGES.indexOf(currentStatus);

  return (
    <div style={{ padding: '1.5rem 0' }}>
      <div style={{
        display: 'flex',
        flexDirection: 'column',
        gap: '1.5rem'
      }}>
        {STAGES.map((stage, idx) => {
          const isCompleted = idx < currentIndex;
          const isCurrent = idx === currentIndex;
          const isUpcoming = idx > currentIndex;

          let color = '#94a3b8';
          if (isCompleted) color = '#10b981';
          if (isCurrent) color = '#4f46e5';

          return (
            <div key={stage} style={{ display: 'flex', alignItems: 'center', gap: '1rem', position: 'relative' }}>
              <div style={{
                width: '36px',
                height: '36px',
                borderRadius: '50%',
                backgroundColor: isCompleted ? '#d1fae5' : isCurrent ? '#eef2ff' : '#f1f5f9',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                zIndex: 2,
                border: isCurrent ? '2px solid #4f46e5' : 'none'
              }}>
                {isCompleted ? (
                  <CheckCircle2 size={20} color="#10b981" />
                ) : isCurrent ? (
                  <Clock size={20} color="#4f46e5" />
                ) : (
                  <Circle size={16} color="#94a3b8" />
                )}
              </div>

              <div style={{ flex: 1 }}>
                <span style={{
                  fontWeight: isCurrent ? 700 : isCompleted ? 600 : 400,
                  fontSize: '0.95rem',
                  color: isCurrent ? '#4f46e5' : isCompleted ? '#0f172a' : '#64748b'
                }}>
                  {stage}
                </span>
                {isCurrent && (
                  <span className="badge badge-primary" style={{ marginLeft: '0.75rem' }}>
                    Current Status
                  </span>
                )}
              </div>

              {idx < STAGES.length - 1 && (
                <div style={{
                  position: 'absolute',
                  left: '17px',
                  top: '36px',
                  width: '2px',
                  height: '24px',
                  backgroundColor: idx < currentIndex ? '#10b981' : '#e2e8f0',
                  zIndex: 1
                }} />
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
};
