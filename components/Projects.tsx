'use client';

import { useState } from 'react';
import content from '../content.json';
import CaseStudyModal from './CaseStudyModal';

export default function Projects() {
  const [showCaseStudy, setShowCaseStudy] = useState(false);

  // Filter to only show the 2 projects from content.json
  const featuredProjects = content.projects;

  return (
    <>
      <section id="projects" className="relative py-24 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Section Header */}
          <div className="text-center mb-16">
            <h2 className="text-5xl md:text-6xl font-bold mb-4">
              Featured Work
            </h2>
            <p className="text-xl text-white/60">
              AI products I've shipped from 0 to 1
            </p>
          </div>

          {/* Projects Grid - 2 cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {featuredProjects.map((project, index) => (
              <div
                key={project.id}
                onClick={() => {
                  if (project.has_case_study) {
                    setShowCaseStudy(true);
                  }
                }}
                className={`group relative p-8 bg-white/[0.03] backdrop-blur-xl border border-white/10 rounded-3xl transition-all duration-500 hover:bg-white/[0.08] ${
                  project.has_case_study
                    ? 'cursor-pointer hover:scale-[1.02] hover:shadow-2xl'
                    : 'cursor-default'
                }`}
                style={{
                  animation: `fadeInUp 0.6s ease-out ${index * 0.1}s backwards`,
                  borderColor: project.has_case_study ? project.color + '40' : 'rgba(255,255,255,0.1)'
                }}
              >
                {/* Ambient Glow on Hover */}
                {project.has_case_study && (
                  <div
                    className="absolute -top-1/2 -right-1/2 w-full h-full opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                    style={{
                      background: `radial-gradient(circle, ${project.color}15 0%, transparent 70%)`
                    }}
                  />
                )}

                <div className="relative z-10">
                  {/* Project Header */}
                  <div className="mb-4">
                    <h3
                      className="text-2xl font-bold text-white mb-3 group-hover:text-opacity-100 transition-all"
                      style={{
                        color: project.has_case_study ? project.color : '#ffffff'
                      }}
                    >
                      {project.title}
                    </h3>
                    <p className="text-white/70 leading-relaxed text-base">
                      {project.short_description}
                    </p>
                  </div>

                  {/* Technologies */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech, techIndex) => (
                      <span
                        key={techIndex}
                        className="px-3 py-1.5 rounded-xl text-xs font-semibold transition-all"
                        style={{
                          background: `${project.color}15`,
                          border: `1px solid ${project.color}30`,
                          color: project.color
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>

                  {/* View Case Study CTA - Only for Roof Detection */}
                  {project.has_case_study && (
                    <div
                      className="mt-5 p-3 rounded-2xl border transition-all duration-300 flex items-center justify-between group-hover:shadow-lg"
                      style={{
                        background: `linear-gradient(135deg, ${project.color}30 0%, ${project.color}20 100%)`,
                        borderColor: project.color + '60'
                      }}
                    >
                      <span
                        className="text-sm font-semibold"
                        style={{ color: project.color }}
                      >
                        View Full Case Study
                      </span>
                      <span
                        className="text-lg transition-transform group-hover:translate-x-1"
                        style={{ color: project.color }}
                      >
                        →
                      </span>
                    </div>
                  )}
                </div>

                {/* Ripple Effect on Click */}
                {project.has_case_study && (
                  <div className="absolute top-1/2 left-1/2 w-2 h-2 -translate-x-1/2 -translate-y-1/2 rounded-full opacity-0 group-active:opacity-100 group-active:animate-ripple pointer-events-none"
                    style={{ background: project.color }}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Study Modal */}
      {showCaseStudy && (
        <CaseStudyModal onClose={() => setShowCaseStudy(false)} />
      )}
    </>
  );
}
