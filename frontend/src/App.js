import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    let url = 'http://localhost:5000/api/products';
    const params = [];
    if (category) params.push(`category=${category}`);
    if (sortBy) params.push(`sortBy=${sortBy}`);
    if (params.length) url += '?' + params.join('&');

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data));
  }, [category, sortBy]);

  return (
    <div className="App">
      <h1 style={{ color: "red", textAlign: "center" }}>🛒 Product Listing</h1>

      <div>
        <select onChange={(e) => setCategory(e.target.value)}>
          <option value="">All Categories</option>
          <option value="Electronics">Electronics</option>
          <option value="Clothing">Clothing</option>
          <option value="Footwear">Footwear</option>
          <option value="Furniture">Furniture</option>
        </select>
        <select onChange={(e) => setSortBy(e.target.value)}>
          <option value="">Sort By</option>
          <option value="asc">Price: Low to High</option>
          <option value="desc">Price: High to Low</option>
        </select>
      </div>
      <div className="product-list">
        {products.map((p, i) => (
          <div key={i} className="product">
            <img
              src={`http://localhost:5000${p.image}`}
              alt={p.name}
              width="100"
              onError={(e) => (e.target.src = "https://via.placeholder.com/100")}
            />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p>{p.category}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
