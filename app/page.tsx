import Hero from '@/components/Hero';
import Projects from '@/components/Projects';
import Skills from '@/components/Skills';
import Education from '@/components/Education';
import FloatingNav from '@/components/FloatingNav';

export default function Home() {
  return (
    <main className="min-h-screen">
      {/* Hero Section with integrated ChatInterface */}
      <Hero />

      {/* Featured Work Section */}
      <Projects />

      {/* Skills Section */}
      <Skills />

      {/* Education Section */}
      <Education />

      {/* Floating Navigation */}
      <FloatingNav />

      {/* Footer */}
      <footer className="relative py-12 px-6 border-t border-white/10">
        <div className="max-w-6xl mx-auto text-center">
          <p className="text-white/60">
            © {new Date().getFullYear()} Rithwik Mavuluri. Built with Next.js, Google Gemini, and Tailwind CSS.
          </p>
          <p className="text-white/40 mt-2 text-sm">
            This portfolio uses RAG (Retrieval-Augmented Generation) to answer questions about my experience.
          </p>
        </div>
      </footer>
    </main>
  );
}
