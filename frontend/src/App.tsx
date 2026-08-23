import { Route, Routes } from 'react-router-dom';

import FinalCTA from './components/FinalCTA';
import Footer from './components/Footer';
import Header from './components/Header/Header';
import Hero from './components/Hero';

import ProductDetail from './features/products/components/ProductDetail';
import ProductList from './features/products/components/ProductList';
import TrendingDrops from './features/products/components/TrendingDrops';

import LoginForm from './features/auth/components/LoginForm';
import SignupForm from './features/auth/components/SignupForm';
import MyAccount from './features/auth/components/MyAccount';
import ProtectedRoute from './features/auth/components/ProtectedRoute';
import FavoritesPage from './features/favorites/components/FavoritesPage';

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
          <Route path="/login" element={<LoginForm />} />
          <Route path="/signup" element={<SignupForm />} />
          <Route
            path="/account"
            element={
              <ProtectedRoute>
                <MyAccount />
              </ProtectedRoute>
            }
          />
          <Route
            path="/favorites"
            element={
              <ProtectedRoute>
                <FavoritesPage />
              </ProtectedRoute>
            }
          />
        </Routes>
      </main>

      <Footer />
    </div>
  );
}

export default App;