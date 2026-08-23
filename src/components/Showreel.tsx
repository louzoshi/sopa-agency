// src/components/Showreel.tsx
// Fullscreen video overlay
// Opens when set to a video URL; Vimeo links embed via iframe, others play inline.
// Click/Esc closes.
'use client';

import { useEffect } from 'react';

function vimeoEmbed(url: string): string | null {
  const m = url.match(/vimeo\.com\/(?:video\/)?(\d+)/);
  return m ? `https://player.vimeo.com/video/${m[1]}?autoplay=1` : null;
}

export default function Showreel({ videoUrl, onClose }: { videoUrl: string | null; onClose: () => void }) {
  useEffect(() => {
    if (!videoUrl) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === 'Escape') onClose(); };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [videoUrl, onClose]);

  if (!videoUrl) return null;

  const embed = vimeoEmbed(videoUrl);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center cursor-pointer" onClick={onClose}>
      {embed ? (
        <iframe
          src={embed}
          allow="autoplay; fullscreen; picture-in-picture"
          allowFullScreen
          className="w-[90vw] h-[85vh]"
          onClick={e => e.stopPropagation()}
        />
      ) : (
        <video
          src={videoUrl}
          autoPlay
          loop
          controls
          playsInline
          className="max-w-[90vw] max-h-[85vh]"
          onClick={e => e.stopPropagation()}
        />
      )}
      <button aria-label="Close showreel" className="absolute top-4 right-6 text-white text-3xl hover:text-gray-300">✕</button>
    </div>
  );
}
