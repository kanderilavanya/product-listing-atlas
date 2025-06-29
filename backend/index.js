require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const productRoutes = require('./routes/productRoutes');

const app = express();

// ✅ Allow Netlify and Localhost via CORS
app.use(cors({
  origin: ['https://productlistingatlas.netlify.app', 'http://localhost:3000'],
}));

app.use(express.json());

// ✅ Serve static images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ✅ Routes
app.get('/', (req, res) => {
  res.send('<h2>✅ Backend is running. Visit <a href="/api/products">/api/products</a></h2>');
});
app.use('/api', productRoutes);

// ✅ MongoDB + Server Start
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
      ? `https://product-backend-wqun.onrender.com`
      : `http://localhost:${PORT}`;

    console.log(`🚀 Server running in ${mode}`);
    console.log(`🔗 Open in browser: ${url}`);
  });
})
.catch((err) => {
  console.error('❌ MongoDB connection failed:', err.message);
});