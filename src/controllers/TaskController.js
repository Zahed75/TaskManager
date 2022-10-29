const TaskModel = require("../models/TaskModel");
const e = require("express");


//Task Create

exports.createTask = (req, res) => {
    let reqBody = req.body;
    reqBody.email = req.headers['email'];
    TaskModel.create(reqBody, (err, data) => {
        if (err) {
            res.status(400).json({status: "Failed", data: err})

        } else {
            res.status(200).json({status: "Task Created!", data: data})
        }
    })
}

//Task Delete

exports.deleteTask = (req, res) => {
    let id = req.params.id;
    let Query = {_id: id};
    TaskModel.remove(Query, (err, data) => {
        if (err) {
            res.status(400).json({status: "Something Wrong", data: err})
        } else {
            res.status(200).json({status: "Task Removed", data: data})
        }
    })
}


// Task Updated

exports.taskUpdate = (req, res) => {
    let id = req.params.id;
    let status = req.params.status;
    let Query = {_id: id};
    let reqBody = {status: status};
    TaskModel.updateOne(Query, reqBody, (err, data) => {
        if (err) {
            res.status(400).json({status: "Something Wrong", data: err})
        } else {
            res.status(200).json({status: "Task Updated", data: data})
        }
    })
}

// ListByTask Status

exports.listTaskByStatus=(req,res)=>{
    let status= req.params.status;
    let email=req.headers['email'];
    TaskModel.aggregate([
        {$match:{status:status,email:email}},
        {$project:{
                _id:1,title:1,description:1, status:1,
                createdDate:{
                    $dateToString:{
                        date:"$createdDate",
                        format:"%d-%m-%Y"
                    }
                }
            }}
    ], (err,data)=>{
        if(err){
            res.status(400).json({status:"fail",data:err})
        }
        else{
            res.status(200).json({status:"success",data:data})
        }
    })
}
