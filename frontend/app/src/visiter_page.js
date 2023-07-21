import './landing_page.css';
import React, { useEffect, useState} from 'react';

const visiter_page =()=>{
    const [fetch_list, set_items_fetch]=useState([]);
    const [state_update, set_state_update] = useState(0);
    const [search_status, set_search] = useState(0);
    const[new_item_name, set_new_item_name] = useState('');

    const handler = (element)=>{
        element.preventDefault();
        // console.log(user_name);
        // console.log(password);
        set_state_update(0)
    }
    const handler_search = (element)=>{
        element.preventDefault();
        // console.log(user_name);
        // console.log(password);
            if(new_item_name !== ''){
                    set_search(1)
            }  
    }

useEffect(()=>{
    if( state_update===0){
    console.log('Me Lord has no data:', state_update)    
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
},[state_update])

useEffect(()=>{   
    if(search_status === 1){
        console.log('Me Lord has no data: ', search_status)
        let item_id;
        for(let itteration = 0; itteration< fetch_list.length;itteration++){
            if(new_item_name === fetch_list[itteration].item_name){
                item_id = fetch_list[itteration].id
            }
        } 
        fetch(`http://localhost:3001/items/${item_id}`)
            .then(res => res.json())
            .then(data =>{
            console.log('I FETCHED:',data)
            set_items_fetch(data)
        })
        set_new_item_name('');
        set_search(0)
            
    }  
},[search_status])




    return(
    <>   
    <header>
        <h1>Inventory Manager</h1>
        
    </header>
    <main>
        <form onSubmit={handler_search}>
            <label for='item_name'>Item name: </label>
            <input type="text" value={new_item_name} onChange={(element)=>{set_new_item_name(element.target.value)}} placeholder='Input your Item Name'></input>  
            <button>Search Item</button>
        </form>
        <form onSubmit={handler}>
            <button>Reload</button>
        </form>
        {fetch_list.map((item)=>(
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