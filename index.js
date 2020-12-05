const express = require('express');
const app = express();
// joi is for validation
const Joi = require('joi');

// middleware??
app.use(express.json());

const courses =[
    {
        id:1 , name:'courses1'
    },
    {
        id:2 , name:'courses2'
    },
    {
        id:3 , name:'courses3'
    },
]

app.get('/',(req,res) =>{
    res.send('Hello World!!!');

});
app.get('/api/courses',(req,res) =>{
    // get data from database and send object instead
    res.send(courses);
});

app.get('/api/courses/:id',(req,res) =>{
    // get data from database and send object instead
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) res.status(404).send('The course with the given id was not found') //404 if dont exist
    res.send(course);
});

app.post('/api/courses',(req,res)=>{
    // validation
    const schema =Joi.object({
        name: Joi.string().min(3).required()
    });
    const result = schema.validate(req.body);
    // console.log(result)

    if(result.error){
        // 404 bad request
        res.status(404).send(result.error.details[0].message)
        return;
    }

    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});

// PORT (envrioment variable)
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}...`))

// app.get()
// app.post()
// app.put()
// app.delete()