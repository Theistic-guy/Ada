// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import { useState } from "react"



const Card=({data})=>{

    const [counter,setCounter]=useState(0);

    const IncreaseCounter=()=>{
        setCounter(counter+1);
    }
    const DecreaseCounter=()=>{
        if(counter==0){
            return;
        }
        setCounter(counter-1);
    }

    return(
            <div className={"item-card"}>
            <img className={"img-fluid"} src={`${data.thumbnail}`} alt={data.title}/>
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
            {counter<1
            ?<button className={"cart-add"} onClick={IncreaseCounter}>
                <span>Add to Cart</span>
                <img src="shopping-cart.png" width={20} height={20} alt="Cart Icon"/>
            </button> :
            <div className="cart-addon">
                <button onClick={DecreaseCounter}><span>-</span></button>
                <span>{counter}</span>
                <button onClick={IncreaseCounter}><span>+</span></button>
            </div>
            }
        </div>
    )
}

export default Card