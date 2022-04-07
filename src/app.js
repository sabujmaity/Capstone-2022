const express=require('express');
const app=express();
const path = require('path');
const port = process.env.PORT || 8000;
require("./db/conn");
const Register = require('./models/register');
const public_static_path = path.join(__dirname , '../public');

app.set('view engine' , 'hbs');

app.use(express.static(public_static_path));
app.use(express.json());
app.use(express.urlencoded({extended:false}));



app.get('',(req,res) => {
    res.render('index')
});
app.get('/worldMap',(req,res)=>{
    res.render('worldMap')
});
app.get('/register', (req,res)=>{
    res.render('register')
});

app.post('/register' , async (req,res)=>{
    try{
        const password = req.body.password;
        const cpassword = req.body.confirmpassword;
        const email = req.body.email;
        const useremail = await Register.findOne({email:email});
        res.send(useremail);
        console.log(useremail);
        if(password ===  cpassword){
            const newuser = new Register({
                name : req.body.name,
                email: req.body.email,
                password: password,
                confirmpassword: cpassword
            });
            const registered = await newuser.save();
            res.status(201).render('index');
        }
        else{
            res.send('passwords not matching')
        }
    }
    catch(error){
        res.status(400).send(error);
    }
});

app.get('*',(req , res)=>{
    res.send('OOPS! 404 error page')
});

app.listen(port , ()=>{
    console.log(`Listening to port no ${port}`)
});