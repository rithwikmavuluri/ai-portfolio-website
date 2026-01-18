'use client';

import { Brain, Zap, Sparkles } from 'lucide-react';
import content from '../content.json';

export default function Education() {
  const education = content.education;
  const certifications = content.certifications;

  return (
    <section id="education" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <h2
            className="text-5xl md:text-6xl font-bold mb-4"
            style={{ animation: 'fadeInUp 0.6s ease-out' }}
          >
            Education & Learning
          </h2>
          <p
            className="text-xl text-white/60"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.1s backwards' }}
          >
            Continuous learning fuels continuous shipping
          </p>
        </div>

        {/* BITS Pilani Hero Card */}
        <div
          className="mb-12 p-10 bg-gradient-to-r from-coral/10 to-teal/10 backdrop-blur-xl border-2 border-white/20 rounded-3xl text-center relative overflow-hidden"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.2s backwards' }}
        >
          {/* Ambient glow */}
          <div className="absolute -top-1/2 -left-1/2 w-[200%] h-[200%] bg-gradient-radial from-coral/10 to-transparent pointer-events-none" />

          <div className="relative z-10 flex flex-col items-center gap-5">
            {/* BITS Logo Circle */}
            <div className="w-20 h-20 rounded-full flex items-center justify-center shadow-[0_8px_32px_rgba(30,58,138,0.4)]">
              <img
                src="https://upload.wikimedia.org/wikipedia/en/d/d3/BITS_Pilani-Logo.svg"
                alt="BITS Pilani Logo"
                className="w-20 h-20 object-contain"
              />
            </div>

            <div>
              <div className="text-3xl md:text-4xl font-extrabold mb-3 bg-gradient-to-r from-coral to-teal bg-clip-text text-transparent leading-tight">
                {education.degree}
              </div>
              <div className="text-2xl font-semibold text-white/90 mb-2">
                {education.institution}
              </div>
              <div className="text-base text-white/60 font-medium">
                {education.start_year} - {education.end_year}
              </div>
            </div>
          </div>
        </div>

        {/* Certifications Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* AI/ML Certifications */}
          <div
            className="p-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/8 hover:border-coral/30 hover:-translate-y-1 transition-all duration-300"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.3s backwards' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Brain size={20} className="text-coral" />
              <h3 className="text-lg font-bold text-coral">
                {certifications.ai_ml.category}
              </h3>
            </div>
            <div className="space-y-3">
              {certifications.ai_ml.items.map((cert: any, index: number) => (
                <div
                  key={index}
                  className="p-3 bg-coral/10 border border-coral/20 rounded-xl"
                >
                  <div className="text-sm font-semibold text-white/90 mb-1">
                    {cert.name}
                  </div>
                  <div className="text-xs text-white/60">
                    {cert.provider}
                    {cert.status === 'In Progress' && ' (In Progress)'}
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Product Certifications */}
          <div
            className="p-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/8 hover:border-teal/30 hover:-translate-y-1 transition-all duration-300"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.4s backwards' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Zap size={20} className="text-teal" />
              <h3 className="text-lg font-bold text-teal">
                {certifications.product.category}
              </h3>
            </div>
            <div className="p-3 bg-teal/10 border border-teal/20 rounded-xl">
              <div className="text-sm font-semibold text-white/90 mb-1">
                {certifications.product.items[0].name}
              </div>
              <div className="text-xs text-white/60 mb-3">
                {certifications.product.items[0].provider}
              </div>
              <div className="flex flex-wrap gap-2">
                {certifications.product.items[0].areas.map((area: string, i: number) => (
                  <span
                    key={i}
                    className="px-2 py-1 bg-teal/20 border border-teal/30 rounded-lg text-xs font-semibold text-teal"
                  >
                    {area}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Continuous Learning */}
          <div
            className="p-7 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/8 hover:border-mint/30 hover:-translate-y-1 transition-all duration-300"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.5s backwards' }}
          >
            <div className="flex items-center gap-3 mb-4">
              <Sparkles size={20} className="text-mint" />
              <h3 className="text-lg font-bold text-mint">
                {certifications.learning.category}
              </h3>
            </div>
            <div className="space-y-3">
              {certifications.learning.items.map((item: any, index: number) => (
                <a
                  key={index}
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block p-3 bg-mint/10 border border-mint/20 rounded-xl hover:bg-mint/15 hover:border-mint transition-all duration-300"
                >
                  <div className="text-sm font-semibold text-white/90 mb-0.5">
                    {item.name}
                  </div>
                  <div className="text-xs text-white/60">{item.focus}</div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
