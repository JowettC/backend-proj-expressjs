const express = require('express'); 
const app = express();

app.get('/',(req,res)=>{
    res.end("Hello, World!");

});

app.get('/h',(req,res)=>{
    res.end("Hello, World!");

});

app.listen(8000, () => console.log('listening on port 8000'))