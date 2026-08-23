// src/components/WorkDetail.tsx
// Detail modal for work items without a video. Esc/backdrop closes.
'use client';

import { useEffect } from 'react';
import type { WorkItem } from '@/data/work';

export default function WorkDetail({ item, onClose }: { item: WorkItem | null; onClose: () => void }) {
  useEffect(() => {
    if (!item) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [item, onClose]);

  if (!item || !item.detail) return null;
  const d = item.detail;

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4" onClick={onClose}>
      <div
        className="relative max-w-2xl w-full max-h-[85vh] overflow-y-auto rounded-2xl border border-white/15 bg-[#0a0a0a]/95 backdrop-blur-md p-8 page-anim"
        onClick={e => e.stopPropagation()}
      >
        <button aria-label="Close" onClick={onClose} className="absolute top-4 right-5 text-white text-2xl hover:text-gray-300">✕</button>
        <span className="text-sm opacity-60">{item.subtitle}</span>
        <h2 className="text-3xl font-bold mb-4">{item.title}</h2>
        <p className="opacity-80 mb-6">{d.intro}</p>
        {d.sections.map(s => (
          <div key={s.heading} className="mb-5">
            <h3 className="text-lg font-semibold mb-1 text-amber-300">{s.heading}</h3>
            <p className="text-sm opacity-75 leading-relaxed">{s.body}</p>
          </div>
        ))}
        {d.quote && <p className="italic opacity-70 border-l-2 border-amber-400 pl-4 my-6">{d.quote}</p>}
        {d.url && (
          <a href={d.url} target="_blank" rel="noreferrer" className="inline-block mt-2 px-4 py-2 rounded-full border border-amber-400/60 text-amber-300 hover:bg-amber-400/10 transition-colors">
            {d.url.replace(/^https?:\/\//, '')} ↗
          </a>
        )}
      </div>
    </div>
  );
}
