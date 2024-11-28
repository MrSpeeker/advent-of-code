const express = require('express');
const axios = require('axios');
const cors = require('cors');
const app = express();
const port = 3000;

// Enable CORS for all routes
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/fetch-data', async (req, res) => {
    const { year, day } = req.query;
    const url = `https://adventofcode.com/${year}/day/${day}/input`;
    try {
        const response = await axios.get(url, {
            headers: {
                'Cookie': 'session=53616c7465645f5f4bc1ad241e147fdb0e0974cab5315fd9adf3355394bd968e34c876a8f50e4362872c3baddd29fb2962a410fdd97a7ae4a2f2f51f73ea0c3a'
            }
        });
        res.send(response.data);
    } catch (error) {
        res.status(500).send('Error fetching data');
    }
});

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
