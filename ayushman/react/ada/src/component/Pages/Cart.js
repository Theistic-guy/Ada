import { useContext } from "react";
import { CartContext } from "./CartContext";
import Header from "../Header";

const Cart = () => {
  const {
    cartItems,
    increaseQuantity,
    decreaseQuantity,
    removeFromCart,
    cartLoading,
  } = useContext(CartContext);

  if (cartLoading) {
    return <div className="loading">Loading your cart...</div>;
  }

  if (!cartItems || cartItems.length === 0) {
    return <div>Your cart is empty.</div>;
  }

  const calculateTotal = () => {
    return cartItems.reduce(
      (total, item) => total + item.salePrice * item.quantity,
      0
    );
  };

  return (
    <>
      <Header></Header>
      <div className="cart-container">
        <div className="cart-items">
          <h2 className="cart-title">Shopping Cart</h2>
          {cartItems.length === 0 ? (
            <p className="empty-message">No items in the cart.</p>
          ) : (
            cartItems.map((item) => (
              <div className="cart-item" key={item.ASIN}>
                <img src={item.Images[0]} alt={item.title} />
                <div className="cart-item-details">
                  <h4>{item.title}</h4>
                  <div className="price">₹{item.salePrice}</div>
                  <div className="quantity">
                    <button
                      onClick={() => {
                        decreaseQuantity(item.ASIN);
                      }}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button onClick={() => increaseQuantity(item.ASIN)}>+</button>
                  </div>
                  <div className="item-total">
                    Total: ₹{item.salePrice * item.quantity}
                  </div>
                  <button
                    className="remove-btn"
                    onClick={() => removeFromCart(item.ASIN)}
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))
          )}
        </div>

        {cartItems.length > 0 && (
          <div className="cart-summary">
            <h3>Price Details</h3>
            <div className="summary-line">
              <span>Price ({cartItems.length} items)</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <div className="summary-line total">
              <span>Total Amount</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <button className="checkout-btn">Place Order</button>
          </div>
        )}
      </div>
    </>
  );
};

export default Cart;
