// src/components/SocialLinks.tsx
// Shared social row for Team cards + MemberPanel.
// Handles in team.ts are bare usernames; the full URL is built here.
'use client';
import type { Member } from '@/data/team';

const SOCIALS = [
  {
    key: 'linkedin' as const,
    label: 'LinkedIn',
    href: (v: string) => `https://www.linkedin.com/in/${v}`,
    path: 'M20.45 20.45h-3.56v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.07 2.07 0 1 1 0-4.14 2.07 2.07 0 0 1 0 4.14ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.8 0 0 .78 0 1.75v20.5C0 23.22.8 24 1.77 24h20.45c.98 0 1.78-.78 1.78-1.75V1.75C24 .78 23.2 0 22.22 0Z',
  },
  {
    key: 'github' as const,
    label: 'GitHub',
    href: (v: string) => `https://github.com/${v}`,
    path: 'M12 .5C5.37.5 0 5.78 0 12.29c0 5.2 3.44 9.6 8.2 11.16.6.1.82-.25.82-.56 0-.28-.01-1.02-.02-2-3.34.7-4.04-1.6-4.04-1.6-.55-1.36-1.33-1.73-1.33-1.73-1.09-.72.08-.71.08-.71 1.2.08 1.83 1.2 1.83 1.2 1.07 1.8 2.8 1.28 3.49.98.11-.76.42-1.28.76-1.57-2.67-.3-5.47-1.3-5.47-5.8 0-1.28.47-2.33 1.24-3.15-.13-.3-.54-1.5.11-3.15 0 0 1.01-.32 3.3 1.2a11.6 11.6 0 0 1 6 0c2.29-1.52 3.3-1.2 3.3-1.2.65 1.65.24 2.85.12 3.15.77.82 1.23 1.87 1.23 3.15 0 4.51-2.81 5.5-5.49 5.79.43.36.81 1.09.81 2.2 0 1.59-.01 2.87-.01 3.26 0 .31.21.68.83.56A12.02 12.02 0 0 0 24 12.29C24 5.78 18.63.5 12 .5Z',
  },
  {
    key: 'x' as const,
    label: 'X',
    href: (v: string) => `https://x.com/${v}`,
    path: 'M18.9 1.6h3.7l-8.1 9.2 9.5 12.6h-7.4l-5.8-7.6-6.6 7.6H.9l8.6-9.9L0 1.6h7.6l5.2 6.9 6.1-6.9Zm-1.3 19.5h2L6.5 3.6H4.3l13.3 17.5Z',
  },
];

function Icon({ d, size }: { d: string; size: number }) {
  return (
    <svg viewBox="0 0 24 24" width={size} height={size} fill="currentColor" aria-hidden>
      <path d={d} />
    </svg>
  );
}

// inline: compact icon strip (Team card) — only renders links that exist
// buttons: labelled pills (MemberPanel) — always shows all 3, dims the missing ones
export default function SocialLinks({
  member,
  mode = 'inline',
}: {
  member: Member;
  mode?: 'inline' | 'buttons';
}) {
  if (mode === 'buttons') {
    return (
      <div className="flex flex-wrap gap-2">
        {SOCIALS.map(s => {
          const v = member[s.key];
          return v ? (
            <a
              key={s.key}
              href={s.href(v)}
              target="_blank"
              rel="noreferrer"
              className="flex items-center gap-2 rounded-lg border border-white/15 px-3 py-1.5 font-mono text-xs text-white/70 transition-colors hover:border-amber-300 hover:text-amber-300"
            >
              <Icon d={s.path} size={14} />
              {s.label}
            </a>
          ) : (
            <span
              key={s.key}
              title="—"
              className="flex items-center gap-2 rounded-lg border border-white/10 px-3 py-1.5 font-mono text-xs text-white/20"
            >
              <Icon d={s.path} size={14} />
              {s.label}
            </span>
          );
        })}
      </div>
    );
  }

  const links = SOCIALS.filter(s => member[s.key]);
  if (!links.length) return null;
  return (
    <div className="mt-1.5 flex items-center gap-2.5">
      {links.map(s => (
        <a
          key={s.key}
          href={s.href(member[s.key]!)}
          target="_blank"
          rel="noreferrer"
          aria-label={`@${member.handle} on ${s.label}`}
          onClick={e => e.stopPropagation()}
          onKeyDown={e => e.stopPropagation()}
          className="text-white/35 transition-colors hover:text-amber-300"
        >
          <Icon d={s.path} size={14} />
        </a>
      ))}
    </div>
  );
}
