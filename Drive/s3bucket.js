const AWS = require('aws-sdk')
require('dotenv').config()
const { v4: uuidv4 } = require('uuid');
const multer = require('multer')
const multerS3 = require('multer-s3')
const path = require('path');
const Files = require("../fileModel");
const Images = require("../userModel")



const bucketName = process.env.AWS_BUCKET_NAME
const region = process.env.AWS_BUCKET_REGION
const accessKeyId = process.env.AWS_ACCESS_KEY
const secretAccessKey = process.env.AWS_SECRET_ACCESS_KEY

const s3 = new AWS.S3({
  region,
  accessKeyId,
  secretAccessKey
})

const upload = (bucketName) => multer({
  storage: multerS3({
    s3,
    bucket: bucketName,
    // acl : 'public-read',
    metadata: function (req, file, callback) {
      callback(null, { fieldName: file.fieldname })
    },
    key: function (req, file, callback) {
      const ext = path.extname(file.originalname).slice(1)
      callback(null, `${file.originalname}-${Date.now()}.${ext}`)
    },
    fileType: function (req, file, callback) {
      const ext = path.extname(file.originalname).slice(1)
      callback(null, `${ext}`)
    }
  })
})

// uploads a file to s3
const s3Module = {
  uploadFile: (req, res, next) => {

    const uploadSingle = upload(bucketName).single(
      "image"
    );

    uploadSingle(req, res, async (err) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });

      req.body.fileId = req.userid.id;
      const fileData = await Files.create({ fileName: req.file.key, fileUrl: req.file.location, ext: req.file.mimetype, fileId: req.userid.id })


      res.status(200).json({ data: req.file });
    });
  },

  uploadImage: (req, res, next) => {

    const uploadSingle = upload(bucketName).single(
      "file"
    );

    uploadSingle(req, res, async (err) => {
      if (err)
        return res.status(400).json({ success: false, message: err.message });
      console.log(req.file)
      res.status(200).json({ url: req.file.location });
    });
  },

  getFile: async (req, res) => {
    try {
      const data = await Files.find({ fileId: req.userid.id })
      res.json(data)
    } catch (error) {
      console.log(error)
      res.status(500).json({
        message: "something went wrong"
      })
    }
  },

  getonSearch: async (req, res) => {
    try {
      const { search } = req.body;
      if (!search)
        return res.status(400).json({ msg: "Please fill in all fields." })
      var regex = new RegExp(search, 'i')
      const data = await Files.find({ $and: [{ fileId: req.userid.id }, { $or: [{ ext: regex }, { fileName: regex }] }] });
      res.json(data)
    } catch (error) {
      res.status(500).json({
        message: "something went wrong"
      })
    }
  },

  getDoc: async (req, res) => {
    try {
      const data = await Files.find({ $and: [{ fileId: req.userid.id }, { $or: [{ ext: "text/plain" }, { ext: "application/msword" }, { ext: "application/pdf" }, { ext: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" }] }] });

      res.json(data)
    } catch (error) {
      res.status(500).json({
        message: "something went wrong"
      })

    }
  },

  getMedia: async (req, res) => {
    try {
      const data = await Files.find({ $and: [{ fileId: req.userid.id }, { $or: [{ ext: "audio/mpeg" }, { ext: "video/mp4" }] }] });

      res.json(data)
    } catch (error) {
      res.status(500).json({
        message: "something went wrong"
      })

    }
  },
  
  getPic: async (req, res) => {
    try {
      const data = await Files.find({ $and: [{ fileId: req.userid.id }, { $or: [{ ext: "image/jpeg" }, { ext: "image/png" }, { ext: "image/svg+xml" }] }] });

      res.json(data)
    } catch (error) {
      res.status(500).json({
        message: "something went wrong"
      })

    }
  }

}

module.exports = s3Module

