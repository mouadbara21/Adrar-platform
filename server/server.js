import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';

// Import routes
import trailsRouter from './routes/trails.js';
import refugesRouter from './routes/refuges.js';
import parksRouter from './routes/parks.js';
import authRouter from './routes/auth.js';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 4000;

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/trails', trailsRouter);
app.use('/api/refuges', refugesRouter);
app.use('/api/parks', parksRouter);
app.use('/api/auth', authRouter);

// Health check
app.get('/api/health', (req, res) => {
  res.json({ status: 'OK', message: 'ADRAR API is running' });
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});