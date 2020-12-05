const express = require('express');
const app = express();

app.get('/',(req,res)=> res.end('Homepage'));
app.get('/about',(req,res)=> res.end('About Us'));
app.get('/services',(req,res)=> res.end('Services'));
app.get('/help',(req,res)=> res.end('Help'));

app.listen(8010, () => console.log("Listening on port 8000"))
