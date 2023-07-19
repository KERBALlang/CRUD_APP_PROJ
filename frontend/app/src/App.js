import React from 'react';
import './App.css';
import {Routes, Route, Link, useNavigate} from 'react-router-dom';
import Landing_page from './landing_page'
import Login_page from './login_page'
import Create_account_page from './create_account_page'
import Visitor_page from './visitor_page'
import User_page from './user_page'

function App() {
  return (
  <>
    <Routes>
      <Route path='/' element={<Landing_page />}/>
      <Route path='/login' element={<Login_page />}/>
      <Route path='/create_account' element={<Create_account_page />}/>
      <Route path='/visitor' element={<Visitor_page />}/>
      <Route path='/user' element={<User_page />}/>
    </Routes>
  </>
  );
}

export default App;
