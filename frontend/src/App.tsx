import Header from './components/Header/Header';
import Hero from './components/Hero';
import TrendingDrops from './features/products/components/TrendingDrops';
import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />
      <main>
        <Hero />
        <TrendingDrops />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}

export default App;
