import React, { useState, useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';

const UserList = () => {
  const [users, setUsers] = useState([]);
  const navigate = useNavigate();
  
  
  const handleLogOut = () => {
    localStorage.removeItem("token");
    navigate("/");
    alert("LogOut Successfully");
  };

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
      <Sidebar>
  <Menu
    menuItemStyles={{
      button: {
        [`&.active`]: {
          backgroundColor: '#13395e',
          color: '#b6c8d9',
        },
      },
    }}
  >
  <MenuItem omponent={<Link to="/Dashboard" />}> Dashboard </MenuItem>
  <MenuItem> Users </MenuItem>
    <SubMenu label="Clients">
      <MenuItem> Client Management </MenuItem>
      <MenuItem> Building Management </MenuItem>
      <MenuItem> Client Representative </MenuItem>
      <MenuItem> Client Representative </MenuItem>
    </SubMenu>
    <SubMenu label="Jobs">
      <MenuItem> Job Management </MenuItem>
      <MenuItem> Upload CSV </MenuItem>
    </SubMenu>
    <SubMenu label="Reports">
      <MenuItem> Shortcodes </MenuItem>
      <MenuItem> Report Templates </MenuItem>
      <MenuItem> Manage Reports </MenuItem>
    </SubMenu>
    <SubMenu label="SIAQ Admin">
      <MenuItem> Role </MenuItem>
      <MenuItem> Menu </MenuItem>
      <MenuItem> Role Menu </MenuItem>
      <MenuItem> Manage Survey Threshold </MenuItem>
      <MenuItem> Designation </MenuItem>
    </SubMenu>
  </Menu>
</Sidebar>;  
    </div>
  );
};

export default UserList;
