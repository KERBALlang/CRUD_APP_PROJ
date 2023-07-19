import './landing_page.css';
import React, { useEffect, useState} from 'react';

const visiter_page =()=>{
    const [user_name, setusername]=useState();
    const [password, set_password]=useState();

    const handler = (element)=>{
        element.preventDefault();
        // console.log(user_name);
        // console.log(password);
    }

    return(
    <>   
    <header>
        <h1>Inventory Manager</h1>
        
    </header>
    <main>
        <form onSubmit={handler}>
            <label for='user name'>User Name</label>
            <input type="text" value={user_name} onChange={(element)=>{setusername(element.target.value)}} placeholder='Input your User Name'></input>
            <label for='password'>password</label>   
            <input type="password" value={password} onChange={(element)=>{set_password(element.target.value)}} placeholder='Please input Your password'></input>              
            <button>Login</button>
        </form>
    </main>
    <footer>
        <h2>Inventory Manager</h2>
    </footer>
    </>    
    );
}

export default visiter_page;