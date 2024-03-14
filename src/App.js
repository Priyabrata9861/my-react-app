import React from "react";
import "./App.css";
import Loginpage from "./Components/Loginpage";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import User from "./Components/User";
import Dashboard from "./Components/Dashboard";
function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" Component={Loginpage}></Route>

        <Route path="/dashboard" Component={Dashboard}></Route>
        <Route path="/user" Component={User}></Route>
      </Routes>
    </Router>
  );
}

export default App;
