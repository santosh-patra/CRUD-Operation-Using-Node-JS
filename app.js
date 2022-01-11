const express = require('express');
const app = express();
const mongoose  = require('mongoose');
const userSchema = require('./Schema/userSchema');
const bodyParser = require('body-parser');
let url = "Enter Your Mongo URL"; 
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Get All user from DB
app.get('/getAllUser',(req,res)=>{
    userSchema.find()
    .then(result=>{
        res.status(200).json({
            Result: result
        })
    })
    .catch()
})
// Post a new User
app.post('/postUser',(req,res)=>{
    var userId = req.body.userId;
    var userName = req.body.userName;
    var password = req.body.password;
    var newUser = new userSchema({
        userId:userId,
        userName:userName,
        password:password
    })
    newUser.save()
    .then(result=>{
        console.log("User Created Successfully");
        res.status(201).json({
            Message:"A new User Created Successfully"
        })
    })
    .catch()
})
// get a user by ID
app.get('/getuser/:id',(req,res)=>{
    let id = req.params.id;
    userSchema.find({userId:id})
    .then(result=>{
        res.status(200).json({
            Result: result
        })
    })
    .catch()
})
// Delete a user by ID
app.post('/deleteUser/:id',(req,res)=>{
    let id = req.params.id;
    userSchema.findOne({userId:id}).
    then(result=>{
        if(result == null){
            console.log("No Record Found")
            res.status(404).json({
                Message:"No Record Found"
            })
        }
        else{
            userSchema.deleteOne({userId:id})
            .then(results=>{
                res.status(200).json({
                    Message:"User Deleted Successfully"
                })    
            })
            .catch()
        }
    })
    .catch()
})
// Delete all User
app.post('/deleteAllUser',(req,res)=>{
    userSchema.find().
    then(result=>{
        if(result == null){
            console.log("No Record Found")
            res.status(404).json({
                Message:"No Record Found"
            })
        }
        else{
            userSchema.deleteMany()
            .then(results=>{
                res.status(200).json({
                    Message:"All User Deleted Successfully"
                })    
            })
            .catch()
        }
    })
    .catch()
})

mongoose.connect(url)
.then(res =>{
    console.log("DB Connected");
    app.listen(3000,()=>{
        console.log("Server running on port 3000");
    })
})
.catch()