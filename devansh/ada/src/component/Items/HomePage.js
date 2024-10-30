import Header from "../Header";
import Ad from "./advert";
import Data from "./data";
import Banner from "./banner";
import SamsungAdv from "./samsungAdv";
import Link from "./catagoryLinks";
import "aos/dist/aos.css";
import DropPage from "./iphoneCorousel";

const HomePage=()=>{
    return(
        <div className='MainDiv'>
            <Header></Header>
            {/* <DropPage></DropPage> */}
            <Ad></Ad>
            <Link catagory={"Electronics"}></Link>
            <Data></Data>
            <Link catagory={"Sports"}></Link>
            <Link catagory={"Kitchen"}></Link>
            <Banner></Banner>
            <SamsungAdv></SamsungAdv>
        </div>
    );
}

export default HomePage