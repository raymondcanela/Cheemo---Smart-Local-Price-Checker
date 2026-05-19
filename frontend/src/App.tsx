import Header from './components/Header/Header';
import { useState } from 'react';

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const logout = () => setIsLoggedIn(false);

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-7xl mx-auto px-4 py-12">
        <div className="bg-white rounded-2xl shadow-sm p-8 text-center border border-gray-100">
          <h1 className="text-4xl font-extrabold text-gray-900 mb-4 tracking-tight">
            Track Prices, Save Money.
          </h1>
          <p className="text-lg text-gray-600 mb-8 max-w-2xl mx-auto">
            Cheemo helps you monitor local online store prices and alerts you when they drop. 
            Smart analytics for the savvy shopper.
          </p>
          
          {isLoggedIn ? (
            <div className="space-y-4">
              <p className="text-primary font-medium">Welcome back, Riyan!</p>
              <button 
                onClick={logout}
                className="text-sm text-gray-500 hover:text-tertiary transition-colors"
              >
                Logout
              </button>
            </div>
          ) : (
            <div className="flex justify-center gap-4">
              <button className="bg-primary text-white px-8 py-3 rounded-xl font-bold hover:opacity-90 transition-opacity shadow-lg shadow-primary/20">
                Explore Items
              </button>
              <button className="bg-white text-gray-700 px-8 py-3 rounded-xl font-bold border border-gray-200 hover:bg-gray-50 transition-colors">
                Learn More
              </button>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
