// imports and requirements //
const express = require('express');
const fs = require('fs');
const knex = require('knex');
// global variables //
const app = express()
const port = 3001


// main function calls //
app.get('/',(request, response)=>{
    response.send("Hello World")
})
app.get('')





app.listen(port,()=>{
    console.log('listenting on port 3001', port)
})
