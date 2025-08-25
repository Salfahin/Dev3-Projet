"use strict";
// The server entry point.
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const express_1 = __importDefault(require("express"));
const fetchParts_1 = require("./queries/fetchParts");
const fetchConfigs_1 = require("./queries/fetchConfigs");
const fetchLatest_1 = require("./queries/fetchLatest");
const FetchSpecs_1 = require("./queries/FetchSpecs");
const supabaseClient_1 = require("./lib/supabaseClient");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());
// Middleware to parse JSON
app.use(express_1.default.json());
const categories = [
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
    app.get(`/api/latest/${route}`, async (req, res) => {
        try {
            const products = index !== undefined ? await (0, fetchLatest_1.FetchLatest)(index) : await (0, fetchLatest_1.FetchLatest)();
            res.json(products);
        }
        catch (error) {
            console.error(`:(\nFailed to fetch latest ${name}.`);
            res.status(500).json({ error: 'Internal server error' });
        }
    });
});
// # PRODUCTS PAGES
// ## Configurations page.
app.get('/api/configurations', async (req, res) => {
    try {
        const configurations = await (0, fetchConfigs_1.FetchConfigs)();
        res.json(configurations);
    }
    catch (error) {
        console.error('Failed to fetch configurations:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
});
const partCategories = [
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
    app.get(`/api/parts/${route}`, async (req, res) => {
        try {
            const parts = await (0, fetchParts_1.FetchParts)(index);
            res.json(parts);
        }
        catch (error) {
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
        const specs = await (0, FetchSpecs_1.fetchSpecsByPartName)(partName);
        if (!specs || Object.keys(specs).length === 0) {
            return res.status(404).json({ message: 'Aucune spécification trouvée pour ce produit.' });
        }
        res.json({ partName, specifications: specs });
    }
    catch (error) {
        console.error('Erreur lors de la récupération des specs :', error);
        res.status(500).json({ message: 'Erreur serveur lors de la récupération des spécifications.' });
    }
});
// # SUBMISSION FORM
// ## Part form
// ### Adds a part into "parts".
app.post('/api/add-part', async (req, res) => {
    try {
        const { part_name, part_manufacturer, part_price, part_type } = req.body;
        if (!part_name || !part_manufacturer || !part_price || part_type === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const { data, error } = await supabaseClient_1.supabase
            .from('parts')
            .insert([{
                part_name,
                part_manufacturer,
                part_price,
                part_type
            }])
            .select('part_id, part_name, part_manufacturer, part_price, part_type');
        if (error) {
            console.error('Supabase insert error:', error);
            return res.status(500).json({ error: 'Failed to insert part' });
        }
        res.status(201).json({
            message: 'Part added successfully',
            part: data[0] // includes part_id
        });
    }
    catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// ### Adds the specification of a part into "parts_specifications".
app.post("/api/add-specifications", async (req, res) => {
    try {
        const { part_id, specifications } = req.body;
        if (!part_id || !Array.isArray(specifications)) {
            return res.status(400).json({ error: "Invalid request" });
        }
        const { data, error } = await supabaseClient_1.supabase
            .from("parts_specifications")
            .insert(specifications.map(spec => ({
            part_id,
            part_specification: spec.specification,
            part_specification_value: spec.value
        })));
        if (error) {
            console.error("Supabase insert error:", error);
            return res.status(500).json({
                error: "Failed to insert specifications",
                details: error.message,
                hint: error.hint
            });
        }
        res.json({ success: true, data });
    }
    catch (err) {
        console.error("Server error:", err);
        res.status(500).json({ error: "Internal server error" });
    }
});
// ## Configuration form
// ### Adds a configuration into "configurations".
app.post('/api/add-config', async (req, res) => {
    try {
        const { config_name, config_author } = req.body;
        if (!config_name || !config_author === undefined) {
            return res.status(400).json({ error: 'Missing required fields' });
        }
        const { data, error } = await supabaseClient_1.supabase
            .from('configurations')
            .insert([{
                config_name,
                config_author
            }])
            .select('config_id, config_name, config_author');
        if (error) {
            console.error('Supabase insert error:', error);
            return res.status(500).json({ error: 'Failed to insert configuration' });
        }
        res.status(201).json({
            message: 'Configuration added successfully',
            config: data[0] // includes config_id
        });
    }
    catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// ### Adds the parts of the configurations into "configurations_parts".
// #### First, the form uses these two points to make suggestions to the user.
const partTypes = [
    { part_type: 0, part_label: "CPU" },
    { part_type: 1, part_label: "CPU_cooler" },
    { part_type: 2, part_label: "GPU" },
    { part_type: 3, part_label: "PSU" },
    { part_type: 4, part_label: "Motherboard" },
    { part_type: 5, part_label: "Memory" },
    { part_type: 6, part_label: "Storage" },
    { part_type: 7, part_label: "Case" },
    { part_type: 8, part_label: "Case fan" },
    { part_type: 9, part_label: "Custom" }
];
app.get('/api/part-types', (req, res) => {
    res.json(partTypes);
});
app.get('/api/parts-by-type/:type', async (req, res) => {
    try {
        const partTypeLabel = req.params.type; // e.g., "CPU", "Memory"
        if (!partTypeLabel) {
            return res.status(400).json({ error: 'Missing part type' });
        }
        // Find the type index from your predefined partTypes
        const partTypeObj = partTypes.find(pt => pt.part_label.toLowerCase() === partTypeLabel.toLowerCase());
        if (!partTypeObj) {
            return res.status(404).json({ error: 'Unknown part type' });
        }
        // Fetch parts from the database with that type
        const { data, error } = await supabaseClient_1.supabase
            .from('parts')
            .select('part_id, part_name, part_manufacturer, part_price, part_type')
            .eq('part_type', partTypeObj.part_type);
        if (error) {
            console.error('Supabase fetch error:', error);
            return res.status(500).json({ error: 'Failed to fetch parts' });
        }
        res.json({ partType: partTypeLabel, parts: data });
    }
    catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// #### This is the route used to submit the parts of a config in the DB.
app.post('/api/add-configparts', async (req, res) => {
    try {
        const { config_id, parts } = req.body;
        if (!config_id || !Array.isArray(parts)) {
            return res.status(400).json({ error: 'Invalid payload: missing config_id or parts' });
        }
        // Prepare rows to insert
        const rowsToInsert = parts
            .map(p => ({
            config_id,
            config_part_id: Number(p.value), // convert value to number
        }))
            .filter(p => !isNaN(p.config_part_id)); // ignore invalid entries
        if (rowsToInsert.length === 0) {
            return res.status(400).json({ error: 'No valid parts to insert' });
        }
        const { data, error } = await supabaseClient_1.supabase
            .from('configurations_parts')
            .insert(rowsToInsert);
        if (error) {
            console.error('Supabase insert error:', error);
            return res.status(500).json({ error: 'Failed to save configuration parts' });
        }
        res.json({ success: true, insertedParts: data });
    }
    catch (err) {
        console.error('Server error:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});
// # START
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
