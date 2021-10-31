const express= require('express')
const router = express();


const s3Module = require('../Drive/s3bucket')
const auth = require("../Authentication/authenticate")
const uploadPic = require('../UploadPropic/UploadProfpic')



router.post('/upload',auth, s3Module.uploadFile)

router.get('/getfile',auth, s3Module.getFile)

router.post('/search',auth, s3Module.getonSearch)

router.get('/getdoc',auth, s3Module.getDoc)   

router.get('/getmedia',auth, s3Module.getMedia)

router.get('/getpic',auth, s3Module.getPic)

router.post('/uploadProfpic', s3Module.uploadImage) 




module.exports= router  