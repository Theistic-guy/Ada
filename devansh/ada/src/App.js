// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomePage from "./component/Items/HomePage";
import ProfilePage from "./component/Items/AboutUs";
import Header from './component/Header';
import { CartProvider } from './component/Items/CartContext';
import Data from './component/Items/data';
import Banner from './component/Items/banner';
import Ad from './component/Items/advert';
import Login from './component/Items/Login';
import Signup from './component/Items/Signup';
import Cart from './component/Items/cart';
import ProductDetail from './component/Items/ProductDiscription';
import "aos/dist/aos.css";
import './index.css';
import './component/Items/modal.css';

function App() {
  return (
    <CartProvider>
      <Router>
        <div>
          
          <Routes>
            <Route path="/" element={<HomePage></HomePage>}></Route>
            <Route path="/product/:id" element={<ProductDetail />} /> 
            <Route path="/login" element={<Login />} />
            <Route path="/About" element={<ProfilePage></ProfilePage>}></Route>
            <Route path="/signup" element={<Signup />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/" element={
              <>
              <Header />
                <Ad />
                <Data />
                <Banner />
              </>
            } />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
