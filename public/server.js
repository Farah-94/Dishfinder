import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;

const apiKey = 'AIzaSyABjc1lKGsa5X0uylefcIKxMt_s-u251cY';

app.use(cors());

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, 'public')));

app.get('/search', async (req, res) => {
    console.log('Received request:', req.query);
    const { query } = req.query;
    const baseUrl = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json';
    try {
        const response = await fetch(`${baseUrl}?location=51.5074,-0.1278&radius=5000&type=restaurant&keyword=${query}&key=${apiKey}`);
        const data = await response.json();
        console.log('API Response:', data);
        res.json(data);
    } catch (error) {
        console.error('Error fetching data:', error);
        res.status(500).send('Internal Server Error');
    }
});

// Serve index.html for root path
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
});

// Serve order.html for /order path
app.get('/order', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'order.html'));
});

// Serve booktable.html for /booktable path
app.get('/booktable', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'booktable.html'));
});

app.listen(PORT, () => {
    console.log(`Proxy server listening at http://localhost:${PORT}`);
});
