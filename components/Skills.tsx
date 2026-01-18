'use client';

import { Code, Lightbulb, Users, Wrench } from 'lucide-react';
import content from '../content.json';

const iconMap: Record<string, any> = {
  ai_ml: Code,
  product: Lightbulb,
  leadership: Users,
  technical: Wrench,
};

export default function Skills() {
  return (
    <section id="skills" className="relative py-24 px-6">
      <div className="max-w-6xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 className="text-5xl md:text-6xl font-bold mb-4">Skills</h2>
          <p className="text-xl text-white/60">
            Full-stack product skillset for AI products
          </p>
        </div>

        {/* Skills Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {Object.entries(content.skills).map(([key, skillGroup]: [string, any], index) => {
            const Icon = iconMap[key] || Code;

            return (
              <div
                key={key}
                className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl hover:bg-white/8 hover:border-white/20 transition-all duration-300"
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`
                }}
              >
                {/* Category Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className="p-3 bg-gradient-to-r from-coral/20 to-teal/20 border border-coral/30 rounded-2xl">
                    <Icon className="w-6 h-6 text-coral" />
                  </div>
                  <h3 className="text-2xl font-bold">{skillGroup.category}</h3>
                </div>

                {/* Skills List */}
                <div className="flex flex-wrap gap-2">
                  {skillGroup.skills.map((skill: string, skillIndex: number) => (
                    <span
                      key={skillIndex}
                      className="px-4 py-2 bg-white/5 border border-white/10 rounded-xl text-sm font-medium text-white/90 hover:bg-white/10 hover:border-coral/30 hover:text-coral transition-all duration-300"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
