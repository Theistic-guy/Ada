import Aos from "aos"
import { useEffect } from "react"
import "aos/dist/aos.css"


const Perfume=()=>{
    
    useEffect(()=>{
        Aos.init();
    },[])
    
    return(
        <div className={"item-banner"} data-aos="zoom-in">
            <img className={"img-fluid"} src="Perfume.jpg"/>
        </div>
    )
}

export default Perfume;