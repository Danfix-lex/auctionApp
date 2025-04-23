const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authenticateRoutes = require('./routes/authenticateRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const port = process.env.PORT || 3000;

mongoose.connect('mongodb://localhost:27017/auctionApp', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

app.use('/api', authenticateRoutes);
app.use('/api/items', itemRoutes);

app.get('/', (req, res) => {
    res.send('Auction App is running');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});