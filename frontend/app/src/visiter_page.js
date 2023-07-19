import './landing_page.css';
import React, { useEffect, useState} from 'react';

const visiter_page =()=>{
    const [items_list, set_itemslist]=useState();

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
        <p>MY CONTENT</p>
    </main>
    <footer>
        <h2>Inventory Manager</h2>
    </footer>
    </>    
    );
}

export default visiter_page;