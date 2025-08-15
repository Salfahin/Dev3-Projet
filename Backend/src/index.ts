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
import { supabase } from './lib/supabaseClient';



const app = express();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());

// Middleware to parse JSON
app.use(express.json());

// Requests

// HOME PAGE ROUTES

interface Category {
  route: string;
  index: number | undefined; // undefined for the default FetchLatest
  name: string;
}

const categories: Category[] = [
  { route: 'configurations', index: undefined, name: 'products' },
  { route: 'processors', index: 0, name: 'processors' },
  { route: 'coolers', index: 1, name: 'coolers' },
  { route: 'motherboards', index: 4, name: 'motherboards' },
  { route: 'memory', index: 5, name: 'memory' },
  { route: 'disks', index: 6, name: 'disks' },
  { route: 'video-cards', index: 2, name: 'video cards' },
  { route: 'cases', index: 7, name: 'cases' },
  { route: 'case-fans', index: 8, name: 'case fans' },
  { route: 'power-supplies', index: 3, name: 'power supplies' },
  { route: 'others', index: 9, name: 'others' },
];

categories.forEach(({ route, index, name }) => {
  app.get(`/api/latest/${route}`, async (req: Request, res: Response) => {
    try {
      const products: Product[] = index !== undefined ? await FetchLatest(index) : await FetchLatest();
      res.json(products);
    } catch (error) {
      console.error(`:(\nFailed to fetch latest ${name}.`);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
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

// Parts pages.

interface PartCategory {
  route: string;
  index: number;
  name: string;
}

const partCategories: PartCategory[] = [
  { route: 'processors', index: 0, name: 'processors' },
  { route: 'cpu_coolers', index: 1, name: 'CPU coolers' },
  { route: 'motherboards', index: 4, name: 'motherboards' },
  { route: 'memory', index: 5, name: 'memory' },
  { route: 'disks', index: 6, name: 'disks' },
  { route: 'video_cards', index: 2, name: 'video cards' },
  { route: 'cases', index: 7, name: 'cases' },
  { route: 'case_fans', index: 8, name: 'case fans' },
  { route: 'power_supplies', index: 3, name: 'power supplies' },
  { route: 'others', index: 9, name: 'others' },
];

partCategories.forEach(({ route, index, name }) => {
  app.get(`/api/parts/${route}`, async (req: Request, res: Response) => {
    try {
      const parts: Part[] = await FetchParts(index);
      res.json(parts);
    } catch (error) {
      console.error(`Failed to fetch ${name}:`, error);
      res.status(500).json({ error: 'Internal server error' });
    }
  });
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


// Submit form.

app.post('/api/add-part', async (req: Request, res: Response) => { // This is 100% GPT-made.
  try {
    const { part_name, part_manufacturer, part_price, part_type } = req.body;

    // Validate required fields
    if (!part_name || !part_manufacturer || !part_price || part_type === undefined) {
      return res.status(400).json({ error: 'Missing required fields' });
    }

    // Upsert the part (insert if new, do nothing if exists)
    const { data, error } = await supabase
      .from('parts')
      .upsert(
        [{ part_name, part_manufacturer, part_price, part_type }],
        { onConflict: 'part_name', ignoreDuplicates: true } // prevent duplicate errors
      )
      .select(); // returns inserted/updated row

    if (error) {
      console.error('Supabase upsert error:', error);
      return res.status(500).json({ error: 'Failed to insert part' });
    }

    // If data is empty, it means the part already existed
    if (!data || data.length === 0) {
      return res.status(200).json({ message: 'Part already exists, no changes made.' });
    }

    res.status(201).json({ message: 'Part added successfully', part: data[0] });
  } catch (err) {
    console.error('Server error:', err);
    res.status(500).json({ error: 'Internal server error' });
  }
});


app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
