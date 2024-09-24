import Aos from "aos"
import { useEffect } from "react"
import "aos/dist/aos.css"


const Banner=()=>{
    
    useEffect(()=>{
        Aos.init();
    },[])
    
    return(
        <div className={"item-banner"} data-aos="zoom-in">
            <img className={"img-fluid"} src="banner.png"/>
        </div>
    )
}

export default Banner