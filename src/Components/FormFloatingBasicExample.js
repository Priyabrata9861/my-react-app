import React, { useState } from 'react';
import ReCAPTCHA from "react-google-recaptcha";
import { Navigate, useNavigate  } from "react-router-dom";


function Navbar() {
  return (
    <div className="p">
    <nav>
      <ul>
        <li><a href="#">Home</a></li>
        <li><a href="#">Contact</a></li>
        <li><a href="#">About</a></li>
      </ul>
    </nav>
    </div>
  );
}

function FormFloatingBasicExample() {
  const [formData, setFormData] = useState({
    name: "",
    password: "",
    captcha: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    
    console.log("Form submitted:", formData);
   
    setFormData({
      name: "",
      password: "",
      captcha: "",
    });
  };

  const handleCaptchaChange = (value) => {
   
    console.log("Captcha value:", value);
    setFormData({
      ...formData,
      captcha: value,
    });
  };
  const navigate= useNavigate ();

  const handleGetAllUsers =()=> {
 navigate("/users")
  };
  return (
    <>
      <Navbar />
      <div className="container">
        <h1>Login</h1>
        <p className="o">New User | Register ?</p>
        <p>Please fill out the information below</p>
        <form onSubmit={handleFormSubmit}>
          <input
           
            type="text"
            name="name"
            placeholder="User Id"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
          <br />
          <br />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            required
          />
          <br />
          <br />
          <ReCAPTCHA
            sitekey="YOUR_SITE_KEY"
            onChange={handleCaptchaChange}
            required
          />
          <br />
          <br />
          <button className="k"  type="submit">Login</button>
          <p className="m">Forgot password ?</p>
          <button className="l" type="submit">Sign in with microsoft</button>
          <button className="k" onClick={handleGetAllUsers}>Get All Users</button>
        </form>
      </div>

    </>
  );
}


export default FormFloatingBasicExample;