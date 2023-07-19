import './landing_page.css';
import React, { useEffect, useState} from 'react';

const landing_page =()=>{
    const [user_name, set_username]=useState('');
    const [password, set_password]=useState('');
    const [state_update, set_state_update]=useState(0);
    const [user_fetch, set_user_fetch]=useState(0);
    // console.log(user_name);
    // console.log(password);
    // console.log(state_update);

    const handler = (element)=>{
        element.preventDefault()
        // console.log(user_name);
        // console.log(password);
        // console.log(state_update);
        set_state_update(1)
        // console.log(state_update);
    }

    useEffect(()=>{
        if( state_update==1){
        console.log('TRUE my state is:', state_update)    
        console.log(user_name, password)
        // ///this will be the fetch to the server checking for username & password///
        fetch('http://localhost:3001/users')
            .then(res => res.json())
            .then(data =>{
                console.log(data)
                set_user_fetch(data)
        })
        // ///this just force resets state variables to protect user///
        }
        else{
        // if the state is 0 then do nothing //
        console.log('my state is FALSE:', state_update)
        }
    },[state_update])
    useEffect(()=>{
        for (let itteration = 0; itteration < user_fetch.length; itteration++){
            console.log(user_fetch[itteration].id)
            if (user_name === user_fetch[itteration].user_name && password === user_fetch[itteration].user_password){
             return   (
                console.log('you may pass'),
                set_username(''),
                set_password(''),
                set_state_update(0)
                )
            }
        }
        
        console.log('YOU SHALL NOT PASS!')
        set_username('');
        set_password('');
        set_state_update(0);
    },[user_fetch])


    return(
    <>   
    <header>
        <h1>Inventory Manager</h1>
        
    </header>
    <main>
        <form onSubmit={handler}>
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

export default landing_page;