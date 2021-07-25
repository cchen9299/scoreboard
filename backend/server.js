import express from 'express';
import cors from 'cors';
import scoreboard from './api/scoreboard.route.js';

const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/v1/scoreboard', scoreboard);
app.use('*', (req, res) => res.status(404).json({ error: 'not found' }));

export default app;
