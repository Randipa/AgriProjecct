const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const dotenv = require('dotenv');

// Load environment variables
dotenv.config();

// Initialize the express app
const app = express();

// CORS configuration
const corsOptions = {
  origin: process.env.PUBLIC_URL || 'http://localhost:5173', 
  credentials: true,               
  optionsSuccessStatus: 200   
};

app.use(cors(corsOptions));  
app.use(express.json());     

// MongoDB connection
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('MongoDB connected successfully'))
  .catch(err => console.error('MongoDB connection error:', err));

// Routes
const storeItemRoutes = require('./routes/storeItemRoutes');
const orderRoutes = require('./routes/Orders');
const buyerAuthRoutes = require('./routes/buyerAuth');

// Use the routes
app.use('/store-items', storeItemRoutes);
app.use('/api/orders', orderRoutes);
app.use('/api/buyer', buyerAuthRoutes);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
