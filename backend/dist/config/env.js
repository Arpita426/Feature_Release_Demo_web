import dotenv from 'dotenv';
import path from 'path';
// Load environment variables from .env file
dotenv.config({ path: path.resolve(process.cwd(), '.env') });
export const config = {
    port: parseInt(process.env.PORT || '5001', 10),
    rolloutApiUrl: (process.env.ROLLOUT_API_URL || 'http://localhost:5000').replace(/\/$/, ''),
    rolloutSdkKey: process.env.ROLLOUT_SDK_KEY || '',
};
