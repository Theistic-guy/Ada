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
        <div className='sign-back'>
            <div className="signup-container">
                <h1>Sign Up</h1>
                    <form onSubmit={handleSubmit}>
                    <input type="text"placeholder="Full Name"value={name} name='fullname' onChange={(e) => setName(e.target.value)}required/>
                    <input type="email"placeholder="Email"value={email} name='email' onChange={(e) => setEmail(e.target.value)}required/>
                    <input type='text' placeholder='User Name' name='User Name'required></input>
                    <input type="password"placeholder="Password"value={password} name='password' onChange={(e) => setPassword(e.target.value)}required/>
                    <input type='text' placeholder='Address' name='Address' required></input>
                    <input type='number' placeholder='Phone Number' name='phone' required></input>
                        <button type="submit" className='sign'>Sign Up</button>
                    </form>
                <p>Already have an account? <a href="/login"><b>Log In</b></a></p>
            </div>
        </div>
    );
};

export default Signup;

