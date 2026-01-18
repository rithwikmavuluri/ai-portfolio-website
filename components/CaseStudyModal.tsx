'use client';

import { X } from 'lucide-react';
import content from '../content.json';

interface CaseStudyModalProps {
  onClose: () => void;
}

export default function CaseStudyModal({ onClose }: CaseStudyModalProps) {
  const caseStudy = content.case_study;

  return (
    <div
      className="fixed inset-0 bg-black/80 backdrop-blur-md z-[2000] flex items-center justify-center p-6 md:p-10 animate-fadeIn"
      onClick={onClose}
    >
      <div
        className="max-w-[900px] max-h-[90vh] w-full bg-gradient-to-b from-darkAlt to-dark rounded-[32px] p-8 md:p-12 overflow-auto relative border-2 border-mint/30 shadow-[0_24px_80px_rgba(0,0,0,0.6)] animate-slideUp"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-6 right-6 w-10 h-10 rounded-full bg-white/10 border border-white/20 text-white flex items-center justify-center hover:bg-coral/30 hover:scale-110 transition-all duration-300"
          aria-label="Close modal"
        >
          <X size={24} />
        </button>

        {/* Header */}
        <h2 className="text-4xl md:text-5xl font-extrabold mb-3 bg-gradient-to-r from-mint to-teal bg-clip-text text-transparent leading-tight">
          {caseStudy.title}
        </h2>

        {/* At a Glance */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10 p-6 bg-mint/10 border border-mint/20 rounded-3xl">
          <div>
            <div className="text-xs text-white/50 mb-1 font-semibold uppercase tracking-wide">Impact</div>
            <div className="text-sm md:text-base text-mint font-semibold">{caseStudy.at_a_glance.impact}</div>
          </div>
          <div>
            <div className="text-xs text-white/50 mb-1 font-semibold uppercase tracking-wide">Timeline</div>
            <div className="text-sm md:text-base text-white/90 font-semibold">{caseStudy.at_a_glance.timeline}</div>
          </div>
          <div>
            <div className="text-xs text-white/50 mb-1 font-semibold uppercase tracking-wide">Role</div>
            <div className="text-sm md:text-base text-white/90 font-semibold">{caseStudy.at_a_glance.role}</div>
          </div>
          <div>
            <div className="text-xs text-white/50 mb-1 font-semibold uppercase tracking-wide">Team</div>
            <div className="text-sm md:text-base text-white/90 font-semibold">{caseStudy.at_a_glance.team}</div>
          </div>
        </div>

        {/* The Problem */}
        <div className="mb-10">
          <h3 className="text-3xl font-bold mb-4 text-white">The Problem</h3>
          <p className="text-base md:text-lg leading-relaxed text-white/80 mb-4">
            {caseStudy.problem}
          </p>
        </div>

        {/* The Solution */}
        <div className="mb-10">
          <h3 className="text-3xl font-bold mb-4 text-white">The Solution</h3>
          <p className="text-base md:text-lg leading-relaxed text-white/80">
            {caseStudy.solution}
          </p>
        </div>

        {/* My Role */}
        <div className="mb-10">
          <h3 className="text-3xl font-bold mb-6 text-white">My Role: Product Leadership</h3>

          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3 text-teal">Dataset Strategy</h4>
            <p className="text-base md:text-lg leading-relaxed text-white/80">
              {caseStudy.my_role.dataset_strategy}
            </p>
          </div>

          <div className="mb-6">
            <h4 className="text-xl font-semibold mb-3 text-teal">Cross-Functional Execution</h4>
            <p className="text-base md:text-lg leading-relaxed text-white/80">
              {caseStudy.my_role.execution}
            </p>
          </div>

          <div>
            <h4 className="text-xl font-semibold mb-3 text-teal">Go-to-Market Impact</h4>
            <p className="text-base md:text-lg leading-relaxed text-white/80">
              {caseStudy.my_role.gtm}
            </p>
          </div>
        </div>

        {/* Impact */}
        <div className="mb-10">
          <h3 className="text-3xl font-bold mb-6 text-white">Impact</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-xs text-white/50 mb-2 font-semibold uppercase">For Designers</div>
              <div className="text-2xl text-mint font-bold mb-1">95% time reduction</div>
              <div className="text-sm text-white/70">15-20 min → 20 sec per roof</div>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-xs text-white/50 mb-2 font-semibold uppercase">For Sales Teams</div>
              <div className="text-2xl text-teal font-bold mb-1">60x productivity</div>
              <div className="text-sm text-white/70">Entire neighborhoods vs. select homes</div>
            </div>
            <div className="p-6 bg-white/5 border border-white/10 rounded-2xl">
              <div className="text-xs text-white/50 mb-2 font-semibold uppercase">For Business</div>
              <div className="text-2xl text-coral font-bold mb-1">$40k ARR</div>
              <div className="text-sm text-white/70">6 new customers in 6 months</div>
            </div>
          </div>
        </div>

        {/* Learnings */}
        <div className="mb-10">
          <h3 className="text-3xl font-bold mb-6 text-white">What I Learned</h3>
          {caseStudy.learnings.map((learning, index) => {
            const title = learning.split(':')[0];
            const description = learning.split(':').slice(1).join(':').trim();
            return (
              <div key={index} className="mb-5">
                <h4 className="text-lg font-semibold mb-2 text-mint">{title}</h4>
                <p className="text-base md:text-lg leading-relaxed text-white/80">{description}</p>
              </div>
            );
          })}
        </div>

        {/* Current Status */}
        <div className="mb-8">
          <h3 className="text-3xl font-bold mb-4 text-white">Current Status</h3>
          <p className="text-base md:text-lg leading-relaxed text-white/80">
            {caseStudy.status}
          </p>
        </div>

        {/* Technologies */}
        <div className="flex flex-wrap gap-2 pt-6 border-t border-white/10">
          {caseStudy.technologies.map((tech, i) => (
            <span
              key={i}
              className="px-4 py-2 bg-mint/15 border border-mint/30 rounded-xl text-sm font-semibold text-mint"
            >
              {tech}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
