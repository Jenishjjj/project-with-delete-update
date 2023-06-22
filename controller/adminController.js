const fs = require('fs');
const Admin = require('../model/Admin');
const path = require('path')

module.exports.home = (req,res)=>{
    return res.render('home')
}

module.exports.bookDetail = (req,res)=>{
    var images = ""
    if(req.file.filename){
        images=Admin.avtarimg+"/"+req.file.filename;
    }
    req.body.images=images
    Admin.create(req.body)
    .then(function(data){
        return res.redirect('/');
    })
    .catch(function(err){
        console.log(err);
    })
}

module.exports.viewData = (req,res)=>{
    Admin.find({})
    .then(function(response){
        return res.render('viewdata',{
            'bookData' : response
        })
    })
    .catch(function(err){
        if(err){
            console.log(err);
        }
    })
}

module.exports.deleteRec = (req,res)=>{
    Admin.findByIdAndDelete(req.params.id)
    .then((oldrec)=>{
        imgPath = path.join(__dirname,'..',oldrec.images)
        if(imgPath){
            fs.unlinkSync(imgPath);
        }
        Admin.findByIdAndDelete(req.params.id)
        .then((delRec)=>{
            return res.redirect("/viewData");
        })
        .catch((err)=>{
            console.log(err);
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports.updateRec = (req,res)=>{
    Admin.findById(req.query.id)
    .then(function(record){
        return res.render('update_view',{
            'singleAdmin' : record
        })
    })
    .catch((err)=>{
        console.log(err);
    })
}

module.exports.EditRec = (req,res)=>{
    var AdminId = req.body.EditId;
    // console.log(req.body);
    // console.log(req.file);
    if(req.file){
        Admin.findById(AdminId)
        .then((oldRec)=>{
            var imgPath = path.join(__dirname,'..',oldRec.images);
            if(imgPath){
                fs.unlinkSync(imgPath);
            }
            
            var newPath = Admin.avtarimg+"/"+req.file.filename;
            req.body.images = newPath;

            Admin.findByIdAndUpdate(AdminId,req.body)
            .then((upRec)=>{
                return res.redirect("/viewData");
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
    else{
        Admin.findById(AdminId)
        .then((oldRec)=>{
            req.body.images = oldRec.images;
            Admin.findByIdAndUpdate(AdminId,req.body.images)
            .then((updatedRec)=>{
                return res.redirect("/viewData");
            })
            .catch((err)=>{
                console.log(err);
            })
        })
        .catch((err)=>{
            console.log(err);
        })
    }
}