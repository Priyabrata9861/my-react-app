import React, { useState, useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
// import axios from "axios";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import  './Lo.css';
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { FaBuildingColumns } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import Dashboard from "./Dashboard";
const UserList = () => {
  // const [users, setUsers] = useState([]);

  const navigate = useNavigate();
  
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    alert("LogOut Successfully");
  };

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/");}})
      

  //   } else {
  //     axios
  //       .get("https://dummyjson.com/users")
  //       .then((response) => {
  //         setUsers(response.data.users);
  //       })
  //       .catch((error) => {
  //         console.error("Error fetching user data:", error);
  //       });
  //   }
  // }, [navigate]);

  
    const [collapsed, setCollapsed] = React.useState(false);
  return (
    <div style={{ display: 'flex', height: '100%', minHeight: '400px' }}>
      
      <Sidebar collapsed={collapsed}>
  <Menu>
  <MdDashboard /><MenuItem component={<Link to="/Dashboard" />}> Dashboard </MenuItem>
<FaUser /><MenuItem component={<Link to="/User" />}> Users </MenuItem>
    <HiMiniUsers /><SubMenu label="Clients">
      <MenuItem component={<Link to="/ClientManagement" />}> Client Management </MenuItem>
      <MenuItem> Building Management </MenuItem>
      <MenuItem> Client Representative </MenuItem>
      <MenuItem> Client Representative </MenuItem>
    </SubMenu>
    <FaBuildingColumns /><SubMenu label="Jobs">
      <MenuItem component={<Link to="/JobManagement" />}> Job Management </MenuItem>
      <MenuItem> Upload CSV </MenuItem>
    </SubMenu>
    <BiSolidReport />
<SubMenu label="Reports">
      <MenuItem component={<Link to="/Shortcodes" />}> Shortcodes </MenuItem>
      <MenuItem> Report Templates </MenuItem>
      <MenuItem> Manage Reports </MenuItem>
    </SubMenu>
    <RiAdminFill /><SubMenu label="SIAQ Admin">
      <MenuItem> Role </MenuItem>
      <MenuItem> Menu </MenuItem>
      <MenuItem> Role Menu </MenuItem>
      <MenuItem> Manage Survey Threshold </MenuItem>
      <MenuItem> Designation </MenuItem>
    </SubMenu>
  </Menu>
</Sidebar>
<main style={{ padding: 10 }}>
        <div>
        <button onClick={handleLogOut}>sysadmin</button>
          <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
            Collapse
          </button>
          
        </div>
      </main>
    </div>
  );
};

export default UserList;
