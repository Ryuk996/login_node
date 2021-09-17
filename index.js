const express= require('express')
const app = express();
require('dotenv').config()
const cors = require('cors')
const mongodb = require('mongodb');
const mongoose = require('mongoose')
// const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: "*"
  }))
  app.use(express.json())

  // Routes
app.use('/user', require('./Routes/userRoutes'))

  // Connect to mongodb
const URL = process.env.MongoDb_url
mongoose.connect(URL, {
    // useCreateIndex: true,
    // useFindAndModify: false
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})

app.use('http://localhost:3000/login',(req,res,next) => {
    res.json({msg:"hello all"})
}) 
  app.listen(process.env.PORT || 3001,function(){
    console.log('The app is listening in port 3001')
})