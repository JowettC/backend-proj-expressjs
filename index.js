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
// read
app.get('/api/courses',(req,res) =>{
    // get data from database and send object instead
    res.send(courses);
});
// read
app.get('/api/courses/:id',(req,res) =>{
    // get data from database and send object instead
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found') //404 if dont exist
    res.send(course);
});
// create
app.post('/api/courses',(req,res)=>{
    // validation
    const {error} = validateCourse(req.body);
    if(error) return res.status(404).send(error.details[0].message)

    const course = {
        id: courses.length+1,
        name: req.body.name
    };
    courses.push(course);
    res.send(course);
});
// update
app.put('/api/courses/:id',(req,res)=>{
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found') //404 if dont exist
    // validing

    const {error} = validateCourse(req.body);
    if(error) return res.status(404).send(error.details[0].message)
        
    
    course.name = req.body.name;
    res.send(course);

})

app.delete('/api/courses/:id', (req,res) => {
    const course = courses.find(c => c.id === parseInt(req.params.id));
    if (!course) return res.status(404).send('The course with the given id was not found') //404 if dont exist
    const index = courses.indexOf(course);
    courses.splice(index,1)

    res.send(course)
})
function validateCourse(course){
    const schema =Joi.object({
        name: Joi.string().min(3).required()
    });

    return (schema.validate(course));
}

// PORT (envrioment variable)
const port = process.env.PORT || 3000
app.listen(port, () => console.log(`listening on port ${port}...`))

// app.get()
// app.post()
// app.put()
// app.delete()