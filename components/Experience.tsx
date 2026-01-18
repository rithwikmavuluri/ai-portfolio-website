'use client';

import { Briefcase, MapPin, Calendar } from 'lucide-react';
import content from '../content.json';

export default function Experience() {
  return (
    <section id="experience" className="relative py-24 px-6">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Experience</h2>
          <p className="text-xl text-white/60">
            5.5 years shipping AI products at fast-growing startups
          </p>
        </div>

        {/* Timeline */}
        <div className="space-y-8">
          {content.experience.map((exp, index) => (
            <div
              key={index}
              className="relative pl-8 md:pl-12 border-l-2 border-white/10 hover:border-coral/50 transition-colors duration-300"
              style={{
                animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`
              }}
            >
              {/* Timeline Dot */}
              <div className="absolute -left-[9px] top-0 w-4 h-4 bg-gradient-to-r from-coral to-teal rounded-full ring-4 ring-dark" />

              {/* Content Card */}
              <div className="p-6 md:p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/8 transition-all duration-300 hover:scale-[1.02]">
                {/* Header */}
                <div className="mb-6">
                  <div className="flex flex-wrap items-start justify-between gap-4 mb-3">
                    <div>
                      <h3 className="text-2xl md:text-3xl font-bold text-white mb-2">
                        {exp.role}
                      </h3>
                      <p className="text-lg text-coral font-semibold mb-1">
                        {exp.company}
                      </p>
                      <p className="text-sm text-white/50">
                        {exp.description}
                      </p>
                    </div>

                    {/* Badges */}
                    <div className="flex flex-col items-end gap-2">
                      <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium whitespace-nowrap">
                        <Calendar className="inline-block w-4 h-4 mr-2" />
                        {exp.start_date} - {exp.end_date || 'Present'}
                      </div>
                      <div className="px-4 py-2 bg-white/5 border border-white/10 rounded-full text-sm font-medium whitespace-nowrap">
                        <MapPin className="inline-block w-4 h-4 mr-2" />
                        {exp.location}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Highlights */}
                <div className="space-y-3">
                  {exp.highlights.map((highlight, hIndex) => (
                    <div
                      key={hIndex}
                      className="flex items-start gap-3 text-white/80 leading-relaxed"
                    >
                      <div className="mt-2 w-1.5 h-1.5 bg-teal rounded-full flex-shrink-0" />
                      <p>{highlight}</p>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
