import './landing_page.css';
import React, { useEffect, useState} from 'react';

const create_account_page=()=>{
    const [first_name, set_firstname]=useState();
    const [last_name, set_lastname]=useState();
    const [user_name, set_username]=useState();
    const [password, set_password]=useState();

    const handler = (element)=>{
        element.preventDefault();
        console.log(first_name);
        console.log(last_name);
        console.log(user_name);
        console.log(password);
    }

    return(
    <>   
    <header>
        <h1>Inventory Manager</h1>
        
    </header>
    <main>
        <form onSubmit={handler}>
        <label for='first_name'>First Name</label>
            <input type="text" value={first_name} onChange={(element)=>{set_firstname(element.target.value)}} placeholder='Input your first Name'></input>
            <label for='last_name'>Last Name</label>   
            <input type="text" value={last_name} onChange={(element)=>{set_lastname(element.target.value)}} placeholder='Input Your last name'></input>
            <label for='user_name'>User Name</label>
            <input type="text" value={user_name} onChange={(element)=>{set_username(element.target.value)}} placeholder='Input your User Name'></input>
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

export default create_account_page;