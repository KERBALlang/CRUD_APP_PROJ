import { render } from 'react-dom';
import './landing_page.css';
import React, { useEffect, useState} from 'react';

const visiter_page =()=>{
    const [items_list, set_items_fetch]=useState([
        {item_name: 'candle'}
    ]);
    const [state_update, set_state_update]=useState(0);

    const handler = (element)=>{
        element.preventDefault();
        // console.log(user_name);
        // console.log(password);
    }

useEffect(()=>{
    if( state_update==0){
    console.log('Me Lord has no data:', state_update)    
    console.log(items_list)
    fetch('http://localhost:3001/items')
    .then(res => res.json())
    .then(data =>{
        console.log(data)
        set_state_update(1)
        set_items_fetch(data)
    })
    }
    else{
        console.log('TRUE my state is:', state_update)    
    }    
},[])
useEffect(()=>{

    if( state_update==1){
    console.log('But what about Second Breakfast?:', state_update)    
    console.log(items_list)
    for(let itteration= 0;itteration<items_list.length;itteration++){

    }
    

    }
    else{
        console.log('Weve had one yes, but:', state_update)    
    }    
},[state_update])


    return(
    <>   
    <header>
        <h1>Inventory Manager</h1>
        
    </header>
    <main>
        {/* {JSON.stringify(items_list[0].item_name)} */}
        {items_list.map((item)=>(
            <li key={item.id}>
                ID: {item.id}
                <h3>Item name: {item.item_name}</h3>
                <p>Flavor text: {item.flavor_text}</p>
                <p>Quantity: {item.quantity}</p>
            </li>
        ))}
        
        
        
    </main>
    <footer>
        <h2>Inventory Manager</h2>
    </footer>
    </>    
    );
}

export default visiter_page;