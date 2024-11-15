import React from 'react';

const Cart = ({ cart, products }) => {
  const cartItems = Object.keys(cart).map(id => {
    const product = products.find(p => p.id === Number(id));
    return (
      <div key={id}>
        <h3>{product.name}</h3>
        <img src={product.thumbnail} alt='product' />
        <p>Quantity: {cart[id]}</p>
        <p>Price: ${(product.price * cart[id]).toFixed(2)}</p>
      </div>
    );
  });

  return (
    <div>
      <h1>Your Cart</h1>
      {cartItems.length ? cartItems : <p>No items in the cart.</p>}
    </div>
  );
};

export default Cart;
