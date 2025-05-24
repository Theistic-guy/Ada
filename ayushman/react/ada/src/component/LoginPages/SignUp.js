import React, { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import LoginApi from "../APIs/loginApi";
import "../../style/signup.scss"

const SignUp = () => {
  const [formData, setFormData] = useState({
    FullName: "",
    email: "",
    UserName: "",
    password: "",
    phoneNumber: "",
    Gender: "",
    Age: "",
    interests: [] // new field to store selected options
  });

  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const handleChange = (e) => {
    const value =
      e.target.name === "phoneNumber" || e.target.name === "Age"
        ? parseInt(e.target.value)
        : e.target.value;
    setFormData({ ...formData, [e.target.name]: value });
  };

  const handleInterestChange = (e) => {
    const { value, checked } = e.target;
    if (checked) {
      setFormData({ ...formData, interests: [...formData.interests, value] });
    } else {
      setFormData({
        ...formData,
        interests: formData.interests.filter((item) => item !== value),
      });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrorMessage("");
    setSuccessMessage("");

    try {
      const response = await LoginApi.post("/signUp", formData);
      setSuccessMessage(response.data.message);
      setFormData({
        FullName: "",
        email: "",
        UserName: "",
        password: "",
        phoneNumber: "",
        Gender: "",
        Age: "",
        interests: [],
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

  return (
    <div className="loginPage">
      <div className="auth-container">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="auth-box signup-wrapper"
          style={{ width: "800px", padding: "20px" }} // wider box
        >
          {/* Left Form Side */}
          <div className="auth-form-section">
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
                whileHover={{ scale: 1.1, backgroundColor: "#A594F9" }}
                whileTap={{ scale: 0.95 }}
              >
                Sign Up
              </motion.button>
            </form>
            <p className="auth-toggle">
              Already have an account?
              <Link to={"/"}>
                <span className="auth-link">Login</span>
              </Link>
            </p>
          </div>

          {/* Middle Line */}
          <div
            className="divider-line"
            style={{
              backgroundColor: "#444",
              width: "2px",
              minHeight: "100%",
              margin: "0 20px",
            }}
          ></div>

          {/* Right Choices Side */}
          <div className="choices-box">
          <h1>Select Interests</h1>
          <div className="interest-buttons">
            {["Sports", "Music", "Travel", "Books", "Gaming", "Fitness","Electronics","Baby Products","Skin care","Perfume","Shoes","Jewellery","Cloths","Mobile","Laptop","Kitchen & Appliances","Home Assentials","Outdoor","Furniture","Decore Items"].map(
              (interest) => (
                <div
                  key={interest}
                  className={`interest-button ${
                    formData.interests.includes(interest) ? "selected" : ""
                  }`}
                  onClick={() => {
                    const alreadySelected = formData.interests.includes(interest);
                    setFormData({
                      ...formData,
                      interests: alreadySelected
                        ? formData.interests.filter((item) => item !== interest)
                        : [...formData.interests, interest],
                    });
                  }}
                >
                  {interest}
                </div>
              )
            )}
          </div>
        </div>
        </motion.div>
      </div>
    </div>
  );
};

export default SignUp;
