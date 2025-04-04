import React, { useState } from "react";
import { motion } from "framer-motion";
// import "./AuthPage.css";
// import "../style/loginSignUp.scss";


const LoginSignUp = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    userName:"",
    password: "",
    phone: "",
    gender: "",
    age: ""
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form Data Submitted:", formData);
  };

  return (
    <div className="loginPage">
        <div className="auth-container">
      <motion.div 
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.5 }}
        className="auth-box"
      >
        <motion.h2 
          initial={{ y: -20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="auth-title"
        >
          {isSignUp ? "Sign Up" : "Login"}
        </motion.h2>
        <form onSubmit={handleSubmit} className="auth-form">
          {isSignUp && (
            <motion.input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="auth-input"
              required
              whileFocus={{ scale: 1.05 }}
            />
          )}
          <motion.input
                type="text"
                name="userName"
                placeholder="User Name"
                value={formData.userName}
                onChange={handleChange}
                className="auth-input"
                required
                whileFocus={{ scale: 1.05 }}
            />
          <motion.input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="auth-input"
            required
            whileFocus={{ scale: 1.05 }}
          />
          {isSignUp && (
            <>
                <motion.input
                type="email"
                name="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                className="auth-input"
                required
                whileFocus={{ scale: 1.05 }}
                />
              <motion.input
                type="text"
                name="phone"
                placeholder="Phone Number"
                value={formData.phone}
                onChange={handleChange}
                className="auth-input"
                required
                whileFocus={{ scale: 1.05 }}
              />
              <motion.select
                name="gender"
                value={formData.gender}
                onChange={handleChange}
                className="auth-input"
                required
              >
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </motion.select>
              <motion.input
                type="number"
                name="age"
                placeholder="Age"
                value={formData.age}
                onChange={handleChange}
                className="auth-input"
                required
                whileFocus={{ scale: 1.05 }}
              />
            </>
          )}
          <motion.button
            type="submit"
            className="auth-button"
            whileHover={{ scale: 1.05 }}
          >
            {isSignUp ? "Sign Up" : "Login"}
          </motion.button>
        </form>
        <p className="auth-toggle">
          {isSignUp ? "Already have an account?" : "Don't have an account?"} 
          <span
            className="auth-link"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? " Login" : " Sign Up"}
          </span>
        </p>
      </motion.div>
    </div>
    </div>
  );
};

export default LoginSignUp;
