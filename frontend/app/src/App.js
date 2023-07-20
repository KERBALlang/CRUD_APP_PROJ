import React, { useState } from 'react';
import './App.css';
import {Routes, Route, useNavigate} from 'react-router-dom';
import Landing_page from './landing_page'
import Create_account_page from './create_account_page'
import Visiter_page from './visiter_page'
import User_page from './user_page'

function App() {
  const navigate = useNavigate();
  const [id, set_id] = useState({
    id: -1
  })



  return (
  <>
    <button onClick={()=>{navigate('./')}} >HOME</button>
    <button onClick={()=>{navigate('./visitor')}} >Visiter</button>
    <button onClick={()=>{navigate('./create_account')}} >Create New Account</button>
    <button onClick={()=>{navigate('./user')}} >User</button>

    <Routes>
      <Route path='/' element={<Landing_page set_id={set_id} />}/>
      <Route path='/create_account' element={<Create_account_page />}/>
      <Route path='/visitor' element={<Visiter_page />}/>
      <Route path='/user' element={<User_page id={id}/>}/>
    </Routes>
  </>
  );
}

export default App;
