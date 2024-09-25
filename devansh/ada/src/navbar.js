import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';
import cartIcon from './cartlogo.png';

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="logo">My Store</div>
      <ul>
        <li>
          <Link to="/">Products</Link>
        </li>
        <li>
          <Link to="/cart">
            <img src={cartIcon} alt="Cart" className="cart-icon" />
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default Navbar;
