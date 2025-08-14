// The server entry point.

import dotenv from 'dotenv';
dotenv.config();


import express, { Request, Response } from 'express';
import { Part } from './types/part';
import { Configuration } from './types/configuration';
import { FetchParts } from './queries/fetchParts';
import { FetchConfigs } from './queries/fetchConfigs';
import { Product } from './types/product';
import { FetchLatest } from './queries/fetchLatest';
import { fetchSpecsByPartName } from './queries/FetchSpecs';



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

// HOME PAGE

// Configurations section
app.get('/api/latest/configurations', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await FetchLatest();
    res.json(products);
  } catch (error) {
    console.error(':(\nFailed to fetch latest products.');
    res.status(500).json({ error: 'Internal server error' });
  };
});

// Processors section
app.get('/api/latest/processors', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await FetchLatest(0);
    res.json(products);
  } catch (error) {
    console.error(':(\nFailed to fetch latest processors.');
    res.status(500).json({ error: 'Internal server error' });
  };
});

// Coolers section
app.get('/api/latest/coolers', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await FetchLatest(1);
    res.json(products);
  } catch (error) {
    console.error(':(\nFailed to fetch latest coolers.');
    res.status(500).json({ error: 'Internal server error' });
  };
});

// Motherboards section
app.get('/api/latest/motherboards', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await FetchLatest(4);
    res.json(products);
  } catch (error) {
    console.error(':(\nFailed to fetch latest motherboards.');
    res.status(500).json({ error: 'Internal server error' });
  };
});

// Memory section
app.get('/api/latest/memory', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await FetchLatest(5);
    res.json(products);
  } catch (error) {
    console.error(':(\nFailed to fetch latest memory.');
    res.status(500).json({ error: 'Internal server error' });
  };
});

// Disks section
app.get('/api/latest/disks', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await FetchLatest(6);
    res.json(products);
  } catch (error) {
    console.error(':(\nFailed to fetch latest disks.');
    res.status(500).json({ error: 'Internal server error' });
  };
});

// Video cards section
app.get('/api/latest/video-cards', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await FetchLatest(2);
    res.json(products);
  } catch (error) {
    console.error(':(\nFailed to fetch latest video cards.');
    res.status(500).json({ error: 'Internal server error' });
  };
});

// Cases section
app.get('/api/latest/cases', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await FetchLatest(7);
    res.json(products);
  } catch (error) {
    console.error(':(\nFailed to fetch latest cases.');
    res.status(500).json({ error: 'Internal server error' });
  };
});

// Case fans section
app.get('/api/latest/case-fans', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await FetchLatest(8);
    res.json(products);
  } catch (error) {
    console.error(':(\nFailed to fetch latest case fans.');
    res.status(500).json({ error: 'Internal server error' });
  };
});

// Power supplies section
app.get('/api/latest/power-supplies', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await FetchLatest(3);
    res.json(products);
  } catch (error) {
    console.error(':(\nFailed to fetch latest power supplies.');
    res.status(500).json({ error: 'Internal server error' });
  };
});

// Others section
app.get('/api/latest/others', async (req: Request, res: Response) => {
  try {
    const products: Product[] = await FetchLatest(9);
    res.json(products);
  } catch (error) {
    console.error(':(\nFailed to fetch latest others.');
    res.status(500).json({ error: 'Internal server error' });
  };
});

// PRODUCTS PAGES

//Configurations page.
app.get('/api/configurations', async (req: Request, res: Response) => {
  try {
    const configurations: Configuration[] = await FetchConfigs();
    res.json(configurations);
  } catch (error) {
    console.error('Failed to fetch configurations:', error);
    res.status(500).json({ error: 'Internal server error' });
  };
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

//FetchSpecs
app.get('/api/specs/:partName', async (req, res) => {
  try {
    // Décodage du nom de la part depuis l'URL
    const partName = decodeURIComponent(req.params.partName);

    if (!partName) {
      return res.status(400).json({ message: 'Nom de produit manquant.' });
    }

    const specs = await fetchSpecsByPartName(partName);

    if (!specs || Object.keys(specs).length === 0) {
      return res.status(404).json({ message: 'Aucune spécification trouvée pour ce produit.' });
    }

    res.json({ partName, specifications: specs });
  } catch (error) {
    console.error('Erreur lors de la récupération des specs :', error);
    res.status(500).json({ message: 'Erreur serveur lors de la récupération des spécifications.' });
  }
});



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
