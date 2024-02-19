import React from 'react';
import './App.css';
import FormExample from './Components/FormExample';
import UserList from './Components/UserList';
import { BrowserRouter as Router, Route, Routes} from "react-router-dom";
import Test from './Components/Test';

function App() {
 
  return (
    
    <Router>
      <Routes>
        <Route path='/' Component={FormExample}></Route>
        <Route path='/users' Component={UserList}></Route>
        <Route path='/Test' Component={Test}></Route>
      </Routes>
    </Router>
  );
}

export default App;
