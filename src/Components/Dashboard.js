import React, { useState, useEffect } from "react";
import { useNavigate , Link } from "react-router-dom";
import axios from "axios";
import { Sidebar, Menu, MenuItem, SubMenu } from 'react-pro-sidebar';
import  './Lo.css';
import { MdDashboard } from "react-icons/md";
import { FaUser } from "react-icons/fa";
import { HiMiniUsers } from "react-icons/hi2";
import { FaBuildingColumns } from "react-icons/fa6";
import { BiSolidReport } from "react-icons/bi";
import { RiAdminFill } from "react-icons/ri";
const UserList = () => {
  // const [users, setUsers] = useState([]);

  
      

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
    <div style={{ height: '100%', minHeight: '400px', width: '310px', float: 'left' }}>
      
      <Sidebar collapsed={collapsed}>
  <Menu>
  <MdDashboard /><MenuItem component={<Link to="/dashboard" />}> Dashboard </MenuItem>
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

        <div>
         
        {/* <button className="z" onClick={handleLogOut}>sysadmin LogOut</button> */}
          <button className="sb-button" onClick={() => setCollapsed(!collapsed)}>
          - O-           
          </button>
          
        </div>
        </div> 
  );
};
        function Dashboard() {

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

           const[client ,setClient]=useState('Client');
           const[building,setBuilding]=useState('Building');
           const[groupBy,setGroupBy]=useState('Group By');
           const[year,setYear]=useState('Year');
           const[environment,setEnvironment]=useState('Environment');
           const[parameter,setParameter]=useState('Parameter');

           const getAllClient = async () =>{
                axios.post("client/getAllClientDD",[])
                     .then((res) => {
                             const data=[
                        { value:"", label:"Select Client", isDisabled: true},  
                          ...res.data.data.list.map((item)=>({
                           value:item.clientId.toString(),
                           label:item.clientName, 
                          })),
                             ];
                             setClient(data);
                     }) 
                         .catch((error)=>{ });
           } 
                    
            
return (
  <main>
  
<div>
  <UserList />
  <button className="z" onClick={handleLogOut}>sysadmin LogOut</button><br></br><br></br>
  <p>Hi, Welcome Back..</p><br></br>
  <div className="row mb-3">
    <div className="col">
       <div className="card bg-info">
          <h3>77</h3>
          <p>Clients</p>
       </div>
    </div>
    <div className="col">
    <div className="card bg-success">
    <h3>694</h3>
          <p>Buildings</p>
       </div>
    </div>
    <div className="col">
    <div className="card bg-danger">
    <h3>3781</h3>
          <p>Jobs</p>
       </div>
    </div>
    <div className="col">
    <div className="card bg-primary">
    <h3>2662</h3>
          <p>Surveys Completed </p>
       </div>
    </div>
    <div className="col">
    <div className="card bg-warning">
    <h3>2642</h3>
          <p>Reports Generated</p>
       </div>
    </div>
 
</div><br></br>
<div className="container">
<div className="row">
  <div className="col-sm-8">

 <select className="d-inline mx-2">
      <option onChange={getAllClient}>
        
        Client<span className="text-danger">*</span>
      </option>

  
    </select>
     
    <select className="d-inline mx-2">
      <option >
        Building<span className="text-danger">*</span>
      </option>

      
    </select>

    <select className="d-inline mx-2">
      <option>
        Group By<span className="text-danger">*</span>
      </option>

    </select>
    <select className="d-inline mx-2">
      <option>
        Year<span className="text-danger">*</span>
      </option>

    </select>
    <select className="d-inline mx-2">
      <option>
        Environment<span className="text-danger">*</span>
      </option>

     
    </select>
    

    <select className="d-inline mx-2">
      <option>
        Parameter<span className="text-danger">*</span>
      </option>
    </select>
    </div>
    
    <div className="col-sm-4">
      <select className="d-inline mx-2">
        <option>
          Year<span className="text-danger">*</span>
        </option>
      </select>
    <p className="d-inline mx-2">Completed:</p>
    <p className="d-inline mx-2">Pending:</p>
    </div>
    
    </div>
    </div><br></br>
    <h5>Survey Statistics</h5>
    
 
   </div>

  </main>
)
}

export default Dashboard
       




