// src/component/Items/ProductDetail.js
import React from 'react';
import { useLocation } from 'react-router-dom';
import "./ProductDiscription.css"; 

const ProductDetail = () => {
    const location = useLocation();
    const { productData } = location.state || {}; // Access passed state

    if (!productData) {
        return <div className="error">No product data available.</div>;
    }

    return (
        <div className="product-detail-container">
            <div className="product-detail">
                <div className="product-detail-image">
                    <img src={productData.thumbnail} alt={productData.title} />
                </div>
                <div className="product-detail-info">
                    <h2 className="product-title">{productData.title}</h2>
                    <p className="product-description">{productData.description}</p>
                    <div className="pricing">
                        <span className="discounted-price">₹{productData.discountedPrice}</span>
                        <small className="original-price"><strike>₹{productData.price}</strike></small>
                    </div>
                    <button className="add-to-cart-btn">Add to Cart</button>
                </div>
            </div>
        </div>
    );
};

export default ProductDetail;
