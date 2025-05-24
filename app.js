const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
const playerRoutes = require('./routes/player-routes');
const errorHandler = require('./middlewares/errorHandler');
const connectDB = require('./config/db');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use('/players', playerRoutes);
app.use(errorHandler);

module.exports = app;
