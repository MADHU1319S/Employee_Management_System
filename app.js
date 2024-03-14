const express=require('express');
const authRouter = require('./Router/authRouter');
const bodyParser = require('body-parser');
const app = express();
const multer = require('multer');
const empRouter = require('./Router/empRouter');

const storage=multer.diskStorage({
    destination : function (req,file,cb){
        cb(null,'./upload')
    },
    filename: function (req,file,cb){
        cb(null,Date.now() + '-' + file.originalname);

    }   
})
const upload=multer({storage:storage}) 

app.use(upload.any())

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json());

app.use('/auth',authRouter)
app.use('/employee',empRouter)

app.listen(1359,()=>{
    console.log(' 1359 running server')
})