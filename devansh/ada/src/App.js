import React, { useEffect, useState } from 'react';
import './index.css';

function App() {
  const [products, setProducts] = useState([]);
  const [cart, setCart] = useState({});

  useEffect(() => {
    fetch("https://dummyjson.com/products")
      .then(response => response.json())
      .then(data => setProducts(data.products));
  }, []);

  const toggleCart = (id) => {
    if (cart[id]) {
      const newCart = { ...cart };
      delete newCart[id];
      setCart(newCart);
    } else {
      setCart((prevCart) => ({
        ...prevCart,
        [id]: 1,
      }));
    }
  };

  const increment = (id) => {
    setCart((prevCart) => ({
      ...prevCart,
      [id]: prevCart[id] + 1,
    }));
  };

  const decrement = (id) => {
    setCart((prevCart) => {
      if (prevCart[id] === 1) {
        const newCart = { ...prevCart };
        delete newCart[id];
        return newCart;
      }
      return {
        ...prevCart,
        [id]: prevCart[id] - 1,
      };
    });
  };

  return (
    <div className='container'>
      {products.map(product => (
        <div key={product.id} className='card'>
          <img src={product.thumbnail} alt='product' />
          <p>${product.price}</p>
          {cart[product.id] ? (
            <div className='quantity-control'>
              <button onClick={() => decrement(product.id)}>-</button>
              <span>{cart[product.id]}</span>
              <button onClick={() => increment(product.id)}>+</button>
            </div>
          ) : (
            <button onClick={() => toggleCart(product.id)}>
              Add to Cart
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default App;
