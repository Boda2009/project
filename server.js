const express = require('express');
const dotenv = require('dotenv');
const connectDB = require('./config/db.js');

// --- 1. Import All Routing Files Together at the Top ---
const productRoutes = require('./routes/productRoutes');
const categoryRoutes = require('./routes/categoryRoutes');
const cartRoutes = require('./routes/cartRoutes');   // Moved to the top group
const orderRoutes = require('./routes/orderRoutes'); // Moved to the top group

// Load environment config
dotenv.config();

// Connect to MongoDB Database
connectDB();

const app = express();

// Body Parser Middleware (Must be defined BEFORE mounting routes)
app.use(express.json());

// --- 2. Mount All Routing Middleware ---
app.use('/api/products', productRoutes);
app.use('/api/categories', categoryRoutes);
app.use('/api/cart', cartRoutes);
app.use('/api/orders', orderRoutes);

// --- 3. Start Server Listen Event ---
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running in environment mode on port: ${PORT}`);
});
