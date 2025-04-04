import { useState,useEffect,useRef } from "react"
import { Link,useNavigate } from "react-router-dom";
import axios from "axios";



const Header=()=>{
    
    const [open, setOpen] = useState(false);
    let menuRef = useRef();
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();


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
      
    const handleSearch = async (e) => {
        e.preventDefault();
        if (!searchQuery.trim()) return;
        navigate(`/search?query=${encodeURIComponent(searchQuery)}`);
    };

    


    return(
        <header>
            <div className="nav-brand">
                <Link to="/">
                    <span><img src="LLMLogo.png" height={100} width={100}/></span>
                </Link>
            </div>
            <div className="searchBox-container">
                <form onSubmit={handleSearch}>
                    <input
                        name="search"
                        type="text"
                        id="search"
                        placeholder="Enter product name, category"
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                    />
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
                <button>
                    <span onClick={()=>{setOpen(!open)}} ref={menuRef}>
                        <img src="settings.png" height={30} width={30}/>
                        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
                            <ul>
                                <Link to={"/Profile"}>
                                    <DropdownItem img = {"user.png"} text = {"My Profile"}/>
                                </Link>
                                <Link>
                                    <DropdownItem img = {"edit.png"} text = {"Edit Profile"}/>  
                                </Link>
                                <Link>
                                    <DropdownItem img = {"envelope.png"} text = {"Inbox"}/>
                                </Link>
                                <Link>
                                    <DropdownItem img = {"settings.png"} text = {"Settings"}/>
                                </Link>
                                <Link>
                                    <DropdownItem img = {"question.png"} text = {"Helps"}/>
                                </Link>
                                <Link to={"/Login"}>
                                    <DropdownItem img = {"log-out.png"} text = {"Log Out"}/>
                                </Link>
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
        <img src={props.img} />
        <a> {props.text} </a>
      </li>
    );
  }

export default Header