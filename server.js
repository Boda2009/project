const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');
const productRoutes = require('./routes/productRoutes');

// Load environment config
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Body Parser Middleware
app.use(express.json());

// Mount Routing Files
app.use('/api/products', productRoutes);
// Import Routes
const cartRoutes = require('./routes/cartRoutes');
const orderRoutes = require('./routes/orderRoutes');

// Mount Routes (add this below your existing app.use middleware)
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);
const PORT = process.env.PORT ||5000;

app.listen(PORT, () => {
  console.log(`Server running in environment mode on port: ${PORT}`);
});
