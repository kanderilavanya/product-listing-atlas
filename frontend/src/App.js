import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [products, setProducts] = useState([]);
  const [category, setCategory] = useState('');
  const [sortBy, setSortBy] = useState('');

  useEffect(() => {
    let url = `${process.env.REACT_APP_API_URL}/api/products`;
    const params = [];
    if (category) params.push(`category=${category}`);
    if (sortBy) params.push(`sortBy=${sortBy}`);
    if (params.length) url += '?' + params.join('&');

    fetch(url)
      .then(res => res.json())
      .then(data => {
        const withRatings = data.map((p, i) => ({
          ...p,
          rating: p.rating || [4.2, 3.8, 5, 4.0][i % 4],
        }));
        setProducts(withRatings);
      })
      .catch((err) => {
        console.error("❌ Failed to fetch products:", err);
      });
  }, [category, sortBy]);

  return (
    <div className="App" style={{ backgroundColor: "#1c1c1c", color: "#fff", minHeight: "100vh", padding: "20px" }}>
      <h1 style={{ color: "red", textAlign: "center" }}>🛒 Product Listing</h1>

      <div style={{ marginBottom: "20px", display: "flex", gap: "10px", justifyContent: "center" }}>
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
              src={`${process.env.REACT_APP_API_URL}${p.image}`}
              alt={p.name}
              onError={(e) => (e.target.src = "https://via.placeholder.com/150")}
            />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
            <p>{p.category}</p>
            <p>⭐ {p.rating}</p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;