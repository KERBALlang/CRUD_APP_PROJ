import './landing_page.css';
import React, { useEffect, useState} from 'react';

const user_page =(props)=>{
    const [items_list, set_items_fetch]=useState([]);
    const [state_update, set_state_update]=useState(0);
    const [user_items, set_user_items] = useState([]);
    const [new_item_name, set_new_item_name] = useState('');
    const [new_item_flavor_text, set_new_flavor_text] = useState('');
    const [new_item_quantity, set_new_item_quantity] = useState(0);
    const [user_object, set_user_object] = useState({
        id: -1
    });
    const handler = (element)=>{
        element.preventDefault();
        // console.log(user_name);
        // console.log(password);
        if(user_object.id !== -1){
            if(new_item_name !== '' && new_item_flavor_text !== '' && new_item_quantity !==0){
                    set_state_update(1)
            }
        }
    }
useEffect(()=>{
    set_user_object(props.id)
},[])


useEffect(()=>{
    console.log('Me Lord has no data:', state_update)    
    console.log('ITEMS LIST',items_list)
    console.log('props passed', props.id)
    if(props.id.id !== -1){
        if(new_item_name !== '' && new_item_flavor_text !== '' && new_item_quantity !==0){
            const post_body = {user_id: user_object.id,item_name: new_item_name, flavor_text: new_item_flavor_text, quantity: new_item_quantity}
            fetch('http://localhost:3001/items',{method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(post_body)})
            set_new_item_name('')
            set_new_flavor_text('')
            set_new_item_quantity(0)
            set_state_update(0)
        
        }
        else if(state_update === 0){
        fetch(`http://localhost:3001/items`)
        .then(res => res.json())
        .then(data =>{
            console.log('I FETCHED:',data)
            set_state_update(1)
            set_items_fetch(data)
            set_state_update(1)
        })}
    }
    else{
        console.log('YOU are not an Authorized user:', state_update)    
    }    
},[state_update])

useEffect(()=>{
    console.log('But what about Second Breakfast?:', state_update)    
    console.log(items_list)
    console.log(props.id)
    if(props.id.id !== -1){
        if(state_update === 1){
            if(items_list.length>1){
            console.log('SUCCESSFULL LOGIN')
            const temp_array =[]
            for(let itteration= 0;itteration<items_list.length;itteration++){
                if(props.id.id===items_list[itteration].user_id){
                    temp_array.push(items_list[itteration])
                }
            }
            set_user_items(temp_array)
            set_items_fetch([])
            set_state_update(-1)
            console.log("USER ITEMS:",user_items)
            }}
        else{
            console.log('Weve had one yes, but:', state_update)    
        }}
    }    
,[state_update, items_list])

// let AutoRefresh((t)=>{
//     setTimeout(location.reload(true), t)
// })
// AutoRefresh(5000)

    return(
        <>
 
        <header>
            <h1>Inventory Manager</h1>
            
        </header>
        <main>
            <form onSubmit={handler}>
                <label for='item_name'>Item name: </label>
                <input type="text" value={new_item_name} onChange={(element)=>{set_new_item_name(element.target.value)}} placeholder='Input your User Name'></input>
                <label for='flavor_text'>Flavor text: </label>   
                <input type="text" value={new_item_flavor_text} onChange={(element)=>{set_new_flavor_text(element.target.value)}} placeholder='Please input Your password'></input>
                <label for='quantity'>quantity: </label>   
                <input type="integer" value={new_item_quantity} onChange={(element)=>{set_new_item_quantity(element.target.value)}} placeholder='Please input Your password'></input>                            
                <button>Submit</button>
            </form>






            {user_items.map((item)=>(
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

export default user_page;