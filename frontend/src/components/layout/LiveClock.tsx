import React, { useState, useEffect } from 'react';
import { Clock } from 'lucide-react';

export default function LiveClock({ className = "" }: { className?: string }) {
  const [time, setTime] = useState(new Date());

  useEffect(() => {
    const timer = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(timer);
  }, []);

  const timeStr = time.toLocaleTimeString('id-ID', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit'
  });

  return (
    <div className={`flex items-center gap-2 font-black tracking-widest ${className}`}>
      <Clock size={16} className="text-blue-500" />
      <span>{timeStr}</span>
    </div>
  );
}
