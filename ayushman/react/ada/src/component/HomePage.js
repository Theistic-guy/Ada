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
            {/* <Link catagory={"Electronics"}></Link> */}
            <Data></Data>
            {/* <Link catagory={"Sports"}></Link> */}
            {/* <Link catagory={"Kitchen"}></Link> */}
            <Banner></Banner>
            <SamsungAdv></SamsungAdv>
        </div>
    );
}

export default HomePage