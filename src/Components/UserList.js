import Table from "react-bootstrap/Table";
import React, { useState, useEffect } from "react";
import axios from "axios";
import 'bootstrap/dist/css/bootstrap.min.css';

function UserList() {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    
    axios
      .get("https://dummyjson.com/users")
      .then((response) => {
        setUsers(response.data.users);
      })
      .catch((error) => {
        console.error("Error fetching user data:", error);
      });
  }, []);

  return (
    <div>
      <h1>User List</h1>
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
