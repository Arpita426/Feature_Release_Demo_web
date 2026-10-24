import { FeatureApiResponse } from '../types/feature';

const DEMO_BACKEND_URL = 'http://localhost:5001/api';

export async function fetchDemoFeatures(): Promise<FeatureApiResponse> {
  try {
    const response = await fetch(`${DEMO_BACKEND_URL}/features`);
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }
    const data: FeatureApiResponse = await response.json();
    return data;
  } catch (err: any) {
    return {
      status: 'error',
      environment: 'Offline Fallback',
      features: [],
      error: err.message || 'Demo Backend service is unavailable on port 5001',
      fetchedAt: new Date().toISOString(),
    };
  }
}
