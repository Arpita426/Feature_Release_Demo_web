import React from 'react';
import { X, RefreshCw, CheckCircle2, AlertCircle, Server, Key, Moon, Sparkles, HelpCircle } from 'lucide-react';
import { FeatureFlag } from '../types/feature';

interface DebugPanelProps {
  isOpen: boolean;
  onClose: () => void;
  environment: string;
  isConnected: boolean;
  features: FeatureFlag[];
  lastFetched: Date | null;
  onRefresh: () => void;
  isLoading: boolean;
  error: string | null;
  darkMode: boolean;
  newCheckout: boolean;
}

export const DebugPanel: React.FC<DebugPanelProps> = ({
  isOpen,
  onClose,
  environment,
  isConnected,
  features,
  lastFetched,
  onRefresh,
  isLoading,
  error,
  darkMode,
  newCheckout,
}) => {
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="debug-panel-modal" onClick={(e) => e.stopPropagation()}>
        <div className="debug-panel-header">
          <div className="debug-title">
            <Server size={20} className="debug-icon" />
            <div>
              <h3>SDK Feature Flags Console</h3>
              <p className="debug-subtitle">DemoStore Backend ↔ Rollout Platform Connection</p>
            </div>
          </div>
          <button className="modal-close-btn" onClick={onClose}>
            <X size={20} />
          </button>
        </div>

        <div className="debug-panel-content">
          {/* Connection Status Card */}
          <div className={`connection-card ${isConnected ? 'connected' : 'error'}`}>
            <div className="connection-status-header">
              {isConnected ? (
                <>
                  <CheckCircle2 size={20} className="status-icon success" />
                  <span>Connected to Rollout Platform</span>
                </>
              ) : (
                <>
                  <AlertCircle size={20} className="status-icon error" />
                  <span>Connection Fallback Mode</span>
                </>
              )}
            </div>

            <div className="connection-details-grid">
              <div className="detail-item">
                <span className="detail-label">Connected Environment</span>
                <span className="detail-value highlight">{environment}</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">SDK Key Location</span>
                <span className="detail-value">Demo Backend (.env)</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Client Security</span>
                <span className="detail-value secure">✓ Key Not Exposed</span>
              </div>
              <div className="detail-item">
                <span className="detail-label">Last Fetched</span>
                <span className="detail-value">
                  {lastFetched ? lastFetched.toLocaleTimeString() : 'Never'}
                </span>
              </div>
            </div>

            {error && (
              <div className="debug-error-box">
                <strong>Error details:</strong> {error}
              </div>
            )}
          </div>

          {/* Feature Flags Active State List */}
          <div className="features-list-section">
            <div className="section-title-bar">
              <h4>Consumed Feature Flags ({features.length})</h4>
              <button
                className="refresh-features-btn"
                onClick={onRefresh}
                disabled={isLoading}
              >
                <RefreshCw size={14} className={isLoading ? 'spin' : ''} />
                {isLoading ? 'Fetching...' : 'Refresh Features'}
              </button>
            </div>

            <div className="feature-cards-grid">
              {/* Dark Mode Flag Card */}
              <div className={`feature-card ${darkMode ? 'enabled' : 'disabled'}`}>
                <div className="feature-card-header">
                  <div className="feature-card-title">
                    <Moon size={18} />
                    <code>dark-mode</code>
                  </div>
                  <span className={`status-badge ${darkMode ? 'on' : 'off'}`}>
                    {darkMode ? 'ENABLED (ON)' : 'DISABLED (OFF)'}
                  </span>
                </div>
                <p className="feature-card-desc">
                  Dynamically toggles full DemoStore visual theme between Light and Dark mode.
                </p>
                <div className="feature-effect">
                  <strong>Current Effect:</strong> {darkMode ? '🌙 Dark Mode Active' : '☀️ Light Mode Active'}
                </div>
              </div>

              {/* New Checkout Flag Card */}
              <div className={`feature-card ${newCheckout ? 'enabled' : 'disabled'}`}>
                <div className="feature-card-header">
                  <div className="feature-card-title">
                    <Sparkles size={18} />
                    <code>new-checkout</code>
                  </div>
                  <span className={`status-badge ${newCheckout ? 'on' : 'off'}`}>
                    {newCheckout ? 'ENABLED (ON)' : 'DISABLED (OFF)'}
                  </span>
                </div>
                <p className="feature-card-desc">
                  Switches cart checkout UI between Classic Order Summary and ✨ Express 1-Click Checkout.
                </p>
                <div className="feature-effect">
                  <strong>Current Effect:</strong> {newCheckout ? '✨ New Express Checkout' : '📦 Classic Standard Checkout'}
                </div>
              </div>
            </div>
          </div>

          {/* Demo Instructions */}
          <div className="demo-guide-box">
            <div className="guide-title">
              <HelpCircle size={16} />
              <span>How to test feature flag changes:</span>
            </div>
            <ol className="guide-steps">
              <li>Open the Rollout Platform Dashboard at <code>http://localhost:5000</code> or your dev URL.</li>
              <li>Toggle the <code>dark-mode</code> or <code>new-checkout</code> feature flag status.</li>
              <li>Click the <strong>[Refresh Features]</strong> button above.</li>
              <li>Watch DemoStore instantly update its behavior without reloading the application!</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  );
};
