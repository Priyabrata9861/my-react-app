import React, { useState, useEffect } from "react";
import axios from "axios";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser, faLock } from "@fortawesome/free-solid-svg-icons";
function Navbar() {
  const [backgroundImage, setBackgroundImage] = useState(
    "https://media.istockphoto.com/id/1007374324/photo/view-of-the-promenade-at-night-in-alghero-a-beautiful-city-vibrant-sardinia-italy.jpg?s=2048x2048&w=is&k=20&c=pnhgCyyhoLwmSQQDP-3CDPxMhe8eJ8oNXJcAHEA8U1c="
  );

  useEffect(() => {
    const images = [
      "https://media.istockphoto.com/id/168726970/photo/downtown-office-buildings-at-sunrise.jpg?s=2048x2048&w=is&k=20&c=9ss82RIchyxRtl0RgQu0So8M909JsMlV-7GeEYnZWi0=",
      "https://images.unsplash.com/photo-1542704792-e30dac463c90?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      "https://media.istockphoto.com/id/1007374324/photo/view-of-the-promenade-at-night-in-alghero-a-beautiful-city-vibrant-sardinia-italy.jpg?s=2048x2048&w=is&k=20&c=pnhgCyyhoLwmSQQDP-3CDPxMhe8eJ8oNXJcAHEA8U1c=",
    ];
    let currentIndex = 0;

    const intervalId = setInterval(() => {
      currentIndex = (currentIndex + 1) % images.length;
      setBackgroundImage(images[currentIndex]);
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <div className="p" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <nav>
        <ul>
          <li>
            <Link to="#">Home</Link>
          </li>
          <li>
            <Link to="#">Contact</Link>
          </li>
          <li>
            <Link to="#">About</Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}

function Loginpage() {
  const [formData, setFormData] = useState({
    userName: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [focusedField, setFocusedField] = useState(null);
  const [token,setToken]=useState();
  const navigate = useNavigate(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleFieldFocus = (fieldName) => {
    setFocusedField(fieldName);
  };  


  useEffect(() => {
    localStorage.clear();
  });
  const handleFormSubmit = async (e) => {
    e.preventDefault();

    const userData = {
      userName: formData.userName,
      password: formData.password,
    };
    const url = "https://new.siaqreporting.com/api/v1/auth/login";

    try {
      const response = await axios.post(url, userData);
      if (response.data.status === 1) {
        const token=response.data.data.list.token;
        setToken(token);
        setIsLoggedIn(true);
       localStorage.setItem("milu",token)
        // localStorage.setItem(
        //   "token",
        //   "eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJzeXNhZG1pbiIsImlhdCI6MTcwODM0Mjg4NSwiZXhwIjoxNzA4MzYwODg1fQ.bRXp1c3-vyMh-DW_k_MpMiPzQtKsBizeKHm54RR8SHg"
        // );
        // alert("Login Successful");

        localStorage.setItem("userDetails", JSON.stringify(response.data));
        
        navigate("/dashboard");
      } else {
        alert(response.data.message);
      }
    } catch (error) {
      setError("There was a problem with the login");
      alert("Error logging in:" + error);
    }
  };

  return (
    <>
      <Navbar />
      <div className="c">
        <h1>Login</h1>
        <p className="o">New User | Register ?</p>
        <p>Please fill out the information below</p>
        <form onSubmit={handleFormSubmit}>
          <FontAwesomeIcon icon={faUser} style={{ fontSize: "25px" }} />

          <input
            type="text"
            name="userName"
            placeholder="username"
            value={formData.userName}
            onChange={handleInputChange}
            onFocus={() => handleFieldFocus("userName")}
            required
          />
          {focusedField === "userName" && <p>Please enter your username</p>}
          <br />
          <br />
          <FontAwesomeIcon icon={faLock} style={{ fontSize: "25px" }} />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleInputChange}
            onFocus={() => handleFieldFocus("password")}
            required
          />
          {focusedField === "password" && <p>Please enter your password</p>}
          <br />
          <br />

          <br />
          <br />
          <button className="k" type="submit">
            Login
          </button>
          <p className="m">Forgot password ?</p>
          <button className="l" type="button">
            Sign in with Microsoft
          </button>
          <br />
          <br />
        </form>
      </div>
    </>
  );
}

export default Loginpage;
