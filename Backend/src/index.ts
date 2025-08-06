// The server entry point.

import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { Processor } from './types/processor';
import { FetchProcessors } from './queries/fetchProcessors';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Requests

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

app.get('/test', (req: Request, res: Response) => {
  res.send('You are on the test page.');
});

app.get('/parts/processors', async (req: Request, res: Response) => {
  try {
    const processors: Processor[] = await FetchProcessors();
    res.json(processors);
  } catch (error) {
    console.error('Failed to fetch processors:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
