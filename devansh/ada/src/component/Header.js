import { useState,useEffect,useRef } from "react"
import { Link } from "react-router-dom";
import "./Items/header.css";
import "./Items/DropPage.css";
// import Login from "./LoginPages/Login";
// import Link from "react-router-dom"


const Header=()=>{
    
    const [open, setOpen] = useState(false);
    let menuRef = useRef();



    useEffect(() => {
        let handler = (e)=>{
          if(!menuRef.current.contains(e.target)){
            setOpen(false);
            console.log(menuRef.current);
          }      
        };
    
        document.addEventListener("mousedown", handler);
        
    
        return() =>{
          document.removeEventListener("mousedown", handler);
        }
    
      });



    
    
    
    return(
        <header>
            <div className="nav-brand">
                <Link to="/">
                    <span><img src="ADALogo.png" height={100} width={100}/></span>
                    {/* <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart" width="30"
                        height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round"
                        strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="6" cy="19" r="2" />
                        <circle cx="17" cy="19" r="2" />
                        <path d="M17 17h-11v-14h-2" />
                        <path d="M6 5l14 1l-1 7h-13" />
                    </svg> */}
                </Link>
            </div>
            <div className="searchBox-container">
                <form>
                    <input name="search" type="text"
                        id="search" placeholder="Enter product name, category" />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20"
                            height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none"
                            strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="10" cy="10" r="7" />
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                    </button>
                </form>
                <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="20"
                    height="20" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round"
                    strokeLinejoin="round">
                    <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                    <circle cx="10" cy="10" r="7" />
                    <line x1="21" y1="21" x2="15" y2="15" />
                </svg>
            </div>
            <div className="cart-container">
                <Link to={"/About"}>
                    <button>
                        <span><img src="group.png" height={40} width={40}/></span>
                    </button>
                </Link>
                <Link to={"/cart"}>
                <button>
                    <span data-items={0}><svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                        <circle cx="6" cy="19" r="2" />
                        <circle cx="17" cy="19" r="2" />
                        <path d="M17 17h-11v-14h-2" />
                        <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                        <path d="M15 6h6m-3 -3v6" />
                    </svg></span>   
                </button>
                </Link>
                <button>
                    <span onClick={()=>{setOpen(!open)}} ref={menuRef}>
                        <img src="settings.png" height={30} width={30}/>
                        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                            <ul>
                                <Link to={"/Profile"}>
                                    <DropdownItem img = {"user.png"} text = {"My Profile"}/>
                                </Link>
                                <DropdownItem img = {"edit.png"} text = {"Edit Profile"}/>
                                <DropdownItem img = {"envelope.png"} text = {"Inbox"}/>
                                <DropdownItem img = {"settings.png"} text = {"Settings"}/>
                                <DropdownItem img = {"question.png"} text = {"Helps"}/>
                                <Link to={"/Login"}><DropdownItem img ={"log-out.png"} text ={"Login"}/></Link>
                            </ul>
                        </div>
                    </span>
                </button>
            </div>
        </header >
    )
}


function DropdownItem(props){
    return(
      <li className = 'dropdownItem'>
        <img src={props.img} width={28} height={28}/>
        <a> {props.text} </a>
      </li>
    );
  }

export default Header