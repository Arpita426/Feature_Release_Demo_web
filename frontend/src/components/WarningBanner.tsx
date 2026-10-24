import React from 'react';
import { AlertTriangle, RefreshCw } from 'lucide-react';

interface WarningBannerProps {
  error: string | null;
  onRefresh: () => void;
  isLoading: boolean;
}

export const WarningBanner: React.FC<WarningBannerProps> = ({ error, onRefresh, isLoading }) => {
  if (!error) return null;

  return (
    <div className="warning-banner">
      <div className="warning-banner-content">
        <AlertTriangle className="warning-icon" size={18} />
        <span>
          <strong>Feature Configuration Warning:</strong> {error} (Using default fallback settings).
        </span>
      </div>
      <button className="warning-refresh-btn" onClick={onRefresh} disabled={isLoading}>
        <RefreshCw size={14} className={isLoading ? 'spin' : ''} />
        Retry Connection
      </button>
    </div>
  );
};
