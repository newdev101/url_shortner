const mongoose =require('mongoose');

//defining schema
const userSchema = new mongoose.Schema({
     name:{
          type: String,
          required:true,
     },
     email:{
          type: String,
          required:true,
          unique:true,
     },
     
     password:{
          type: String,
          required:true,
     },
},
{ timestamps:true }
);

//creating model
const User = mongoose.model("user",userSchema);

module.exports = User;