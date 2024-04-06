import React, { useEffect, useState } from "react";
import Image from "../assets/img2.png";
import Logo from "../assets/logo.png";
import GoogleSvg from "../assets/icons8-google.svg";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import "../styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { toast } from "react-toastify";

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [contactMode, setContactMode] = useState("");
  const navigate = useNavigate();
  const [token, setToken] = useState(JSON.parse(localStorage.getItem("auth")) || "");

  const handleRegisterSubmit = async (e) => {
    e.preventDefault();
    let name = e.target.name.value;
    let lastname = e.target.lastname.value;
    let email = e.target.email.value;
    let password = e.target.password.value;
    let confirmPassword = e.target.confirmPassword.value;

    if (
      name.length > 0 &&
      lastname.length > 0 &&
      email.length > 0 &&
      password.length > 0 &&
      confirmPassword.length > 0 &&
      contactMode !== ""
    ) {
      if (password === confirmPassword) {
        const formData = {
          username: name + " " + lastname,
          email,
          password,
          contactMode,
        };
        try {
          const response = await axios.post("http://localhost:3000/api/v1/register", formData);
          toast.success("Registration successful");
          navigate("/");
        } catch (err) {
          toast.error(err.message);
        }
      } else {
        toast.error("Passwords don't match");
      }
    } else {
      toast.error("Please fill all inputs");
    }
  };

  useEffect(() => {
    if (token !== "") {
      toast.success("You already logged in");
      navigate("/dashboard");
    }
  }, [token, navigate]);

  return (
    <div className="register-main">
      <div className="register-left">
        <img src={Image} alt="" />
      </div>
      <div className="register-right">
        <div className="register-right-container">
          <div className="register-center">
            <div style={{ display: "flex", marginBottom: "-51px", justifyContent: "space-between" }}>
              <h2 style={{ marginBottom: "-51px" }}>Let us Know <span style={{ color: "red" }}>!</span></h2>
              <p className="login-bottom-p" style={{ marginTop: "19px" }}>
                <Link to="/">Sign <span style={{ color: "red" }}>In</span></Link>
              </p>
            </div>
            <form onSubmit={handleRegisterSubmit}>
              <input type="text" placeholder="First Name" name="name" required={true} />
              <input type="text" placeholder="Last Name" name="lastname" required={true} />
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Password" name="password" required={true} />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="pass-input-div">
                <input type={showPassword ? "text" : "password"} placeholder="Confirm Password" name="confirmPassword" required={true} />
                {showPassword ? (
                  <FaEyeSlash onClick={() => setShowPassword(!showPassword)} />
                ) : (
                  <FaEye onClick={() => setShowPassword(!showPassword)} />
                )}
              </div>
              <div className="form-group" style={{width:'110%', display:'flex', alignItems: 'center'}}>
                
                <select
                  id="contactMode"
                  value={contactMode}
                  onChange={(e) => setContactMode(e.target.value)}
                  required
                >
                  <option value="">Select Contact Mode</option>
                  <option value="email">Email</option>
                  <option value="phone">Phone</option>
                </select>
              </div>
              <input type="email" placeholder="Email" name="email" required={true} />
              <div className="register-center-buttons">
                <button type="submit">Sign Up</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
