const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const validator = require("validator");


const studentSchema = new Schema({

   name:{
      type : String,
      required : true,
      minlength : 4,
       
   },

   email:{
       type : String,
       required :true,
       unique : [true, "Email already exist"],
       validate(value) {
           if(!validator.isEmail(value)){
               throw new Error("Invalid email try again")
           }
       }
   },


    age:{
      type : Number,
      min : 7,
      max : 12,

   },

   phone:{
      type : Number,
      required : true,
      minlength : 11,
      unique : [true, "phone number already exist"]
   },

   address:{
       type : String,
       required : true
   },
});

const Student = new mongoose.model("Student" , studentSchema)

module.exports = Student
