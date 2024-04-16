const express = require('express')
const path = require("path")
const app = express()
const multer = require("multer")


PORT = 5000

// const upload = multer({dest: "./uploads"})  // this is instances of multer but there wont be full control

// making storage to upload the file
const storage = multer.diskStorage({
    destination: function(req,file,cb){
        return cb(null,"./uploads");
    },
    filename:function(req,file,cb){
        return cb(null,`${Date.now()}-${file.originalname}`)
    }
})

const upload = multer({storage})  //upload object


app.set("view engine", "ejs")
app.set("views", path.resolve("./views"))

app.use(express.json())
app.use(express.urlencoded({extended:false}))  // it is use to parse the form data from the frontend data

app.get('/',(req,res)=>{
    return res.render("homepage")
})

app.post("/upload",upload.single('profileImage'),(req,res)=>{    //we used single cause 
    console.log(req.body)
    console.log(req.file)

    return res.redirect("/");
})

app.listen(PORT,(err)=>{
    if(err){
        console.log(err)
    }
    console.log(`Server is running on the port ${PORT}`)
})