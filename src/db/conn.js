const mongoose = require('mongoose');

mongoose.connect("mongodb://localhost:27017/userdata" , {
    useNewUrlParser:true,
    useUnifiedTopology:true
})
.then(()=>{
    console.log('Database connection successful');
})
.catch((e)=>{
    console.log(e);
})