// import Button from 'react-bootstrap/Button';
// import Card from 'react-bootstrap/Card';
import Aos from "aos";
import Modal from "../UI/modal";
import { Fragment, useEffect, useState } from "react"



const Card=({data})=>{

    useEffect(()=>{
        Aos.init();
    },[])

    const [modal,setModal]=useState(false);

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

    const HandleModal=()=>{
        setModal(!modal)
    }

    return(
        <Fragment>
            <div className={"item-card"} data-aos="fade-up">
            <img className={"img-fluid"} src={`${data.Images[0]}`} alt={data.title} onClick={HandleModal}/>
            <div className={"item-card__information"}>
                <div className={"pricing"}>
                    <span>₹{data.salePrice}</span>
                    <small>
                        <strike>₹{data.listPrice}</strike>
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
            {modal && 
                <Modal onClose={HandleModal}>
                    <div className="item-card__modal">
                        <div className="img-wrap">
                            <img className={"img-fluid"} src={`${data.Images[0]}`} alt={data.title}/>
                        </div>
                        <div className="meta">
                            <h3>{data.title}</h3>
                            <div className={"pricing"}>
                                <span>₹{data.salePrice}</span>
                                <small>
                                    <strike>₹{data.listPrice}</strike>
                                </small>
                            </div>
                            <p>{data.bookDescription}</p>
                        </div>
                    </div>
                        <div className="AddModal">
                            {
                                counter < 1 ?
                                <button className={"cart-add card-add__modal"} onClick={IncreaseCounter}>
                                    <span>Add to Cart</span>
                                    {/* <img src={AddToCartIcon} alt="Cart Icon"/> */}
                                </button>
                                :
                                <div className="cart-addon card-addon__modal" id="modal_card">
                                    <button onClick={DecreaseCounter}><span>-</span></button>
                                    <span>{counter}</span>
                                    <button onClick={IncreaseCounter}><span>+</span></button>
                                </div>
                            }
                        </div>
                </Modal> 
            }
        </div>
        </Fragment>
    )
}

export default Card