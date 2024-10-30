// src/components/Card.js
import { useState } from "react";
import { useCart } from './CartContext'; // Import the useCart hook
import "./index.css";
// import Modal from "./modal";

const Card = ({ data }) => {
    const { addToCart } = useCart(); // Use the context
    const [counter, setCounter] = useState(0);
    const [modal,showModal]=useState(false)

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
    const handleModal=()=>{
        showModal(!modal);
    }

    return (
        <>
            <div className={"item-card"}>
                <img className={"img-fluid"} src={`${data.thumbnail}`} alt={data.title} onClick={handleModal}/>
                <div className={"item-card__information"}>
                    <div className={"pricing"}>
                        <span>₹{data.discountedPrice}</span>
                        <small>
                            <strike>₹{data.price}</strike>
                        </small>
                    </div>
                    <div className={"title"}>
                        <h3>{data.title}</h3>
                    </div>
                </div>
                {counter < 1 ? (
                    <button className={"cart-add"} onClick={handleAddToCart}>
                        <span>Add to Cart</span>
                        <img src="shopping-cart.png" width={20} height={20} alt="Cart Icon" />
                    </button>
                ) : (
                    <div className="cart-addon">
                        <button onClick={DecreaseCounter}><span>-</span></button>
                        <span>{counter}</span>
                        <button onClick={IncreaseCounter}><span>+</span></button>
                    </div>
                )}
            </div>
        </>
    );
};

export default Card;