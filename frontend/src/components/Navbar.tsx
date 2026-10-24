import React from 'react';
import { ShoppingBag, Sliders, Moon, Sun, ShieldCheck, ShieldAlert } from 'lucide-react';

interface NavbarProps {
  cartCount: number;
  onOpenCart: () => void;
  onOpenDebug: () => void;
  darkMode: boolean;
  isConnected: boolean;
  environment: string;
}

export const Navbar: React.FC<NavbarProps> = ({
  cartCount,
  onOpenCart,
  onOpenDebug,
  darkMode,
  isConnected,
  environment,
}) => {
  return (
    <header className="navbar">
      <div className="navbar-container">
        {/* Brand Logo & Title */}
        <div className="navbar-brand">
          <div className="brand-icon-wrapper">
            <ShoppingBag className="brand-icon" size={22} />
          </div>
          <span className="brand-title">DemoStore</span>
          <span className="sdk-badge">SDK Consumer</span>
        </div>

        {/* Navigation Links */}
        <nav className="navbar-links">
          <a href="#featured" className="nav-link active">Featured</a>
          <a href="#products" className="nav-link">Catalog</a>
          <a href="#about" className="nav-link">About Demo</a>
        </nav>

        {/* Actions & Feature Flag Info */}
        <div className="navbar-actions">
          {/* Environment / Flag Status Pill */}
          <div className="status-pill" onClick={onOpenDebug} title="Click to open Feature Flag Debug Panel">
            {isConnected ? (
              <span className="pill-dot connected" />
            ) : (
              <span className="pill-dot disconnected" />
            )}
            <span className="pill-env">{environment}</span>
          </div>

          {/* Current Theme Pill (Controlled by Feature Flag) */}
          <div className={`theme-pill ${darkMode ? 'dark' : 'light'}`} title={`Theme controlled by dark-mode feature flag: ${darkMode ? 'ON' : 'OFF'}`}>
            {darkMode ? <Moon size={15} /> : <Sun size={15} />}
            <span>{darkMode ? 'Dark Theme' : 'Light Theme'}</span>
          </div>

          {/* Cart Button */}
          <button className="cart-btn" onClick={onOpenCart}>
            <ShoppingBag size={18} />
            <span className="cart-label">Cart</span>
            {cartCount > 0 && <span className="cart-badge">{cartCount}</span>}
          </button>

          {/* Developer Debug Panel Button */}
          <button className="debug-toggle-btn" onClick={onOpenDebug} title="Open Feature Flags Control Panel">
            <Sliders size={18} />
            <span className="debug-btn-text">Feature Flags</span>
          </button>
        </div>
      </div>
    </header>
  );
};
