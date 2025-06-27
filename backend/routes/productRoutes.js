const express = require('express');
const router = express.Router();
const Product = require('../models/Product');

router.get('/products', async (req, res) => {
    const { category, sortBy } = req.query;
    let filter = category ? { category } : {};
    let sort = sortBy ? { price: sortBy === 'asc' ? 1 : -1 } : {};
    const products = await Product.find(filter).sort(sort);
    res.json(products);
});

router.post('/products', async (req, res) => {
    const product = new Product(req.body);
    await product.save();
    res.json(product);
});

module.exports = router;