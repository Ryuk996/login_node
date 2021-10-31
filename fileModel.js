const mongoose = require('mongoose')


const fileSchema = new mongoose.Schema({
    fileName: {
        type: String
    },
    fileUrl: {
        type: String
    },
    ext: {
        type: String
    },
    fileId: {
        type: String
    },
}, {
    timestamps: true
})

// const Users = mongoose.model("Users", userSchema, 'accounts');
// module.exports = Users

module.exports = mongoose.model("Files", fileSchema, 'drive');