import UserList from "./Sidebar"
import './Lo.css';

function Dashboard() {


  return (
  <div>
    <UserList />
    <p style={{float:"right"}}>Hi, Welcome Back..</p>
    <div className="mp">
   <input  className="mx" type="text"></input>
   <input  className="mx" type="text"></input>
   <input  className="mx" type="text"></input>
   <input  className="mx" type="text"></input>
   <input  className="mx" type="text"></input>
   </div>
   

  </div>
    
  )
}

export default Dashboard