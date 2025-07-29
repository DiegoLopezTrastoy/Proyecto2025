'use client';

import { useEffect, useRef, useState } from 'react';

export default function Home() {
  const [logs, setLogs] = useState<string[]>([]);
  const logEndRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const eventSource = new EventSource('/api/logs');

    eventSource.onmessage = (event) => {
      setLogs((prev) => [...prev, event.data]);
    };

    eventSource.onerror = (err) => {
      console.error('Error en SSE:', err);
      eventSource.close();
    };

    return () => {
      eventSource.close();
    };
  }, []);

  // Scroll al final cuando llega un nuevo log
  useEffect(() => {
    logEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [logs]);

  return (
    <main style={{ padding: '2rem' }}>
      <h1 className='mb-5'>📄 Logs del servicio</h1>

      <div
        style={{
          background: '#111',
          color: '#0f0',
          fontFamily: 'monospace',
          padding: '1rem',
          borderRadius: '8px',
          height: '700px',
          overflowY: 'auto',
          boxShadow: '0 0 10px rgba(0, 255, 0, 0.3)',
        }}
      >
        {logs.map((line, i) => (
          <div key={i}>{line}</div>
        ))}
        <div ref={logEndRef} />
      </div>
    </main>
  );
}
