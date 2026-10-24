import express from 'express';
import cors from 'cors';
import { config } from './config/env.js';
import featureRoutes from './routes/features.js';

const app = express();

app.use(cors());
app.use(express.json());

// API Routes
app.use('/api', featureRoutes);

// Health check endpoint
app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'DemoStore Backend', timestamp: new Date().toISOString() });
});

app.listen(config.port, () => {
  console.log(`=================================================`);
  console.log(` DemoStore Backend is running on port ${config.port}`);
  console.log(` Target Rollout Platform URL: ${config.rolloutApiUrl}`);
  console.log(` SDK Key configured: ${config.rolloutSdkKey ? 'YES (Key Hidden)' : 'NO'}`);
  console.log(`=================================================`);
});
