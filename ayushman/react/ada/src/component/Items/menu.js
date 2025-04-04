import logo from './logo.svg';
import user from '../src/img/user.png';
import edit from '../src/img/edit.png';
import inbox from '../src/img/envelope.png';
import settings from '../src/img/settings.png';
import help from '../src/img/question.png';
import logout from '../src/img/log-out.png';
// import './App.css';
import DropdownItem from './DropdownItem';
// import { Link } from 'react-router-dom';

import React, {useState, useEffect, useRef} from 'react';

function App() {

  const [open, setOpen] = useState(false);

  let menuRef = useRef();

  useEffect(() => {
    let handler = (e)=>{
      if(!menuRef.current.contains(e.target)){
        setOpen(false);
        console.log(menuRef.current);
      }      
    };

    document.addEventListener("mousedown", handler);
    

    return() =>{
      document.removeEventListener("mousedown", handler);
    }

  });

  return (
    <div className="App">
      <div className='menu-container' ref={menuRef}>
        <div className='menu-trigger' onClick={()=>{setOpen(!open)}}>
          {/* <img src={user}></img> */}
        </div>

        <div className={`dropdown-menu ${open? 'active' : 'inactive'}`} >
          <ul>
            <DropdownItem img = {user} text = {"My Profile"} link={"/Login"}/>
            <DropdownItem img = {edit} text = {"Edit Profile"} link={"/Edit Profile"}/>
            <DropdownItem img = {inbox} text = {"Inbox"} link={"/Inbox"}/>
            <DropdownItem img = {settings} text = {"Settings"} link={"/Settings"}/>
            <DropdownItem img = {help} text = {"Helps"} link={"/Help"}/>
            <DropdownItem img = {logout} text = {"Logout"} link={"/Login"}/>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default App;