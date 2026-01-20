import Hero from './components/Hero';
import Features from './components/Features';
import Demo from './components/Demo';

function App() {
  return (
    <div className="min-h-screen bg-[#0c0c0e] text-white selection:bg-white/20 antialiased">
      {/* Background Grid */}
      <div className="fixed inset-0 bg-grid-white pointer-events-none" />

      <main className="relative z-10">
        <Hero />
        <Features />
        <Demo />
      </main>

      <footer className="relative z-10 py-12 text-center text-white/40 text-sm border-t border-white/[0.08] mt-24">
        <p>&copy; 2024 Ultimate Scraper. Designed for precision.</p>
      </footer>
    </div>
  );
}

export default App;


