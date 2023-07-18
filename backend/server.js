// imports and requirements //
const express = require('express');
const fs = require('fs');
const knex = require('knex')(require('../backend/knexfile')['development']);
// global variables //
const app = express()
const port = 3001


// main function calls //
app.get('/',(request, response)=>{
    response.send("Hello World")
})
app.get('/users',(request, response)=>{
    knex('user').select('*').from('users')
        .then((user)=>{
            response.send(user);
        })
})
app.get('/items',(request, response)=>{
    knex.select('*').from('items')
        .then((item)=>{
            response.send(item);
        })
})




app.listen(port,()=>{
    console.log('listenting on port 3001', port)
})
