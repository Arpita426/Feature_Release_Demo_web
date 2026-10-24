export interface FeatureFlag {
  key: string;
  enabled: boolean;
  rolloutPercentage?: number;
  killSwitch?: boolean;
  targetingRules?: Record<string, any>;
  variables?: Record<string, any>;
}

export interface FeatureApiResponse {
  status: 'connected' | 'error';
  environment: string;
  features: FeatureFlag[];
  error?: string;
  fetchedAt: string;
}

export interface Product {
  id: string;
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewsCount: number;
  badge?: string;
  image: string;
  description: string;
}
