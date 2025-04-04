import Header from "./Header";
import Ad from "./Items/advert";
import Data from "./Items/data";
import Banner from "./Items/banner";
import SamsungAdv from "./Items/samsungAdv";
import Link from "./Items/catagoryLinks";
import "aos/dist/aos.css";
import DropPage from "./Items/iphoneCorousel";

const HomePage=()=>{
    return(
        <div className='MainDiv'>
            <Header></Header>
            {/* <DropPage></DropPage> */}
            <Ad></Ad>
            <Link catagory={"Electronics"}></Link>
            <Data catag={"Mobile Phones"}></Data>
            <Banner></Banner>
            <Link catagory={"Fitness & Gym"}></Link>
            <Data catag={"Fitness Equipment"}></Data>
            <SamsungAdv></SamsungAdv>
            <Link catagory={"Kitchen"}></Link>
            <Data catag={"Dining & Serveware"}></Data>
        </div>
    );
}

export default HomePage