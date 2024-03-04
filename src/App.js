import React from 'react';
import './App.css';
import Loginpage from './Components/Loginpage';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserList from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
function App() {
 
  return (
    
    <Router>
      <Routes>
          <Route path="/" Component={Loginpage}></Route>
          <Route path="/UserList" Component={UserList}></Route>
          <Route path="/Dashboard" Component={Dashboard}></Route>
      </Routes>
    
    </Router>
  );
}

export default App;
