import React from 'react';
import './App.css';
import FormFloatingBasicExample from './Components/FormFloatingBasicExample';
import UserList from './Components/UserList';
import {
  BrowserRouter as Router, Route,
  Routes
} from "react-router-dom";

function App() {
 
  return (
    <Router>
      <Routes>
        <Route path='/' Component={FormFloatingBasicExample}></Route>
        <Route path='/users' Component={UserList}></Route>
      </Routes>
    </Router>
  );
}

export default App;
