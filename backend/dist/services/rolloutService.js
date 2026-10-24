import axios from 'axios';
import { config } from '../config/env.js';
/**
 * Fetches feature flag configurations from the Smart Feature Release Management platform.
 * Keeps SDK Key strictly on backend.
 */
export async function fetchFeaturesFromRollout() {
    const fetchedAt = new Date().toISOString();
    // 1. SDK key missing check
    if (!config.rolloutSdkKey || config.rolloutSdkKey.trim() === '') {
        return {
            status: 'error',
            environment: 'Unconfigured',
            features: [],
            error: 'ROLLOUT_SDK_KEY is missing in backend .env file',
            fetchedAt,
        };
    }
    try {
        const response = await axios.get(`${config.rolloutApiUrl}/api/sdk/features`, {
            headers: {
                Authorization: `Bearer ${config.rolloutSdkKey.trim()}`,
                'Content-Type': 'application/json',
            },
            timeout: 5000,
        });
        if (response.data && response.data.success && response.data.data) {
            const apiData = response.data.data;
            return {
                status: 'connected',
                environment: apiData.environment || 'qa-testing',
                features: Array.isArray(apiData.features) ? apiData.features : [],
                fetchedAt,
            };
        }
        return {
            status: 'error',
            environment: 'Unknown',
            features: [],
            error: 'Received invalid response structure from Rollout API',
            fetchedAt,
        };
    }
    catch (error) {
        if (axios.isAxiosError(error)) {
            if (error.response) {
                const statusCode = error.response.status;
                if (statusCode === 401 || statusCode === 403) {
                    return {
                        status: 'error',
                        environment: 'Unauthorized',
                        features: [],
                        error: 'Invalid or revoked SDK key',
                        fetchedAt,
                    };
                }
                return {
                    status: 'error',
                    environment: 'Error',
                    features: [],
                    error: `Rollout API returned status code ${statusCode}`,
                    fetchedAt,
                };
            }
            else if (error.code === 'ECONNREFUSED' || error.code === 'ENOTFOUND') {
                return {
                    status: 'error',
                    environment: 'Offline',
                    features: [],
                    error: `Cannot reach Rollout platform at ${config.rolloutApiUrl}`,
                    fetchedAt,
                };
            }
        }
        return {
            status: 'error',
            environment: 'Error',
            features: [],
            error: 'Failed to communicate with feature management platform',
            fetchedAt,
        };
    }
}
