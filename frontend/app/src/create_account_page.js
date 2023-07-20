import { json } from 'react-router-dom';
import './landing_page.css';
import React, { useEffect, useState} from 'react';

const create_account_page=()=>{
    const [first_name, set_firstname]=useState('');
    const [last_name, set_lastname]=useState('');
    const [user_name, set_username]=useState('');
    const [password, set_password]=useState('');
    const [state_update, set_state_update]=useState(0);
    const [user_fetch, set_user_fetch]=useState([]);

    const handler = (element)=>{
        element.preventDefault();
        // console.log(first_name);
        // console.log(last_name);
        // console.log(user_name);
        // console.log(password);
        set_state_update(1)
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
        if(first_name === '' || last_name === '' || user_name === '' || password === ''){
            return (console.log('EMPTY SET'))
        }
        else{
            for (let itteration = 0; itteration < user_fetch.length; itteration++){
                console.log(user_fetch[itteration].id)
                if(first_name === user_fetch[itteration].first_name && last_name === user_fetch[itteration].last_name){
                    console.log('you have a common name: ', first_name, last_name)
                    if (user_name === user_fetch[itteration].user_name){
                        if (password !== user_fetch[itteration].password){
                            console.log('WRONG PASSWORD')
                        }
                    return   (
                        console.log('you already exist within this database: ', user_name),
                        console.log('please use the home button and login with your username and password: ', user_name),
                        set_firstname(''),
                        set_lastname(''),
                        set_username(''),
                        set_password(''),
                        set_state_update(0)
                        )
                    }/////
                }/////
            }///// this is the post to the database //////
            const post_body = {first_name: first_name, last_name: last_name, user_name: user_name, user_password: password}
            fetch('http://localhost:3001/users',{method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(post_body)})
                // .then(()=>{
                //     console.log('a new user has been created')
                // })
            ////
            return(
            console.log('you at least have a unique username: ', user_name),   
            console.log('please use the home button and login with your username and password: ', user_name),
            set_firstname(''),
            set_lastname(''),
            set_username(''),
            set_password(''),
            set_state_update(0)
            )
        }
    },[user_fetch])


    return(
    <>   
    <header>
        <h1>Inventory Manager</h1>
        
    </header>
    <main>
        <form onSubmit={handler}>
            <label for='first_name'>First Name: </label>
            <input type="text" value={first_name} onChange={(element)=>{set_firstname(element.target.value)}} placeholder='Input your first Name'></input>
            <label for='last_name'>Last Name: </label>   
            <input type="text" value={last_name} onChange={(element)=>{set_lastname(element.target.value)}} placeholder='Input Your last name'></input>
            <label for='user_name'>User Name: </label>
            <input type="text" value={user_name} onChange={(element)=>{set_username(element.target.value)}} placeholder='Input your User Name'></input>
            <label for='password'>password: </label>   
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