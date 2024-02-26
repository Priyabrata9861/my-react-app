import React from 'react';
import './App.css';
import Loginpage from './Components/Loginpage';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import UserList from './Components/Sidebar';
function App() {
 
  return (
    
    <Router>
      <Routes>
          <Route path="/" Component={Loginpage}></Route>
          <Route path="/users" Component={UserList}></Route>
      </Routes>
    
    </Router>
  );
}

export default App;
