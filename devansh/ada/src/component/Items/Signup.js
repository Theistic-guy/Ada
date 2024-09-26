// src/component/Signup.js
import React, { useState } from 'react';
import "./signup.css"

const Signup = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        // Handle signup logic here
        console.log('Signing up with:', { name, email, password });
    };

    return (
        <div className="signup-container">
            <h1>Sign Up</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"placeholder="Full Name"value={name}onChange={(e) => setName(e.target.value)}required/>
                <input type="email"placeholder="Email"value={email}onChange={(e) => setEmail(e.target.value)}required/>
                <input type="password"placeholder="Password"value={password}onChange={(e) => setPassword(e.target.value)}required/>
                <button type="submit" className='sign'>Sign Up</button>
            </form>
            <p>Already have an account? <a href="/login"><b>Log In</b></a></p>
        </div>
    );
};

export default Signup;
