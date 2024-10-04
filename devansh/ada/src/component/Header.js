// src/components/Header.js
import React, { useState, useEffect, useRef } from "react";
import { Link } from 'react-router-dom';
import "./Items/header.css"

const Header = () => {
    const [open, setOpen] = useState(false);
    const menuRef = useRef(null);

    useEffect(() => {
        const handler = (e) => {
            if (menuRef.current && !menuRef.current.contains(e.target)) {
                setOpen(false);
            }
        };

        document.addEventListener("mousedown", handler);
        return () => {
            document.removeEventListener("mousedown", handler);
        };
    }, []);

    return (
        <header>
            <div className="nav-brand">
                <Link to="/">
                    <img src="ADALogo.png" height={100} width={100} alt="Logo" />
                </Link>
            </div>
            <div className="searchBox-container">
                <form>
                    <input
                        name="search"
                        type="text"
                        id="search"
                        placeholder="Enter product name, category"
                    />
                    <button type="submit">
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-search" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="white" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="10" cy="10" r="7" />
                            <line x1="21" y1="21" x2="15" y2="15" />
                        </svg>
                    </button>
                </form>
            </div>
            <div className="cart-container">
                <Link to="/login">
                    <button>
                        <img src="user.png" height={30} width={30} alt="User" />
                    </button>
                </Link>
                <Link to="/cart">
                <button>
                    <span data-items={0}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="24" height="24" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="6" cy="19" r="2" />
                            <circle cx="17" cy="19" r="2" />
                            <path d="M17 17h-11v-14h-2" />
                            <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                            <path d="M15 6h6m-3 -3v6" />
                        </svg>
                    </span>
                </button>
                </Link>
                <button onClick={() => setOpen(!open)} ref={menuRef}>
                    <img src="settings.png" height={30} width={30} alt="Settings" />
                </button>
                {open && (
                    <div className={`dropdown-menu`} style={{ position: 'absolute', zIndex: 100 }}>
                        <h3>The Kiet<br /><span>Website Designer</span></h3>
                        <ul>
                            <DropdownItem img="user.png" text="My Profile" />
                            <DropdownItem img="edit.png" text="Edit Profile" />
                            <DropdownItem img="envelop.png" text="Inbox" />
                            <DropdownItem img="settings.png" text="Settings" />
                            <DropdownItem img="question.png" text="Help" />
                            <DropdownItem img="log-out.png" text="Logout" />
                        </ul>
                    </div>
                )}
            </div>
        </header>
    );
}

function DropdownItem(props) {
    return (
        <li className='dropdownItem'>
            <img src={props.img} height={24} width={24} alt={props.text} />
            <a>{props.text}</a>
        </li>
    );
}

export default Header;
