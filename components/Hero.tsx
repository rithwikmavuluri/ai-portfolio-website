'use client';

import { Sparkles } from 'lucide-react';
import ChatInterface from '@/components/ChatInterface';

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center justify-center px-6 py-20">
      {/* Ambient Background Effects */}
      <div
        className="fixed top-[10%] right-[10%] w-[600px] h-[600px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255,107,107,0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'float 20s ease-in-out infinite'
        }}
      />

      <div
        className="fixed bottom-[20%] left-[5%] w-[500px] h-[500px] pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(78,205,196,0.15) 0%, transparent 70%)',
          filter: 'blur(100px)',
          animation: 'float 25s ease-in-out infinite reverse'
        }}
      />

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto">
        {/* Main Heading */}
        <h1
          className="text-6xl md:text-7xl lg:text-8xl font-bold mb-6 tracking-tight"
          style={{ animation: 'fadeInUp 0.8s ease-out' }}
        >
          Rithwik Mavuluri
        </h1>

        {/* Role Badge */}
        <div
          className="inline-flex items-center gap-3 px-6 py-3 bg-white/10 backdrop-blur-lg border border-white/20 rounded-full mb-8"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.2s backwards' }}
        >
          <Sparkles size={18} className="text-coral" />
          <span className="text-base font-semibold uppercase tracking-wider">
            AI Product Manager
          </span>
        </div>

        {/* Tagline */}
        <p
          className="text-2xl md:text-3xl text-white/90 mb-4 font-medium"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.4s backwards' }}
        >
          I ship AI products fast and think deeply.
        </p>

        {/* Subtitle */}
        <p
          className="text-lg md:text-xl text-white/60 mb-12 max-w-2xl mx-auto"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.6s backwards' }}
        >
          This portfolio is interactive—ask me anything about my work.
        </p>

        {/* Chat Interface */}
        <div
          className="w-full max-w-3xl mx-auto"
          style={{ animation: 'fadeInUp 0.8s ease-out 0.8s backwards' }}
        >
          <ChatInterface
            suggestedQuestions={[
              "What AI products have you shipped?",
              "How do you approach AI product strategy?",
              "Tell me about a complex problem you solved"
            ]}
          />
        </div>
      </div>
    </section>
  );
}
