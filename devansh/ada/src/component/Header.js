// src/components/Header.js
import React from 'react';
import { Link } from 'react-router-dom';

const Header = () => {
    return (
        <header>
            <div className="nav-brand">
                <Link to="/">
                    <span><img src="logo.png" height={100} width={100} alt="logo" /></span>
                </Link>
            </div>
            <div className="searchBox-container">
                <form>
                    <input name="search" type="text" id="search" placeholder="Enter product name, category" />
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
            </div>
            <div className="cart-container">
                <Link to="/login">
                    <button>
                        <span><img src="user.png" height={30} width={30} alt="user" /></span>
                    </button>
                </Link>
                <button>
                    <span data-items={0}>
                        <svg xmlns="http://www.w3.org/2000/svg" className="icon icon-tabler icon-tabler-shopping-cart-plus" width="30" height="30" viewBox="0 0 24 24" strokeWidth="1.5" stroke="black" fill="none" strokeLinecap="round" strokeLinejoin="round">
                            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                            <circle cx="6" cy="19" r="2" />
                            <circle cx="17" cy="19" r="2" />
                            <path d="M17 17h-11v-14h-2" />
                            <path d="M6 5l6.005 .429m7.138 6.573l-.143 .998h-13" />
                            <path d="M15 6h6m-3 -3v6" />
                        </svg>
                    </span>
                </button>
                <button>
                    <span><img src="settings.png" height={30} width={30} alt="setting" /></span>
                </button>
            </div>
        </header>
    );
}

export default Header;
