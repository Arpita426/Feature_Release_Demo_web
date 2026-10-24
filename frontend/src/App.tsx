import React, { useState, useEffect } from 'react';
import { useFeatures } from './hooks/useFeatures';
import { Navbar } from './components/Navbar';
import { ProductCard } from './components/ProductCard';
import { CheckoutModal } from './components/CheckoutModal';
import { DebugPanel } from './components/DebugPanel';
import { WarningBanner } from './components/WarningBanner';
import { MOCK_PRODUCTS } from './data/mockProducts';
import { Product } from './types/feature';
import { ShoppingBag, Sparkles, Sliders, ArrowRight, ShieldCheck } from 'lucide-react';

export function App() {
  const {
    features,
    environment,
    isConnected,
    isLoading,
    error,
    lastFetched,
    getFeature,
    refreshFeatures,
  } = useFeatures();

  // Evaluate feature flags safely
  const darkMode = getFeature('dark-mode', false);
  const newCheckout = getFeature('new-checkout', false);
  const discount30 = getFeature('discount-30', false);
  // Cart & UI state
  const [cart, setCart] = useState<Product[]>([]);
  const [isCheckoutOpen, setIsCheckoutOpen] = useState(false);
  const [isDebugOpen, setIsDebugOpen] = useState(false);

  // Toggle dark mode class on document element
  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
    } else {
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  const handleAddToCart = (product: Product) => {
    setCart((prev) => {
      const exists = prev.some((item) => item.id === product.id);
      if (exists) {
        return prev.filter((item) => item.id !== product.id);
      }
      return [...prev, product];
    });
  };

  const handleClearCart = () => {
    setCart([]);
  };

  return (
    <div className={`app-container ${darkMode ? 'theme-dark' : 'theme-light'}`}>
      {/* Warning banner if connection to SDK platform failed */}
      <WarningBanner error={error} onRefresh={refreshFeatures} isLoading={isLoading} />

      {/* Main Navbar */}
      <Navbar
        cartCount={cart.length}
        onOpenCart={() => setIsCheckoutOpen(true)}
        onOpenDebug={() => setIsDebugOpen(true)}
        darkMode={darkMode}
        isConnected={isConnected}
        environment={environment}
      />

      {/* Hero Banner Section */}
      <section className="hero-section">
        <div className="hero-container">
          <div className="hero-badge">
            <Sparkles size={14} /> Smart Feature Release Management Demo
          </div>
          <h1 className="hero-title">
            Modern Tech Gear, <br />
            <span className="gradient-text">Feature Flag Driven</span>
          </h1>
          <p className="hero-subtitle">
            Experience real-time configuration changes powered by an environment-scoped SDK API.
            Toggle themes, checkout flows, and UI elements directly from your Rollout dashboard.
          </p>
          <div className="hero-actions">
            <button className="btn-primary" onClick={() => setIsCheckoutOpen(true)}>
              <ShoppingBag size={18} />
              View Shopping Cart ({cart.length})
            </button>
            <button className="btn-secondary" onClick={() => setIsDebugOpen(true)}>
              <Sliders size={18} />
              Open Feature Console
            </button>
          </div>
        </div>
      </section>

      {/* Feature Flag Live Status Bar */}
      <section className="flag-demo-bar">
        <div className="flag-bar-container">
          <div className="flag-indicator">
            <span className="flag-key">dark-mode:</span>
            <span className={`flag-value ${darkMode ? 'on' : 'off'}`}>
              {darkMode ? '🌙 ENABLED (Dark Theme)' : '☀️ DISABLED (Light Theme)'}
            </span>
          </div>

          <div className="flag-indicator">
            <span className="flag-key">new-checkout:</span>
            <span className={`flag-value ${newCheckout ? 'on' : 'off'}`}>
              {newCheckout ? '✨ ENABLED (New Express Checkout)' : '📦 DISABLED (Classic Checkout)'}
            </span>
          </div>

          <button className="flag-refresh-link" onClick={refreshFeatures} disabled={isLoading}>
            Refresh Flags ↻
          </button>
        </div>
      </section>

      {/* Product Catalog Section */}
      <main className="catalog-section" id="products">
        <div className="section-header">
          <h2>Featured Products</h2>
          <p>Explore high-end gadgets while testing flag evaluations</p>
        </div>

        <div className="products-grid">
          {MOCK_PRODUCTS.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onAddToCart={handleAddToCart}
              isInCart={cart.some((item) => item.id === product.id)}
            />
          ))}
        </div>
      </main>

      {/* Checkout Modal (Demonstrates new-checkout flag) */}
      <CheckoutModal
        isOpen={isCheckoutOpen}
        onClose={() => setIsCheckoutOpen(false)}
        cartItems={cart}
        newCheckoutEnabled={newCheckout}
        discountEnabled={discount30}
        onClearCart={handleClearCart}
      />

      {/* Developer Debug Panel */}
      <DebugPanel
        isOpen={isDebugOpen}
        onClose={() => setIsDebugOpen(false)}
        environment={environment}
        isConnected={isConnected}
        features={features}
        lastFetched={lastFetched}
        onRefresh={refreshFeatures}
        isLoading={isLoading}
        error={error}
        darkMode={darkMode}
        newCheckout={newCheckout}
      />

      {/* Footer */}
      <footer className="footer">
        <div className="footer-container">
          <div className="footer-brand">
            <h3>DemoStore</h3>
            <p>Smart Feature Release Management SDK Demo Application</p>
          </div>
          <div className="footer-meta">
            <div className="meta-badge">
              <ShieldCheck size={16} /> Backend SDK Key Guarded
            </div>
            <span>Backend Port: 5001 | Frontend Port: 5173</span>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default App;
