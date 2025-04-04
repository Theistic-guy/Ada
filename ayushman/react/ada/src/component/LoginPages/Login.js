import React, { useState } from "react";
import { motion } from "framer-motion";
// import "./AuthPage.css";
import { Link } from "react-router-dom";
import SignInApi from "../APIs/SignInApi";

const Login=()=>{

    const[formData,setFormData]=useState({
        UserName:"",
        password:""
    });
    const[errorMessage,setErrorMessage]=useState("");

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("");
        try{
          const response=await SignInApi.post('/log',formData);
          setFormData({
            UserName:"",
            password:""
          });
          console.log("User Logged in Succesfully!!");
        }
        catch (error){
          if (error.response && error.response.status === 400) {
            setErrorMessage(error.response.data.message);
          } else {
            setErrorMessage("Error registering user. Please try again.");
          }
        }
      };

    return(
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
                  Login
                </motion.h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                <form onSubmit={handleSubmit} className="auth-form">
                  <motion.input
                        type="text"
                        name="UserName"
                        placeholder="User Name"
                        value={formData.UserName}
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
                  <motion.button
                    type="submit"
                    className="auth-button"
                    whileHover={{ scale: 1.05 }}
                  >
                    Login
                  </motion.button>
                </form>
                <p className="auth-toggle">
                  Don't have an account?
                  <Link to={"/Signup"}>
                  <span
                    className="auth-link"
                  >
                    Sign Up
                  </span>
                  </Link>
                </p>
              </motion.div>
            </div>
        </div>
    );
}

export default Login;