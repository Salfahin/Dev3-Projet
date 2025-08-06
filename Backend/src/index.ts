// The server entry point.

import dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import { Part } from './types/part';
import {
  FetchProcessors,
  FetchCPUCoolers,
  FetchMotherboards,
  FetchMemory,
  FetchDisks,
  FetchVideoCards,
  FetchCases,
  FetchCaseFans,
  FetchPowerSupplies,
  FetchOthers,
} from './services/partsFetchers';

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse JSON
app.use(express.json());

// Requests

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, Express with TypeScript!');
});

//Processors page.
app.get('/parts/processors', async (req: Request, res: Response) => {
  try {
    const processors: Part[] = await FetchProcessors();
    res.json(processors);
  } catch (error) {
    console.error('Failed to fetch processors:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//CPU Coolers page.
app.get('/parts/cpu_coolers', async (req: Request, res: Response) => {
  try {
    const cpuCoolers: Part[] = await FetchCPUCoolers();
    res.json(cpuCoolers);
  } catch (error) {
    console.error('Failed to fetch CPU coolers:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Motherboards page
app.get('/parts/motherboards', async (req: Request, res: Response) => {
  try {
    const motherboards: Part[] = await FetchMotherboards();
    res.json(motherboards);
  } catch (error) {
    console.error('Failed to fetch motherboards:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});


//Memory page
app.get('/parts/memory', async (req: Request, res: Response) => {
  try {
    const memory: Part[] = await FetchMemory();
    res.json(memory);
  } catch (error) {
    console.error('Failed to fetch memory:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Disks page
app.get('/parts/disks', async (req: Request, res: Response) => {
  try {
    const disks: Part[] = await FetchDisks();
    res.json(disks);
  } catch (error) {
    console.error('Failed to fetch disks:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Video cards page
app.get('/parts/video_cards', async (req: Request, res: Response) => {
  try {
    const videoCards: Part[] = await FetchVideoCards();
    res.json(videoCards);
  } catch (error) {
    console.error('Failed to fetch video cards:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Cases page
app.get('/parts/cases', async (req: Request, res: Response) => {
  try {
    const cases: Part[] = await FetchCases();
    res.json(cases);
  } catch (error) {
    console.error('Failed to fetch cases:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Case fans page
app.get('/parts/case_fans', async (req: Request, res: Response) => {
  try {
    const caseFans: Part[] = await FetchCaseFans();
    res.json(caseFans);
  } catch (error) {
    console.error('Failed to fetch case fans:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Power supplies page
app.get('/parts/power_supplies', async (req: Request, res: Response) => {
  try {
    const powerSupplies: Part[] = await FetchPowerSupplies();
    res.json(powerSupplies);
  } catch (error) {
    console.error('Failed to fetch power supplies:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

//Others page
app.get('/parts/others', async (req: Request, res: Response) => {
  try {
    const others: Part[] = await FetchOthers();
    res.json(others);
  } catch (error) {
    console.error('Failed to fetch others:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
