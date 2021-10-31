const express= require('express')
const app = express();
require('dotenv').config()
const cors = require('cors')
const mongodb = require('mongodb');
const mongoose = require('mongoose')

// const PORT = process.env.PORT || 3001;

const fs = require('fs')
const util = require('util')
const unlinkFile = util.promisify(fs.unlink)

const multer = require('multer')
// const upload = multer({ dest: 'uploads/' })                            ***
// const { uploadFile,getFileStream } = require('./Drive/s3bucket')       ***

  //Middleware  
app.use(cors({
    origin: "*" 
  }))
  app.use(express.json())

  // Routes
app.use('/user', require('./Routes/userRoutes'))
app.use('/file', require('./Routes/s3Routes'))

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

  //S3_BUCKET                                           ****
  // app.get('/images/:key',(req,res) => {
  //   console.log(req.params)
  //   const key = req.params.key
  //   const readStream = getFileStream(key)
  //   readStream.pipe(res)
  // })

  // app.post('/images', upload.single('image'), async (req, res) => {
  //   const file = req.file
  //   console.log(file)
  //   const result = await uploadFile(file)
  //    await unlinkFile(file.path)
  //   console.log(result.key)
  //   const fileKey = result.key;
  //   console.log(fileKey)
  //   const description = req.body.description
  //   res.send({imagePath:{fileKey}})

  //   // res.send("DONE")
  // })
    // const file = req.file
    // console.log(file)                                       ****

    //////////////////********NEW********//////////////////////
  //   const AWS = require('aws-sdk')
  //   const { v4: uuidv4 } = require('uuid');
  //   const path = require('path');

  //   const bucketName = process.env.AWS_BUCKET_NAME
  //   const region = process.env.AWS_BUCKET_REGION
  //   const accessKeyId = process.env.AWS_ACCESS_KEY
  //   const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

  // const s3 = new AWS.S3({
  //   region,
  //   accessKeyId,
  //   secretAccessKey
  // })
    // const storage = () =>{ multer({
    //   storage : multer({
    //     s3,
    //     Bucket : bucketName,
    //     metadata : function(req,file,callback){
    //       callback(null,{filedName : file.fieldname})
    //     },
    //     key : function(req,file,callback){
    //       callback(null,`${uuidv4()}.${fileType}`)
    //     }
    //   })
    // })

    // }
  //   const storage = multer.memoryStorage({
  //     destination: function(req, file, callback) {
  //         callback(null, '')
  //     }
  // })
  // const upload = multer({storage}).single('image')

  // app.post('/upload',upload,(req, res) => {
  //   // const file = req.file
  //   //  console.log(file)
  //   let myFile = req.file.originalname.split(".")
  //   const fileType = myFile[myFile.length - 1]

  //   const params = {
  //       Bucket: bucketName,
  //       Key: `${uuidv4()}.${fileType}`,
  //       FileType :`${fileType}`,
  //       Body: req.file.buffer
  //   }
  //   s3.upload(params, (error, data) => {
  //     if(error){  
  //         res.status(500).send(error)
  //     }
  //     console.log(data.key)                                // getting the filename from AWS
  //     const type = data.key;
  //     const ext = path.extname(req.file.originalname).slice(1)     // getting the extension of file
  //     console.log(ext)
  //     console.log(req.file)
  //     res.status(200).send(data)                         // uploading the file to AWS
  // }) 
  // })
    /////////////////*********NEW*******////////////////////// 

app.use('http://localhost:3000/login',(req,res,next) => {
    res.json({msg:"hello all"})
}) 
  app.listen(process.env.PORT || 3005,function(){
    console.log('The app is listening in port 3005')
})