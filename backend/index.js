require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path'); // ✅ required to handle file paths

const productRoutes = require('./routes/productRoutes');

const app = express();

// ✅ Middleware
app.use(cors());
app.use(express.json());

// ✅ Serve static images from public/images as /images
app.use('/images', express.static(path.join(__dirname, 'public/images')));

// ✅ API routes
app.use('/api', productRoutes);

// ✅ Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => {
  console.log("✅ MongoDB connected");
  app.listen(5000, () => console.log("🚀 Server started on port 5000"));
})
.catch(err => console.log("❌ MongoDB error:", err));
