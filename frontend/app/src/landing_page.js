import './landing_page.css';
import React, { useEffect, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
const landing_page =(props)=>{
    const [user_name, set_username]=useState('');
    const [password, set_password]=useState('');
    const [state_update, set_state_update]=useState(0);
    const [user_fetch, set_user_fetch]=useState([]);
    // console.log(user_name);
    // console.log(password);
    // console.log(state_update);
    const navigate = useNavigate()
    const handler = (element)=>{
        element.preventDefault()
        // console.log(user_name);
        // console.log(password);
        // console.log(state_update);
        set_state_update(1)
        // console.log(state_update);
    }
    const [history, set_history]= useState('')
    const route_change = ()=>{
        let path = 'http://localhost:3000/user';
        set_history(path)
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
        if(user_fetch !== []){
            for (let itteration = 0; itteration < user_fetch.length; itteration++){
                console.log(user_fetch[itteration].id)
                if (user_name === user_fetch[itteration].user_name && password === user_fetch[itteration].user_password){
                    props.set_id(user_fetch[itteration])
                return   (
                    console.log('you may pass'),
                    set_username(''),
                    set_password(''),
                    set_state_update(0),
                    set_user_fetch(user_fetch[itteration])
                    )
                }
            }
            
            console.log('YOU SHALL NOT PASS!')
            set_username('');
            set_password('');
            set_state_update(0);
        }
        console.log('STATE CONTAINS: ', user_fetch)
    },[user_fetch])




    return(
    <>   
    <header>
        <h1>Inventory Manager</h1>
        
    </header>
    <main>
        <form onSubmit={handler}>
            <label for='user_name'>User Name: </label>
            <input type="text" value={user_name} onChange={(element)=>{set_username(element.target.value)}} placeholder='Input your User Name'></input>
            <label for='password'>password: </label>   
            <input type="password" value={password} onChange={(element)=>{set_password(element.target.value)}} placeholder='Please input Your password'></input>
            {/* <Link to='/user'>             */}
                <button>Login</button>
            
            {/* </Link>   */}
        </form>
        <button onClick={()=>{navigate('./user')}} >AFTER LOGIN SUBMITED CLICK HERE</button>
        <li>
            <p>Please input your username and password above. if when you go to the user page via the two navigation buttons labeled users, your content should be populated unless you have nothing in your inventory.</p>
            <p>if you dont have an account please click the link to make one if you need your own inventory to track. when finished return here and login. please not that usernames must be unique and cannot be taken by another user.</p>
            <p>If you just need to look at inventories and item please use the visiter button</p>
        </li>
    </main>
    <footer>
        <h2>Inventory Manager</h2>
    </footer>
    </>    
    );
}

export default landing_page;