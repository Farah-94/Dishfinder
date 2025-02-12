import express from 'express';
import fetch from 'node-fetch';
import cors from 'cors';

const app = express();
const port = 3000;

const apiKey = 'AIzaSyBU2-TW07AVkZTFKiFwqgnx1ijhObNXcxE'; // API key

app.use(cors()); 

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

app.listen(port, () => {
    console.log(`Proxy server listening at http://localhost:${port}`);
});
