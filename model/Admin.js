const mongoose = require('mongoose');
const multer = require('multer');

const imagePath = "/uploads/admins";

const path = require('path');

const AdminSchema = mongoose.Schema({
    title : {
        type : String,
        require : true
    },
    isbn : {
        type : String,
        require : true
    },
    author : {
        type : String,
        require : true
    },
    publisher :{
        type : String,
        require : true
    },
    quantity :{
        type : String,
        require : true
    },
    total_page :{
        type : String,
        require : true
    },
    book_type : {
        type : Array,
        require : true
    },
    rating : {
        type : String,
        require : true
    },
    published_date : {
        type : String,
        require : true
    },
    images : {
        type : String,
        require : true
    } 
})

const storage = multer.diskStorage({
    destination : function(req,file,cb){
        cb(null,path.join(__dirname,"..",imagePath))
    },
    filename : function(req,file,cb){
        cb(null,file.fieldname+'-'+Date.now());
    }
})

AdminSchema.statics.uploadedFile = multer({storage : storage}).single('image');
AdminSchema.statics.avtarimg = imagePath;

const Admin = mongoose.model('Admin',AdminSchema);

module.exports = Admin;