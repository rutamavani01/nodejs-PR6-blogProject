const formModel = require('../models/formModel');
const fs = require('fs');


const order = (req, res)=>{
    return res.render('order');
}

const addRecord = async(req, res)=>{
    try {
        let imagename = '';
        if(req.file){
            imagename=req.file.path
        }
        let InsertRecord = await formModel.create({
            title : req.body.title,
            desc : req.body.desc,
            image : imagename
        })
        return res.redirect('/table');
    } catch (error) {
        console.log(error);
        return false;
    }
}

const table =async(req,res) => {
try {
    let viewUser = await formModel.find({})
    return res.render('table',{
        record : viewUser
    })
} catch (error) {
    console.log(error);
    return false;
}
}

const deleteRecord = async(req,res) => {
    try {
        let DeleteData = await formModel.findByIdAndDelete(req.query.deleteId);
        console.log("deleted");
        return res.redirect('back');
    } catch (error) {
        console.log(error);
        return false;
    }
}
const editRecord = async(req,res) => {
     try {
        let editData = await formModel.findById(req.query.editId);
        console.log(editData);
        return res.render('edit',{
            single : editData
        })
     } catch (error) {
        console.log(error);
        return false;
     }
}

const updateRecord = async(req,res) => {
    if(req.file){
        try {
            let oldImage = await formModel.findById(req.body.editid);
            fs.unlinkSync(oldImage.image);
        } catch (error) {
            console.log(error);
            return false;
        }

        try {
            let editData = await formModel.findByIdAndUpdate(req.body.editid,{
                title: req.body.title,
                desc : req.body.desc,
                image : req.file.path
            })
            console.log("Record Edited!");
            return res.redirect('/table');
        } catch (error) {
            console.log(error);
            return false;
        }

    }else{
         try {
            let editData = await formModel.findById(req.body.editid);
            let updateData = await formModel.findByIdAndUpdate(req.body.editid,{
                title: req.body.title,
                desc : req.body.desc,
                image : editData.image
            })
            console.log("Record Edited!");
            return res.redirect('/table');
        } catch (error) {
            console.log(error);
            return false;
        }
    }
}

module.exports = {
     order , addRecord , table , deleteRecord , editRecord , updateRecord
}