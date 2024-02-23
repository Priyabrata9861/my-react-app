import React from 'react';
import './App.css';
import Loginpage from './Components/Loginpage';

import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserList from './Components/Sidebar';
import Dashboard from './Components/Dashboard';
import Users from './Components/Users';
import Reports from './Components/Reports';
import SiaqAdmin from './Components/SiaqAdmin';  
import Job from './Components/Job';
import ClientManagement from './Components/ClientManagement';
import Client from './Components/Client';

function App() {
 
  return (
    
    <Router>
      <Routes>
          <Route path="/" Component={Loginpage}></Route>
          <Route path="/users" Component={UserList}></Route>
          <Route path="/dashboard" Component={Dashboard}></Route>
          <Route path="/users" Component={Users} ></Route>
          <Route path="/client" Component={Client }></Route>
          <Route path="/clientmanagement" Component={ClientManagement}></Route>
          <Route path="/job" Component={Job } ></Route>
          <Route path="/siaqadmin" Component={SiaqAdmin }></Route>
          <Route path="/reports" Component={Reports }></Route>
          <Route path="/siaqadmin" Component={SiaqAdmin }></Route>
        </Routes>
    
    </Router>
  );
}

export default App;
