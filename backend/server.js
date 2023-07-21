// imports and requirements //
const express = require('express');
const fs = require('fs');
const knex = require('knex')(require('../backend/knexfile')['development']);
const cors = require('cors');
// global variables //
const app = express()
const port = 3001


// main function calls //
app.use(express.json());
app.use(cors())

//////// users//////////////////////
app.get('/',(request, response)=>{
    response.send("Hello World")
})
app.get('/users',(request, response)=>{
    knex.select('*').from('users')
        .then((user)=>{
            response.send(user);
        })
        .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})
app.get('/users/:id',(request, response)=>{
    knex.select('*').from('users').where('id', request.params.id)
        .then((item)=>{
            response.send(item);
        })
        .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})
app.post('/users',(request, response)=>{
    // console.log('TEST: ', request.body)
    const testData = request.body;
    console.log("TESTDATA",testData)
    knex('users').insert(testData)
        .then(()=>{
            console.log("KNEXPROMISE", testData)
            response.status(200).json({testData});
    })
    .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})
app.put('/users/:id',(request, response)=>{
    knex('users').where('id', request.params.id).update({
        first_name: request.body.first_name,
        last_name: request.body.last_name,
        user_name: request.body.user_name,
        user_password: request.body.user_password
    }).then(()=>{
        knex.select().from('items')
        .then((items)=>{
            response.send(item)
        })
        .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
    })
  
})

app.delete('/users/:id', (request, response)=>{
    knex('users').where('id', request.params.id)
    .delete().then((items)=>{
        response.send(items)
    }).catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})
//////////////////////////items after this point//////////////////


app.get('/items',(request, response)=>{
    knex.select('*').from('items')
        .then((item)=>{
            response.send(item);
        })
        .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})
app.get('/items/:id',(request, response)=>{
    knex.select('*').from('items').where('id', request.params.id)
        .then((item)=>{
            response.send(item);
        })
        .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})
app.get('/users_items/:user_id',(request, response)=>{
    knex.select('*').from('items').where('user_id', request.params.user_id)
        .then((item)=>{
            response.send(item);
        })
        .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})

app.post('/items',(request, response)=>{
    // console.log('TEST: ', request.body)
    const testData = request.body;
    console.log("TESTDATA",testData)
    knex('items').insert(testData)
        .then(()=>{
            response.status(200).json({testData});
    })
    .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})
app.put('/items/:id',(request, response)=>{
    const testData = request.body;
    console.log("TESTDATA",testData)
    knex('items').where('id', request.params.id).update({
        user_name: request.body.user_name,
        flavor_text: request.body.flavor_text,
        quantity: request.body.quantity
    }).then(()=>{
        knex.select().from('items')
        .then((items)=>{
            response.send(item)
        })
        .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
    })
  
})
app.delete('/items/:id', (request, response)=>{
    knex('items').where('id', request.params.id)
    .delete().then((items)=>{
        response.send(items)
    })
    .catch(error=>response.status(404).json({message: 'this should work MAYBE'}));
})



app.listen(port,()=>{
    console.log('listenting on port 3001', port)
})
