import React, { useState } from 'react';
import "./login.css"

const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log('Logging in with:', { email, password });
    };

    return (
        <div className='login-back'>
        <div className="login-container">
            <h1>Login</h1>
            <form onSubmit={handleSubmit}>
                <input type="text"placeholder="User Name" name='userName' onChange={(e) => setEmail(e.target.value)}required/>
                <input type="password"placeholder="Password" name='password' onChange={(e) => setPassword(e.target.value)}required/>
                <button type="submit" className='login'>Login</button>
            </form>
            <p>Don't have an account? <a href="/signup">Sign Up</a></p>
        </div>
        </div>
    );
};

export default Login;
