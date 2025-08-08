// The server entry point.

import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { Part } from './types/part';
import { FetchParts } from './queries/fetchParts';

const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());


// Middleware to parse JSON
app.use(express.json());

// Requests

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

//Processors page.
app.get('/api/parts/processors', async (req: Request, res: Response) => {
  try {
    const processors: Part[] = await FetchParts(0);
    res.json(processors);
  } catch (error) {
    console.error('Failed to fetch processors:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//CPU Coolers page.
app.get('/api/parts/cpu_coolers', async (req: Request, res: Response) => {
  try {
    const cpuCoolers: Part[] = await FetchParts(1);
    res.json(cpuCoolers);
  } catch (error) {
    console.error('Failed to fetch CPU coolers:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Motherboards page
app.get('/api/parts/motherboards', async (req: Request, res: Response) => {
  try {
    const motherboards: Part[] = await FetchParts(4);
    res.json(motherboards);
  } catch (error) {
    console.error('Failed to fetch motherboards:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});


//Memory page
app.get('/api/parts/memory', async (req: Request, res: Response) => {
  try {
    const memory: Part[] = await FetchParts(5);
    res.json(memory);
  } catch (error) {
    console.error('Failed to fetch memory:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Disks page
app.get('/api/parts/disks', async (req: Request, res: Response) => {
  try {
    const disks: Part[] = await FetchParts(6);
    res.json(disks);
  } catch (error) {
    console.error('Failed to fetch disks:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Video cards page
app.get('/api/parts/video_cards', async (req: Request, res: Response) => {
  try {
    const videoCards: Part[] = await FetchParts(2);
    res.json(videoCards);
  } catch (error) {
    console.error('Failed to fetch video cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Cases page
app.get('/api/parts/cases', async (req: Request, res: Response) => {
  try {
    const cases: Part[] = await FetchParts(7);
    res.json(cases);
  } catch (error) {
    console.error('Failed to fetch cases:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Case fans page
app.get('/api/parts/case_fans', async (req: Request, res: Response) => {
  try {
    const caseFans: Part[] = await FetchParts(8);
    res.json(caseFans);
  } catch (error) {
    console.error('Failed to fetch case fans:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Power supplies page
app.get('/api/parts/power_supplies', async (req: Request, res: Response) => {
  try {
    const powerSupplies: Part[] = await FetchParts(3);
    res.json(powerSupplies);
  } catch (error) {
    console.error('Failed to fetch power supplies:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Others page
app.get('/api/parts/others', async (req: Request, res: Response) => {
  try {
    const others: Part[] = await FetchParts(9);
    res.json(others);
  } catch (error) {
    console.error('Failed to fetch others:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
