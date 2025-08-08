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
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
const cors = require('cors');
app.use(cors());
// Middleware to parse JSON
app.use(express_1.default.json());
// Requests
app.get('/', (req, res) => {
    res.send('Hello, Express with TypeScript!');
});
//Processors page.
app.get('/api/parts/processors', async (req, res) => {
    try {
        const processors = await (0, fetchParts_1.FetchParts)(0);
        res.json(processors);
    }
    catch (error) {
        console.error('Failed to fetch processors:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
});
//CPU Coolers page.
app.get('/api/parts/cpu_coolers', async (req, res) => {
    try {
        const cpuCoolers = await (0, fetchParts_1.FetchParts)(1);
        res.json(cpuCoolers);
    }
    catch (error) {
        console.error('Failed to fetch CPU coolers:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
});
//Motherboards page
app.get('/api/parts/motherboards', async (req, res) => {
    try {
        const motherboards = await (0, fetchParts_1.FetchParts)(4);
        res.json(motherboards);
    }
    catch (error) {
        console.error('Failed to fetch motherboards:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
});
//Memory page
app.get('/api/parts/memory', async (req, res) => {
    try {
        const memory = await (0, fetchParts_1.FetchParts)(5);
        res.json(memory);
    }
    catch (error) {
        console.error('Failed to fetch memory:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
});
//Disks page
app.get('/api/parts/disks', async (req, res) => {
    try {
        const disks = await (0, fetchParts_1.FetchParts)(6);
        res.json(disks);
    }
    catch (error) {
        console.error('Failed to fetch disks:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
});
//Video cards page
app.get('/api/parts/video_cards', async (req, res) => {
    try {
        const videoCards = await (0, fetchParts_1.FetchParts)(2);
        res.json(videoCards);
    }
    catch (error) {
        console.error('Failed to fetch video cards:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
});
//Cases page
app.get('/api/parts/cases', async (req, res) => {
    try {
        const cases = await (0, fetchParts_1.FetchParts)(7);
        res.json(cases);
    }
    catch (error) {
        console.error('Failed to fetch cases:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
});
//Case fans page
app.get('/api/parts/case_fans', async (req, res) => {
    try {
        const caseFans = await (0, fetchParts_1.FetchParts)(8);
        res.json(caseFans);
    }
    catch (error) {
        console.error('Failed to fetch case fans:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
});
//Power supplies page
app.get('/api/parts/power_supplies', async (req, res) => {
    try {
        const powerSupplies = await (0, fetchParts_1.FetchParts)(3);
        res.json(powerSupplies);
    }
    catch (error) {
        console.error('Failed to fetch power supplies:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
});
//Others page
app.get('/api/parts/others', async (req, res) => {
    try {
        const others = await (0, fetchParts_1.FetchParts)(9);
        res.json(others);
    }
    catch (error) {
        console.error('Failed to fetch others:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
    ;
});
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
