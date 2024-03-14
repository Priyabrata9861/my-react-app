import { Sidebar, Menu, MenuItem, SubMenu } from "react-pro-sidebar";
import "./Lo.css";
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { FaBuildingColumns } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
import React  from "react";
import {Link} from "react-router-dom";



function User() {
    const [collapsed, setCollapsed] = React.useState(false);
    return (
      <div
        style={{
          height: "100%",
          minHeight: "400px",
          width: "310px",
          float: "left",
        }}
      >
        <Sidebar collapsed={collapsed}>
          <Menu>
            <MdDashboard />
            <MenuItem component={<Link to="/dashboard" />}> Dashboard </MenuItem>
            <FaUser />
            <MenuItem component={<Link to="/user" />}> Users </MenuItem>
            <HiMiniUsers />
            <SubMenu label="Clients">
              <MenuItem component={<Link to="/ClientManagement" />}>
                {" "}
                Client Management{" "}
              </MenuItem>
              <MenuItem> Building Management </MenuItem>
              <MenuItem> Client Representative </MenuItem>
              <MenuItem> Client Representative </MenuItem>
            </SubMenu>
            <FaBuildingColumns />
            <SubMenu label="Jobs">
              <MenuItem component={<Link to="/JobManagement" />}>
                {" "}
                Job Management{" "}
              </MenuItem>
              <MenuItem> Upload CSV </MenuItem>
            </SubMenu>
            <BiSolidReport />
            <SubMenu label="Reports">
              <MenuItem component={<Link to="/Shortcodes" />}>
                {" "}
                Shortcodes{" "}
              </MenuItem>
              <MenuItem> Report Templates </MenuItem>
              <MenuItem> Manage Reports </MenuItem>
            </SubMenu>
            <RiAdminFill />
            <SubMenu label="SIAQ Admin">
              <MenuItem> Role </MenuItem>
              <MenuItem> Menu </MenuItem>
              <MenuItem> Role Menu </MenuItem>
              <MenuItem> Manage Survey Threshold </MenuItem>
              <MenuItem> Designation </MenuItem>
            </SubMenu>
          </Menu>
        </Sidebar>
  
        <div>
          <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
            - O-
          </button>
        </div>
      </div>
    );
  
}

export default User