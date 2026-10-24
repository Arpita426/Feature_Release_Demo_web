import { Router } from 'express';
import { fetchFeaturesFromRollout } from '../services/rolloutService.js';
const router = Router();
/**
 * GET /api/features
 * Endpoint consumed by the DemoStore frontend.
 * Proxies request to Rollout SDK API without exposing the SDK key.
 */
router.get('/features', async (_req, res) => {
    const result = await fetchFeaturesFromRollout();
    res.json(result);
});
export default router;
