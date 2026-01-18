'use client';

import { Target, Lightbulb, TrendingUp, BookOpen } from 'lucide-react';
import content from '../content.json';

export default function CaseStudy() {
  const caseStudy = content.case_study;

  return (
    <section id="case-study" className="relative py-24 px-6 bg-white/[0.02]">
      <div className="max-w-5xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div
            className="inline-flex items-center gap-2 px-4 py-2 bg-coral/10 border border-coral/30 rounded-full mb-4"
            style={{ animation: 'fadeInUp 0.6s ease-out' }}
          >
            <span className="text-sm font-semibold text-coral uppercase tracking-wider">
              Featured Case Study
            </span>
          </div>

          <h2
            className="text-4xl md:text-5xl font-bold mb-4"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.1s backwards' }}
          >
            {caseStudy.title}
          </h2>

          <p
            className="text-xl text-white/60 max-w-3xl mx-auto"
            style={{ animation: 'fadeInUp 0.6s ease-out 0.2s backwards' }}
          >
            How I reduced roof measurement time from 2 hours to 6 minutes using computer vision
          </p>
        </div>

        {/* At a Glance */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.3s backwards' }}
        >
          <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-center">
            <div className="text-4xl font-bold text-coral mb-2">
              {caseStudy.at_a_glance.impact}
            </div>
            <div className="text-sm text-white/60 uppercase tracking-wide">Impact</div>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-center">
            <div className="text-4xl font-bold text-teal mb-2">
              {caseStudy.at_a_glance.timeline}
            </div>
            <div className="text-sm text-white/60 uppercase tracking-wide">Timeline</div>
          </div>

          <div className="p-6 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl text-center">
            <div className="text-lg font-bold text-mint mb-2">
              {caseStudy.at_a_glance.role}
            </div>
            <div className="text-sm text-white/60 uppercase tracking-wide">Role</div>
          </div>
        </div>

        {/* Problem */}
        <div
          className="mb-12 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.4s backwards' }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-coral/10 border border-coral/30 rounded-2xl">
              <Target className="w-6 h-6 text-coral" />
            </div>
            <h3 className="text-3xl font-bold">The Problem</h3>
          </div>
          <p className="text-lg text-white/80 leading-relaxed">
            {caseStudy.problem}
          </p>
        </div>

        {/* Solution */}
        <div
          className="mb-12 p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.5s backwards' }}
        >
          <div className="flex items-start gap-4 mb-4">
            <div className="p-3 bg-teal/10 border border-teal/30 rounded-2xl">
              <Lightbulb className="w-6 h-6 text-teal" />
            </div>
            <h3 className="text-3xl font-bold">The Solution</h3>
          </div>
          <p className="text-lg text-white/80 leading-relaxed mb-6">
            {caseStudy.solution}
          </p>

          {/* My Role Details */}
          <div className="space-y-4">
            <h4 className="text-xl font-bold text-white/90 mb-3">My Role</h4>
            {Object.entries(caseStudy.my_role).map(([key, value], index) => (
              <div key={key} className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 bg-teal rounded-full flex-shrink-0" />
                <div>
                  <span className="font-semibold text-teal capitalize">
                    {key.replace(/_/g, ' ')}:
                  </span>{' '}
                  <span className="text-white/80">{value}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Impact */}
        <div
          className="mb-12 p-8 bg-gradient-to-r from-coral/10 to-teal/10 backdrop-blur-xl border-2 border-coral/20 rounded-3xl"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.6s backwards' }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-coral/20 border border-coral/40 rounded-2xl">
              <TrendingUp className="w-6 h-6 text-coral" />
            </div>
            <h3 className="text-3xl font-bold">Impact</h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {Object.entries(caseStudy.impact).map(([key, value], index) => (
              <div key={key} className="flex items-start gap-3">
                <div className="mt-1.5 w-2 h-2 bg-coral rounded-full flex-shrink-0" />
                <div>
                  <div className="font-semibold text-coral capitalize mb-1">
                    {key.replace(/_/g, ' ')}
                  </div>
                  <div className="text-white/90">{value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Learnings */}
        <div
          className="p-8 bg-white/5 backdrop-blur-xl border border-white/10 rounded-3xl"
          style={{ animation: 'fadeInUp 0.6s ease-out 0.7s backwards' }}
        >
          <div className="flex items-start gap-4 mb-6">
            <div className="p-3 bg-mint/10 border border-mint/30 rounded-2xl">
              <BookOpen className="w-6 h-6 text-mint" />
            </div>
            <h3 className="text-3xl font-bold">Key Learnings</h3>
          </div>

          <div className="space-y-4">
            {caseStudy.learnings.map((learning, index) => (
              <div key={index} className="flex items-start gap-3">
                <div className="mt-2 w-1.5 h-1.5 bg-mint rounded-full flex-shrink-0" />
                <p className="text-lg text-white/80 leading-relaxed">{learning}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
