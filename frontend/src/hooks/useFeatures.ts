import { useState, useEffect, useCallback, useRef } from 'react';
import { FeatureFlag, FeatureApiResponse } from '../types/feature';
import { fetchDemoFeatures } from '../services/featureApi';

export function useFeatures() {
  const [features, setFeatures] = useState<FeatureFlag[]>([]);
  const [environment, setEnvironment] = useState<string>('Loading...');
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastFetched, setLastFetched] = useState<Date | null>(null);

  const isFetchingRef = useRef(false);
  const refreshFeatures = useCallback(async () => {
    // Prevent overlapping requests
    if (isFetchingRef.current) return;
    isFetchingRef.current = true;
    setIsLoading(true);
    try {
      const data: FeatureApiResponse = await fetchDemoFeatures();
      setLastFetched(new Date(data.fetchedAt || Date.now()));
      if (data.status === 'connected') {
        setIsConnected(true);
        setEnvironment(data.environment || 'qa-testing');
        setFeatures(data.features || []);
        setError(null);
      } else {
        setIsConnected(false);
        setEnvironment(data.environment || 'Offline');
        setFeatures([]);
        setError(data.error || 'Feature flags service unavailable. Using safe defaults.');
      }
    } catch (err) {
      // Gracefully handle network or unexpected errors
      setIsConnected(false);
      setError((err as Error).message || 'Unexpected error while fetching features');
    } finally {
      setIsLoading(false);
      isFetchingRef.current = false;
    }
  }, []);

  useEffect(() => {
    // Initial fetch
    refreshFeatures();
    // Set up polling every 5 seconds
    const intervalId = setInterval(() => {
      refreshFeatures();
    }, 5000);
    // Cleanup on unmount
    return () => clearInterval(intervalId);
  }, [refreshFeatures]);

  /**
   * Safe helper to evaluate feature flag state.
   * If flag doesn't exist, API is down, or killSwitch is enabled, returns defaultValue (false).
   */
  const getFeature = useCallback(
    (key: string, defaultValue = false): boolean => {
      const match = features.find((f) => f.key === key);
      if (!match) return defaultValue;
      if (match.killSwitch) return false;
      return match.enabled;
    },
    [features]
  );

  return {
    features,
    environment,
    isConnected,
    isLoading,
    error,
    lastFetched,
    getFeature,
    refreshFeatures,
  };
}
