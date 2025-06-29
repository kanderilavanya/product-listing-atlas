// Load environment variables from .env
require('dotenv').config();

// Import required packages
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');

// Import product routes
const productRoutes = require('./routes/productRoutes');

// Initialize app
const app = express();

// ========================
// ✅ Middleware
// ========================
app.use(cors({
  origin: process.env.ALLOWED_ORIGIN || '*', // Allow all for now
}));
app.use(express.json());

// Serve static images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ========================
// ✅ Routes
// ========================
app.get('/', (req, res) => {
  res.send('<h2>✅ Backend is running. Visit <a href="/api/products">/api/products</a></h2>');
});
app.use('/api', productRoutes);

// ========================
// ✅ MongoDB + Start Server
// ========================
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log('✅ MongoDB connected');

  app.listen(PORT, () => {
    const isRender = !!process.env.PORT;
    const mode = isRender ? 'Render (Production)' : 'Local (Development)';
    const url = isRender
      ? `https://your-backend-name.onrender.com`  // Replace with actual Render URL
      : `http://localhost:${PORT}`;

    console.log(`🚀 Server running in ${mode}`);
    console.log(`🔗 Open in browser: ${url}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});