// src/components/Loader.tsx
// Grows with WebGL asset progress; page content fades in when done.
'use client';

export default function Loader({ progress, done }: { progress: number; done: boolean }) {
  return (
    <div
      className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 h-px bg-[#3d5257] z-[10000] transition-all duration-300"
      style={{
        width: done ? '0%' : `${progress * 80}%`,
        opacity: done ? 0 : 0.7,
      }}
    />
  );
}
