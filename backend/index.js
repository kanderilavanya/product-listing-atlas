require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static images from public/images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ✅ Root route – visit http://localhost:5000 to see this
app.get('/', (req, res) => {
  res.send('<h2>✅ Backend is running on <a href="/api/products">/api/products</a></h2>');
});

// ✅ API routes – for product-related endpoints
app.use('/api', productRoutes);

// ✅ MongoDB Connection and Server Start
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(5000, () => {
    console.log("🚀 Server started on http://localhost:5000");
  });
})
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
});
