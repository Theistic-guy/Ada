import Aos from "aos";
import { useEffect } from "react";


const Link=({catagory})=>{

    useEffect(()=>{
        Aos.init();
    },[])

    return(
        <div className="LinkBorder" data-aos="fade-up">
            <span className="LinkHead"><h2>{catagory}</h2><span className="buttonStyle"><button className="LinkButton" ><img src="next.png" width={30} height={30} /></button></span></span>
        </div>
    )
}

export default Link