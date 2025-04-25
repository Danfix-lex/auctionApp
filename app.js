const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

const authenticateRoutes = require('./routes/authenticateRoutes');
const itemRoutes = require('./routes/itemRoutes');

const app = express();
const port = process.env.PORT;

mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.set('trust proxy', 1);
app.use(cors());
app.use(express.json());

app.use('/api', authenticateRoutes);
app.use('/api/items', itemRoutes);

app.use('/uploads', express.static('uploads'));


app.get('/', (req, res) => {
    res.send('Auction App is running');
});

app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});