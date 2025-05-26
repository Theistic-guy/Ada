import Header from "./Header";
import Ad from "./Items/advert";
import Data from "./Items/data";
import Banner from "./Items/banner";
import SamsungAdv from "./Items/samsungAdv";
import Link from "./Items/catagoryLinks";
import "aos/dist/aos.css";
import DropPage from "./Items/iphoneCorousel";
import axios from "axios";
import { useState,useEffect } from "react";
import SHeader from "./Items/SHeader";
import Rec from "./Items/recData";


const HomePage=()=>{

    const [user,setUser]=useState({});
    useEffect(() => {
        const fetchUserData = async () => {
            const userId = localStorage.getItem("userId");
            const res = await axios.get(`http://localhost:5000/user/${userId}`);
            setUser(res.data);
        };
        fetchUserData();
    }, []);

    return(
        <div className='MainDiv'>
            <Header userData={user}></Header>
            <SHeader text={user}></SHeader>
            <Ad></Ad>
            <Link catagory={"Only For You"}></Link>
            <Rec></Rec>
            <Link catagory={"Mobile Phone"}></Link>
            <Data catag={"Mobile Phones"}></Data>
            <Banner></Banner>
            <Link catagory={"Fitness & Gym"}></Link>
            <Data catag={"Fitness Equipment"}></Data>
            <SamsungAdv></SamsungAdv>
            <Link catagory={"Kitchen"}></Link>
            <Data catag={"Dining & Serveware"}></Data>
            <Link catagory={"Skin Care"}></Link>
            <Data catag={"Skin Care Products"}></Data>
            <Link catagory={"Smell Nice"}></Link>
            <Data catag={"Perfumes"}></Data>
            <Link catagory={"Laptops"}></Link>
            <Data catag={"Laptops"}></Data>
            <Link catagory={"Headset"}></Link>
            <Data catag={"Earphones & Headphones"}></Data>
            <Link catagory={"Women's Fashion"}></Link>
            <Data catag={"Women's Dresses"}></Data>
            <Link catagory={"Watches"}></Link>
            <Data catag={"Men's Watches"}></Data>
        </div>
    );
}

export default HomePage