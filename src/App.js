import React, { useState, useEffect } from 'react';
import './App.css';

function EcommerceDataFetcher() {
  const [products, setProducts] = useState([]);  // Initialize as an empty array
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setLoading(true);
        const response = await fetch('https://fakestoreapi.com/products');  // Example API
        if (!response.ok) {
          throw new Error('Failed to fetch data');
        }
        const result = await response.json();
        console.log(result);  // Log the result to check its structure
        setProducts(result);  // Store the fetched data in state
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchData(); 
  }, []); 

  // Check if products is an array before using map()
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  // Ensure data is an array before mapping over it
  if (!Array.isArray(products)) {
    return <div>Error: Data is not an array</div>;
  }

  return (
    <div>
      <h1>eCommerce Products</h1>
      <div className="products">
        {products.map((product) => (
          <div key={product.id} className="product">
            <img src={product.image} alt={product.title} />
            <h2>{product.title}</h2>
            <p>{product.description}</p>
            <p><strong>${product.price}</strong></p>
          </div>
        ))}
      </div>
    </div>
  );
}

export default EcommerceDataFetcher;
