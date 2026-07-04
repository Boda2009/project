const mongoose = require('mongoose');
require('dotenv').config();

// Import your existing models
const Category = require('./models/Category');
const Product = require('./models/Product');

// Check that MONGO_URI is configured
const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/testdb';

const seedElectronicsStore = async () => {
  try {
    // 1. Connect to the MongoDB database
    await mongoose.connect(mongoURI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('🔌 Connected to database for seeding...');

    // 2. Clear out any existing products and categories to ensure a clean slate
    await Product.deleteMany({});
    await Category.deleteMany({});
    console.log('🗑️ Cleared older records.');

    // 3. Create explicit Electronics categories (Task 2.1)
    const laptopCat = await Category.create({ name: 'Laptops' });
    const phoneCat = await Category.create({ name: 'Smartphones' });
    const audioCat = await Category.create({ name: 'Audio & Headphones' });
    console.log('📁 Created Electronics Categories.');

    // 4. Create explicit Electronics products linked to those categories (Task 2.2 / 2.3)
    const electronicsProducts = [
      {
        name: 'ProBook Laptop 15"',
        description: 'High-performance workstation with 16GB RAM, 512GB SSD, and an Intel i7 processor.',
        price: 1200,
        stock: 15, // Stock bounds for checkout verification
        category: laptopCat._id
      },
      {
        name: 'Ultrabook Slim 13',
        description: 'Lightweight travel laptop featuring an all-day battery life and stunning 4K display.',
        price: 950,
        stock: 8,
        category: laptopCat._id
      },
      {
        name: 'Z-Phone Pro Max',
        description: 'Next-generation flagship smartphone with a triple-lens camera and 120Hz AMOLED screen.',
        price: 999,
        stock: 25,
        category: phoneCat._id
      },
      {
        name: 'LitePhone 5G',
        description: 'Affordable, mid-range 5G phone offering exceptional battery performance.',
        price: 450,
        stock: 4, // Low stock item to test your Task 7 checkout blocking limits!
        category: phoneCat._id
      },
      {
        name: 'Studio Wireless Headphones',
        description: 'Over-ear active noise-canceling headphones with high-fidelity acoustic response.',
        price: 299,
        stock: 40,
        category: audioCat._id
      },
      {
        name: 'BassBoost Earbuds',
        description: 'True wireless sweat-resistant earbuds perfect for workouts and quick charging.',
        price: 89,
        stock: 60,
        category: audioCat._id
      }
    ];

    await Product.insertMany(electronicsProducts);
    console.log('💻 Successfully injected electronics stock catalog details into database!');

    // 5. Disconnect safely
    await mongoose.disconnect();
    console.log('👋 Seeding process complete. Disconnected from database.');
    process.exit(0);

  } catch (error) {
    console.error('❌ Error while seeding database:', error.message);
    process.exit(1);
  }
};

// Run the script
seedElectronicsStore();