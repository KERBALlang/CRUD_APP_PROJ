import './landing_page.css';
import React, { useEffect, useState} from 'react';

const user_page =(props)=>{
    const [search_status, set_search] = useState(0);
    const [submit_status, set_submit] = useState(0);
    const [edit_status, set_edit] = useState(0);
    const [delete_status, set_delete] = useState(0);
    const [page_status, set_reload] = useState(0);

    const [change_item, set_change_item] = useState('');
    const [fetch_list, set_items_fetch] = useState([]);
    const [user_items, set_user_items] = useState([]);
    const [new_item_name, set_new_item_name] = useState('');
    const [new_item_flavor_text, set_new_flavor_text] = useState('');
    const [new_item_quantity, set_new_item_quantity] = useState(0);
    const [user_object, set_user_object] = useState({id: -1});
    ////UNIQUE HANDLERS FOR EACH FORM SUBMITION/////
    const handler_reload = (element)=>{
        element.preventDefault();
        // console.log(user_name);
        // console.log(password);
        if(user_object.id !== -1){
                if (page_status===1){
                    set_reload(0)
                }
                else{
                    set_reload(1)
                }   
        }
    }
    const handler_search = (element)=>{
        element.preventDefault();
        // console.log(user_name);
        // console.log(password);
        if(user_object.id !== -1){
            if(new_item_name !== ''){
                    set_search(1)
            }
        }
    }
    const handler_Submit = (element)=>{
        element.preventDefault();
        // console.log(user_name);
        // console.log(password);
        if(user_object.id !== -1){
            if(new_item_name !== '' && new_item_flavor_text !== '' && new_item_quantity !==0){
                    set_submit(1)
            }
        }
    }
    const handler_edit = (element)=>{
        element.preventDefault();
        // console.log(user_name);
        // console.log(password);
        if(user_object.id !== -1){
            if(new_item_name !== '' && new_item_flavor_text !== '' && new_item_quantity !==0){
                    set_edit(1)
            }
        }
    }
    const handler_delete = (element)=>{
        element.preventDefault();
        // console.log(user_name);
        // console.log(password);
        if(user_object.id !== -1){
            if(new_item_name !== ''){
                    set_delete(1)
            }
        }
    }
////the effects section//////    
useEffect(()=>{
    set_user_object(props.id)
},[])
/////post effect////
useEffect(()=>{
       
    // console.log('ITEMS LIST',items_list)
    // console.log('props passed', props.id)
    if(props.id.id !== -1 && submit_status === 1){
        console.log('SENDING A POST: ', submit_status) 
        if(new_item_name !== '' && new_item_flavor_text !== '' && new_item_quantity !==0){
            const post_body = {user_id: user_object.id,item_name: new_item_name, flavor_text: new_item_flavor_text, quantity: new_item_quantity}
            fetch('http://localhost:3001/items',{method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(post_body)})
            set_new_item_name('');
            set_new_flavor_text('');
            set_new_item_quantity(0);
            set_submit(0);
        }
        console.log('SENT POST: ', submit_status)      
    } 
    else{
        console.log('YOU are not an Authorized user:', user_object)    
    }  
},[submit_status])
//// GET effects////
useEffect(()=>{   
    if(props.id.id !== -1 && submit_status === 0){
        console.log('Me Lord has no data: ', submit_status) 
        fetch(`http://localhost:3001/items`)
            .then(res => res.json())
            .then(data =>{
                console.log('I FETCHED:',data)
                set_items_fetch(data)
            })
        }
        else{
            console.log('YOU are not an Authorized user:', user_object)    
        }    
},[submit_status, page_status])

useEffect(()=>{   
    if(props.id.id !== -1 && search_status === 1){
        console.log('Me Lord has no data: ', submit_status)
        let item_id;
        for(let itteration = 0; itteration< user_items.length;itteration++){
            if(new_item_name === user_items[itteration].item_name){
                item_id = user_items[itteration].id
            }
        } 
        fetch(`http://localhost:3001/items/${item_id}`)
            .then(res => res.json())
            .then(data =>{
                console.log('I FETCHED:',data)
                set_items_fetch(data)
            })
        set_new_item_name('');
        set_new_flavor_text('');
        set_new_item_quantity(0);
        set_search(0)
            
    }
    else{
        console.log('YOU are not an Authorized user:', user_object)    
    }    
},[search_status])
////edit effect/////
useEffect(()=>{   
    if(props.id.id !== -1 && edit_status === 1){
        console.log('Me Lord has no data: ', edit_status)
        let item_id;
        for(let itteration = 0; itteration<user_items.length;itteration++){
            if(change_item === user_items[itteration].item_name){
                item_id = user_items[itteration].id
            }
        } 
        const post_body = {id: item_id, user_id: user_object.id, item_name: new_item_name, flavor_text: new_item_flavor_text, quantity: new_item_quantity}
        console.log(post_body)
        fetch(`http://localhost:3001/items/${item_id}`,{method: 'PUT', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(post_body)})
            .then(res => res.json())
            .then(data =>{
                console.log('EDIT SUBMITTED:',data)
                set_items_fetch(data)
                set_new_item_name('');
                set_new_flavor_text('');
                set_new_item_quantity(0);
                set_edit(0)
            })
    }
    else{
        console.log('YOU are not an Authorized user:', user_object)    
    }    
},[edit_status])
/////delete effect///////
useEffect(()=>{   
    if(props.id.id !== -1 && delete_status === 1){
        console.log('Me Lord has no data: ', delete_status)
        let item_id;
        for(let itteration = 0; itteration<user_items.length;itteration++){
            if(new_item_name === user_items[itteration].item_name){
                item_id = user_items[itteration].id
            }
        } 
        const post_body = {id: item_id, user_id: user_object.id, item_name: new_item_name}
        console.log(post_body)
        fetch(`http://localhost:3001/items/${item_id}`,{method: 'DELETE', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(post_body)})
            .then(res => res.json())
            .then(data =>{
                console.log('EDIT SUBMITTED:',data)
                set_items_fetch(data)
                set_new_item_name('');
                set_new_flavor_text('');
                set_new_item_quantity(0);
                set_delete(0)
            })
    }
    else{
        console.log('YOU are not an Authorized user:', user_object)    
    }    
},[delete_status])



////customizes data set for user////may be unnecisary with proper id checking in server fetch.
useEffect(()=>{  
    // console.log(items_list)
    // console.log(props.id)
    if(props.id.id !== -1){
        console.log('SUCCESSFULL LOGIN', fetch_list)
        const temp_array =[]
        if(fetch_list.length>0){
            for(let itteration= 0;itteration<fetch_list.length;itteration++){
                if(props.id.id===fetch_list[itteration].user_id){
                    temp_array.push(fetch_list[itteration])
                }
            }
            console.log('TEMP_ARRAY: ', temp_array)
            set_user_items(temp_array)
        }
        else{
            console.log("LOOP DIDN'T RUN:", user_items)
        }
    }
    else{
        console.log('YOU are not an Authorized user:', user_object)    
    }   
},[fetch_list])
////cleaning actions////
useEffect(()=>{
    console.log("USER ITEMS:",user_items)
    set_items_fetch([])
}, [user_items])


/////the work/////
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
            <form onSubmit={handler_Submit}>
                <label for='item_name'>Item name: </label>
                <input type="text" value={new_item_name} onChange={(element)=>{set_new_item_name(element.target.value)}} placeholder='Input your Item Name'></input>
                <label for='flavor_text'>Flavor text: </label>   
                <input type="text" value={new_item_flavor_text} onChange={(element)=>{set_new_flavor_text(element.target.value)}} placeholder='Please input Your description'></input>
                <label for='quantity'>quantity: </label>   
                <input type="integer" value={new_item_quantity} onChange={(element)=>{set_new_item_quantity(element.target.value)}} placeholder='Please input Your number of items'></input>                            
                <button>Submit New Item</button>
            </form>
            <form onSubmit={handler_edit}>
                <label for='item_name'>Item name: </label>
                <input type="text" value={new_item_name} onChange={(element)=>{set_new_item_name(element.target.value)}} placeholder='Input your Item Name'></input>
                <label for='flavor_text'>Flavor text: </label>   
                <input type="text" value={new_item_flavor_text} onChange={(element)=>{set_new_flavor_text(element.target.value)}} placeholder='Please input Your description'></input>
                <label for='quantity'>quantity: </label>   
                <input type="integer" value={new_item_quantity} onChange={(element)=>{set_new_item_quantity(element.target.value)}} placeholder='Please input Your number of items'></input>                            
                <label for='item_name'>CHANGE ITEM'S CURRENT NAME: </label>
                <input type="text" value={change_item} onChange={(element)=>{set_change_item(element.target.value)}} placeholder='ITEM NAME TO CHANGE'></input>
                <button>Edit Item</button>
            </form>
            <form onSubmit={handler_delete}>
                <label for='item_name'>Item name: </label>
                <input type="text" value={new_item_name} onChange={(element)=>{set_new_item_name(element.target.value)}} placeholder='Input your Item Name'></input>                           
                <button>Delete Item</button>
            </form>
            <form onSubmit={handler_reload}>
                <button>Reload</button>
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