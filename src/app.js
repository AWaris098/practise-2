const express = require("express");
const Student = require("./models/students")
const app = express()
require("./db/mongoose")


const port = process.env.PORT || 3000;
app.use(express.json())


// POST OR CREAT DOCUMENT 
app.post("/students",async(req, res) => {
    const student =  new Student(req.body)
    
    try{
        const studentCreated = await student.save()
         res.status(200).json(studentCreated)
    }catch(e){
        if(e.code==11000){
           return res.status(500).json({message: "Email already exist"});
        }
         res.status(400).json(e)
    }
});


// GET DOCUMENT
app.get("/students", async (req, res) => {
    const student = await Student.find({})
    try{
        res.status(200).json({student})
    }catch(e){
        res.status(400).json({e})
    }
});

// GET DOCUMENT BY HIS ID

app.get("/students/:id", async (req, res) => {
    const _id = req.params.id
     try{
        const student = await Student.findById({_id})
        if(!student){
          return  res.status(404).json({message : "Id did not match database"})
        }
        res.json({student})
     }catch(e){
        res.status(400).json({e})
     }
});

// PATCH OR UPDATE DOCUMENT BY THEIR ID

app.patch("/students/:id", async (req, res) => {
    const updates = Object.keys(req.body);
    const allowedUpdates = ['name','email','age','phone','address']
    const isValidateOperation = updates.every((update) => 
    allowedUpdates.includes(update))

     if(!isValidateOperation){
        return res.status(404).json({Error: "Invalid updates"})
     }

    try{
         const student = await Student.findByIdAndUpdate(req.params.id, req.body,{
             new : true,
             isValidators : true
         })
         res.json({student})
    }
    catch(e){
            res.status(400).json(e)
                    
    }
});

app.delete("/students/:id", async(req, res) => {
    const _id = req.params.id
    try{
        const student = await Student.findByIdAndDelete({_id})
        if(!student){
          return  res.status(404).json({Erro : "Try another id "})
        }
        res.json({student})
    }catch(e){
         res.json({e})
    }
})

app.listen(port, () => {
    console.log("port running up on " +port)
})
