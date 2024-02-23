import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "@trendmicro/react-sidenav/dist/react-sidenav.css";
import "./Lo.css";
import { Link } from "react-router-dom";


const Dashboard = () => <div>Dashboard Component</div>;
const Users = () => <div>Users Component</div>;
const Client = () => <div>Client Component</div>;
const ClientManagement = () => <div>Client Management Component</div>;
const Job = () => <div>Job Component</div>;
const Reports = () => <div>Reports Component</div>;
const SiaqAdmin = () => <div>Siaq Admin Component</div>;

const Sidebar = () => {
  const [isActive, setIsActive] = useState(false);
  const navigate = useNavigate();
  const [activeDropdown, setActiveDropdown] = useState(null);

  const toggleSidebar = () => {
    setIsActive((prevIsActive) => !prevIsActive);
  };
  const handleDropdownItemClick = (dropdownId) => {
    setActiveDropdown(activeDropdown === dropdownId ? null : dropdownId);
  };
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    alert("LogOut Successfully");
  };

  return (
    <div>
      <div>
        <button onClick={handleLogOut}>LogOut</button>
      </div>
      <div className={`sidebar ${isActive ? "active" : ""}`}>
        <div className="toggle-btn" onClick={toggleSidebar}>
          ☰
        </div>
        <ul className="sidebar-menu">
          <li>
            <Link to="/dashboard">Dashboard</Link>
          </li>
          <li>
            <Link to="/users">Users</Link>
          </li>
          <li>
            <Link to="/client">Client</Link>
            <ul className="dropdown">
              <li>
                <Link to="/clientmanagement">Client Management</Link>
              </li>
              <li>
                <Link to="#">Building Management</Link>
              </li>
              <li>
                <Link to="#">Client Representative</Link>
              </li>
              <li>
                <Link to="#">Client Statistics</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/job">Job</Link>
            <ul className="dropdown">
              <li>
                <Link to="#">Job Management</Link>
              </li>
              <li>
                <Link to="#">Upload CSV</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/reports">Reports</Link>
            <ul className="dropdown">
              <li>
                <Link to="#">Shortcodes</Link>
              </li>
              <li>
                <Link to="#">Report Templates</Link>
              </li>
              <li>
                <Link to="#">Manage Reports</Link>
              </li>
            </ul>
          </li>
          <li>
            <Link to="/siaqadmin">Siaq Admin</Link>
            <ul className="dropdown">
              <li>
                <Link to="#">Role</Link>
              </li>
              <li>
                <Link to="#">Menu</Link>
              </li>
              <li>
                <Link to="#">Role Menu</Link>
              </li>
              <li>
                <Link to="#">Manage Survey Threshold</Link>
              </li>
              <li>
                <Link to="#">Designation</Link>
              </li>
            </ul>
          </li>
        </ul>
      </div>
    </div>
  );
};

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");
    } else {
      axios
        .get("https://dummyjson.com/users")
        .then((response) => {
          setUsers(response.data.users);
        })
        .catch((error) => {
          console.error("Error fetching user data:", error);
        });
    }
  }, [navigate]);

  return (
    <div>
      <Sidebar />
      
       
      
    </div>
  );
};

export default UserList;
