import { useState } from "react";
import { useCart } from './CartContext'; // Import the useCart hook
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import "./index.css";

const Card = ({ data }) => {
    const { addToCart } = useCart(); // Use the context
    const [counter, setCounter] = useState(0);
    const navigate = useNavigate(); // Initialize the navigate function

    const IncreaseCounter = () => {
        setCounter(counter + 1);
    };

    const DecreaseCounter = () => {
        if (counter === 0) return;
        setCounter(counter - 1);
    };

    const handleAddToCart = () => {
        addToCart(data);
        setCounter(1); // Set counter to 1 after adding to cart
    };

    // Navigate to product description page on image click
    const handleProductClick = () => {
        navigate(`/product/${data.id}`, { state: { productData: data } }); // Pass data as state to the next page
    };

    return (
        <>
            <div className="item-card">
                <img
                    className="img-fluid"
                    src={`${data.thumbnail}`}
                    alt={data.title}
                    onClick={handleProductClick} // Trigger navigation on image click
                />
                <div className="item-card__information">
                    <div className="pricing">
                        <span>₹{data.discountedPrice}</span>
                        <small>
                            <strike>₹{data.price}</strike>
                        </small>
                    </div>
                    <div className="title">
                        <h3>{data.title}</h3>
                    </div>
                </div>
                {counter < 1 ? (
                    <button className="cart-add" onClick={handleAddToCart}>
                        <span>Add to Cart</span>
                        <img src="shopping-cart.png" width={20} height={20} alt="Cart Icon" />
                    </button>
                ) : (
                    <div className="cart-addon">
                        <button className="add" onClick={DecreaseCounter}><span>-</span></button>
                        <span>{counter}</span>
                        <button className="sub" onClick={IncreaseCounter}><span>+</span></button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Card;
