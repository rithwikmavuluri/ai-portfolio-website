'use client';

import { Mail, Linkedin, Calendar } from 'lucide-react';

export default function FloatingNav() {
  const navItems = [
    {
      name: 'Gmail',
      icon: Mail,
      color: '#EA4335',
      href: 'mailto:rithwikmavuluri@gmail.com',
      ariaLabel: 'Email Rithwik'
    },
    {
      name: 'TopMate',
      color: '#E94D35',
      href: 'https://topmate.io/rithwik_mavuluri',
      ariaLabel: 'Book time on TopMate',
      customIcon: (
        <svg width="20" height="20" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Red outer circle */}
          <circle cx="50" cy="50" r="45" fill="#E94D35"/>
          {/* White inner pac-man circle with mouth opening to the right */}
          <path d="M50 20 A30 30 0 1 1 50 80 L50 50 Z" fill="white"/>
        </svg>
      )
    },
    {
      name: 'Substack',
      color: '#FF6719',
      href: 'https://your-substack.substack.com',
      ariaLabel: 'Read on Substack',
      customIcon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Top bar */}
          <rect x="4" y="4" width="16" height="2.5" fill="#FF6719"/>
          {/* Middle bar */}
          <rect x="4" y="8.5" width="16" height="2.5" fill="#FF6719"/>
          {/* Bottom bar with notch */}
          <path d="M4 13H20V20L12 16L4 20V13Z" fill="#FF6719"/>
        </svg>
      )
    },
    {
      name: 'LinkedIn',
      icon: Linkedin,
      color: '#0077B5',
      href: 'https://linkedin.com/in/rithwik-mavuluri',
      ariaLabel: 'Connect on LinkedIn'
    },
    {
      name: 'Calendly',
      icon: Calendar,
      color: '#006BFF',
      href: 'https://calendly.com/rithwik-mavuluri',
      ariaLabel: 'Schedule a call',
      customIcon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <rect x="3" y="4" width="18" height="18" rx="2" stroke="#006BFF" strokeWidth="2" fill="none"/>
          <line x1="3" y1="9" x2="21" y2="9" stroke="#006BFF" strokeWidth="2"/>
          <line x1="8" y1="4" x2="8" y2="9" stroke="#006BFF" strokeWidth="2"/>
          <line x1="16" y1="4" x2="16" y2="9" stroke="#006BFF" strokeWidth="2"/>
          <circle cx="8" cy="14" r="1.5" fill="#006BFF"/>
          <circle cx="12" cy="14" r="1.5" fill="#006BFF"/>
          <circle cx="16" cy="14" r="1.5" fill="#006BFF"/>
          <circle cx="8" cy="18" r="1.5" fill="#006BFF"/>
          <circle cx="12" cy="18" r="1.5" fill="#006BFF"/>
        </svg>
      )
    }
  ];

  return (
    <div className="fixed bottom-8 left-1/2 -translate-x-1/2 z-50 animate-slideUp">
      <div className="flex items-center gap-3 px-6 py-4 bg-white/[0.08] backdrop-blur-[30px] border border-white/15 rounded-full shadow-2xl">
        {navItems.map((item, index) => {
          const Icon = item.icon;

          return (
            <a
              key={index}
              href={item.href}
              target={item.href.startsWith('mailto:') ? undefined : '_blank'}
              rel={item.href.startsWith('mailto:') ? undefined : 'noopener noreferrer'}
              aria-label={item.ariaLabel}
              className="group w-12 h-12 flex items-center justify-center bg-white/[0.05] border border-white/10 rounded-full transition-all duration-300 hover:bg-white/15 hover:scale-110 hover:-translate-y-1"
              style={{
                '--hover-color': item.color
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                e.currentTarget.style.borderColor = item.color;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.borderColor = 'rgba(255,255,255,0.1)';
              }}
            >
              {item.customIcon ? (
                item.customIcon
              ) : Icon ? (
                <Icon size={20} style={{ color: item.color }} />
              ) : null}
            </a>
          );
        })}
      </div>
    </div>
  );
}
