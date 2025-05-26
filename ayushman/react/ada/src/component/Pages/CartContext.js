import { createContext, useState } from "react";
import axios from "axios";

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);
  const [cartLoading, setCartLoading] = useState(true);

  const user = JSON.parse(localStorage.getItem("userData")); // adjust as needed
  const userId = user?._id;

  const syncCartWithBackend = async (updatedCart) => {
    if (!userId) return; 

    try {
      await axios.post("http://localhost:5000/update-cart", {
        userId,
        cart: updatedCart,
      });
    } catch (err) {
      console.error("Failed to sync cart with backend", err);
    }
  };

  const addToCart = async (product) => {
  let updatedCart;

  setCartItems((prevItems) => {
    const existingItem = prevItems.find((item) => item.ASIN === product.ASIN);

    if (existingItem) {
      updatedCart = prevItems.map((item) =>
        item.ASIN === product.ASIN
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      updatedCart = [...prevItems, { ...product, quantity: 1 }];
    }

    return updatedCart;
  });

  await syncCartWithBackend(updatedCart); // use the right updated cart
};


const increaseQuantity = async (itemId) => {
  let updatedCart;

  setCartItems((prevItems) => {
    updatedCart = prevItems.map((i) =>
      i.ASIN === itemId ? { ...i, quantity: i.quantity + 1 } : i
    );
    return updatedCart;
  });

  await syncCartWithBackend(updatedCart);
};

const decreaseQuantity = async (itemId) => {
    let updatedCart;
    setCartItems((prevItems) => {
    const item = prevItems.find((i) => i.ASIN === itemId);

    if (item && item.quantity === 1) {
      updatedCart = prevItems.filter((i) => i.ASIN !== itemId);
    } else {
      updatedCart = prevItems.map((i) =>
        i.ASIN === itemId ? { ...i, quantity: i.quantity - 1 } : i
      );
    }

    return updatedCart;
  });

  await syncCartWithBackend(updatedCart);
};


const removeFromCart = async (itemId) => {
  let updatedCart;
  setCartItems((prevItems) => {
    updatedCart = prevItems.filter((i) => i.ASIN !== itemId);
    return updatedCart;
  });

  await syncCartWithBackend(updatedCart);
};

  return (
    <CartContext.Provider
      value={{
        cartItems,
        setCartItems,
        cartLoading,
        setCartLoading,
        addToCart,
        increaseQuantity,
        decreaseQuantity,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};
