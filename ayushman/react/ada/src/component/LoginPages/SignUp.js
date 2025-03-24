import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import axios from "axios";
import LoginApi from "../APIs/loginApi";

const SignUp=()=>{

    const [formData, setFormData] = useState({
        FullName: "",
        email: "",
        UserName: "",
        password: "",
        phoneNumber: "",
        Gender: "",
        Age: ""
      });

      const [errorMessage, setErrorMessage] = useState("");
      const [successMessage, setSuccessMessage] = useState(""); 

    const handleChange = (e) => {
      const value = e.target.name === "phoneNumber" || e.target.name === "Age" 
      ? parseInt(e.target.value) 
      : e.target.value;
      setFormData({ ...formData, [e.target.name]: value });
    };
    
    const handleSubmit = async (e) => {
      e.preventDefault();
      setErrorMessage("");
      setSuccessMessage("");
      console.log(formData);
      // const response = await LoginApi.post('/signUp', formData);
      try {
        const response=await LoginApi.post("/signUp", formData);
        setSuccessMessage(response.data.message);
        setFormData({
          FullName: "",
          email: "",
          UserName: "",
          password: "",
          phoneNumber: "",
          Gender: "",
          Age: ""
        });
        console.log("User added successfully");
      } catch (error) {
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
                Sign Up
                </motion.h2>
                {errorMessage && <p className="error-message">{errorMessage}</p>}
                {successMessage && <p className="success-message">{successMessage}</p>}
                <form onSubmit={handleSubmit} className="auth-form">
                    <motion.input
                      type="text"
                      name="FullName"
                      placeholder="Full Name"
                      value={formData.FullName}
                      onChange={handleChange}
                      className="auth-input"
                      required
                      whileFocus={{ scale: 1.05 }}
                    />
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
                        name="phoneNumber"
                        placeholder="Phone Number"
                        value={formData.phoneNumber}
                        onChange={handleChange}
                        className="auth-input"
                        required
                        whileFocus={{ scale: 1.05 }}
                      />
                      <motion.select
                        name="Gender"
                        value={formData.Gender}
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
                        name="Age"
                        placeholder="Age"
                        value={formData.Age}
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
                    Sign Up
                  </motion.button>
                </form>
                <p className="auth-toggle">
                  Already have an account?
                  <Link to={"/Login"}>
                  <span
                    className="auth-link"
                  >
                    Login
                  </span>
                  </Link>
                </p>
              </motion.div>
            </div>
        </div>
    );
}

export default SignUp