import { Route, Routes } from 'react-router-dom';

import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import Hero from './components/Hero';

import ProductDetail from './features/products/components/ProductDetail';
import ProductList from './features/products/components/ProductList';
import TrendingDrops from './features/products/components/TrendingDrops';

function App() {
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main>
        <Routes>
          <Route
            path="/"
            element={
              <>
                <Hero />
                <TrendingDrops />
                <FinalCTA />
              </>
            }
          />
          <Route path="/products" element={<ProductList />} />
          <Route path="/products/:id" element={<ProductDetail />} />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;
