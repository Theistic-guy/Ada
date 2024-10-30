import React from 'react';
import { useCart } from './CartContext'; // Ensure the path is correct
import './cart.css'; // Import your CSS file for additional styles

const Cart = () => {
    const { cartItems, removeFromCart, updateQuantity, clearCart } = useCart();

    const handlePlaceOrder = () => {
        const confirmed = window.confirm("Are you sure you want to place the order?");
        if (confirmed) {
            const orderDetails = {
                items: cartItems,
                total: cartItems.reduce((total, item) => total + item.price * item.quantity, 0),
            };

            console.log('Order placed!', orderDetails);
            clearCart();
            alert("Your order has been placed successfully!");
        }
    };

    return (
        <div className="cart">
            <h2>Your Cart</h2>
            {cartItems.length === 0 ? (
                <p className="empty-cart-message">Your cart is empty.</p>
            ) : (
                <div className="cart-content">
                    <div className="cart-items">
                        <ul>
                            {cartItems.map(item => (
                                <li key={item.id} className="cart-item-box">
                                    <img src={item.thumbnail} alt={item.title} className="cart-item-image" />
                                    <div className="cart-item-details">
                                        <h4>{item.title}</h4>
                                        <p className="price">Price: ₹{item.price}</p>
                                        <p className="quantity">Quantity: {item.quantity}</p>
                                        <button onClick={() => removeFromCart(item.id)} className="delete-button">
                                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-trash" viewBox="0 0 16 16">
                                                <path d="M2.5 0a.5.5 0 0 1 .5.5V1h10V.5a.5.5 0 0 1 1 0V1h1a1 1 0 0 1 1 1v1a.5.5 0 0 1-.5.5H1A.5.5 0 0 1 .5 2V1a1 1 0 0 1 1-1h1V.5a.5.5 0 0 1 .5-.5zM1 4h14v1H1V4zm1 2h12v10a1 1 0 0 1-1 1H3a1 1 0 0 1-1-1V6z"/>
                                            </svg>
                                        </button>
                                        <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>+</button>
                                        <button 
                                            onClick={() => updateQuantity(item.id, Math.max(1, item.quantity - 1))} 
                                            style={{ opacity: item.quantity === 1 ? 0.5 : 1 }} // Make transparent if quantity is 1
                                        >
                                            -
                                        </button>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                    <div className="total-container">
                        <div className="total">
                            Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
                        </div>
                        <button onClick={handlePlaceOrder} className="place-order-button">
                            Place Order
                        </button>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Cart;
