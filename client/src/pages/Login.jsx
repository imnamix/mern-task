import React, { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import Image from "../assets/img.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import "../styles/Login.css";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [token, setToken] = useState(localStorage.getItem("auth") || "");
  const navigate = useNavigate();

  const handleLoginSubmit = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    if (email && password) {
      const formData = {
        email,
        password,
      };
      try {
        const response = await axios.post(
          "http://localhost:3000/api/v1/login",
          formData
        );
        setToken(response.data.token);
        toast.success("Login successful");
        navigate("/dashboard");
      } catch (err) {
        console.error(err);
        toast.error("Failed to login. Please try again.");
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token) {
      toast.success("You are already logged in");
      navigate("/dashboard");
    }
  }, [token]);

  return (
    <div className="login-main">
      <div className="login-left">
        <img src={Image} alt="Login" />
      </div>
      <div className="login-right">
        <div className="login-right-container">
          <div className="login-center">
            <h2 style={{marginLeft:'-50px', marginBottom:'15px'}} >Fill What we known <span style={{color:'red'}}>!</span></h2>
            <form onSubmit={handleLoginSubmit}>
              <input type="email" placeholder="Email" name="email" />
              <div className="pass-input-div">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  name="password"
                />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              
              <div className="login-center-buttons">
                <button type="submit"  style={{borderRadius:'15px'}}>Sign In</button>
                <Link to="/register">
                  <button type="submit" style={{backgroundColor:'white', color:'black', borderRadius:'15px', }}>Sign up</button>
                </Link>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
