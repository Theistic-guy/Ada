import React, { createContext, useContext, useReducer } from 'react';

const CartContext = createContext();

const cartReducer = (state, action) => {
    switch (action.type) {
        case 'ADD_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.map((item) =>
                    item.id === action.payload.id
                        ? { ...item, quantity: item.quantity + 1 }
                        : item
                ).concat(state.cartItems.find(item => item.id === action.payload.id) ? [] : [{ ...action.payload, quantity: 1 }])
            };
        case 'REMOVE_ITEM':
            return {
                ...state,
                cartItems: state.cartItems.filter(item => item.id !== action.payload)
            };
        case 'UPDATE_QUANTITY':
            return {
                ...state,
                cartItems: state.cartItems.map(item =>
                    item.id === action.payload.id ? { ...item, quantity: action.payload.quantity } : item
                )
            };
        case 'CLEAR_CART':
            return {
                ...state,
                cartItems: [] // Clear the cart items
            };
        default:
            return state;
    }
};

export const CartProvider = ({ children }) => {
    const [state, dispatch] = useReducer(cartReducer, { cartItems: [] });

    const addToCart = (item) => {
        dispatch({ type: 'ADD_ITEM', payload: item });
    };

    const removeFromCart = (id) => {
        dispatch({ type: 'REMOVE_ITEM', payload: id });
    };

    const updateQuantity = (id, quantity) => {
        dispatch({ type: 'UPDATE_QUANTITY', payload: { id, quantity } });
    };

    const clearCart = () => {
        dispatch({ type: 'CLEAR_CART' }); // Dispatch clear cart action
    };

    return (
        <CartContext.Provider value={{ cartItems: state.cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export const useCart = () => {
    return useContext(CartContext);
};

