import Aos from "aos"
import { useEffect } from "react"
import "aos/dist/aos.css"


const Shoes=()=>{
    
    useEffect(()=>{
        Aos.init();
    },[])
    
    return(
        <div className={"item-banner"} data-aos="zoom-in">
            <img className={"img-fluid"} src="Shoes.jpg"/>
        </div>
    )
}

export default Shoes;