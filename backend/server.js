// imports and requirements //
const express = require('express');
const fs = require('fs');
const knex = require('knex')(require('../backend/knexfile')['development']);
// global variables //
const app = express()
const port = 3001


// main function calls //
app.use(express.json());


app.get('/',(request, response)=>{
    response.send("Hello World")
})
app.get('/users',(request, response)=>{
    knex('user').select('*').from('users')
        .then((user)=>{
            response.send(user);
        })
        .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})
app.post('/users',(request, response)=>{
    // console.log('TEST: ', request.body)
    const testData = request.body;
    console.log(testData);
    knex('users').insert(testData)
        .then(()=>{
            response.status(200).json({testData});
    })
    .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})




// app.put(('/users', (request, response)=>{
//     knex.('users').where('id', request.params.id).update({})
// }))



app.get('/items',(request, response)=>{
    knex.select('*').from('items')
        .then((item)=>{
            response.send(item);
        })
        .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})
app.post('/items',(request, response)=>{
    // console.log('TEST: ', request.body)
    const testData = request.body;
    console.log(testData);
    knex('items').insert(testData)
        .then(()=>{
            response.status(200).json({testData});
    })
    .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})



app.listen(port,()=>{
    console.log('listenting on port 3001', port)
})
