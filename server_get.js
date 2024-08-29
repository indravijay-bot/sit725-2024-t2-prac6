import express from 'express';
import mongoose from 'mongoose';
import connectDatabase from './database.js';
import router from './routers/router.js';
import path from 'path';
import { fileURLToPath } from 'url';

// Initialize express
const app = express();
const port = 3000;

// Database connection
connectDatabase();

// Routers
router(app);

// Middleware to parse JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// Serve static files from the "public" directory
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, 'public')));

// Send the HTML file when accessing the root
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Start the server
app.listen(port, () => {
    console.log(`Hello, I'm listening to port ${port}`);
});

