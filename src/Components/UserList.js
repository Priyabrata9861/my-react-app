import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function UserList() {
  const [users, setUsers] = useState([]);
  let [token, setToken] = useState('');
  const navigate=useNavigate();
  useEffect(() => {
    setToken=localStorage.getItem('token');
    if(!setToken){
      navigate("/");
    }
    
    axios.get("https://dummyjson.com/users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);
   const handleLogOut=()=>{
    localStorage.removeItem('token');      
    navigate("/");
    alert("LogOut Suceessfully");
    
    };

  return (
    
    <div>
      <h1>User List</h1>
      <button onClick={handleLogOut}>LogOut</button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Id</th>
            <th>First Name</th>
            <th>Age</th>
            <th>Gender</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, id) => (
            <tr key={user.id}>
              <td>{id + 1}</td>
              <td>{user.firstName}</td>
              <td>{user.age}</td>
              <td>{user.gender}</td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}
export default UserList;
