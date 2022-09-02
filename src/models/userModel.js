const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
    fname: {
       type: String,
       default:'Guest'
      },
    lname: {
       type: String,
      },
    email: {
       type: String
      },
  
    phone: {
       type: Number
      },
    device:{
        type:String,
        required:true
    },
    location:{
        type:String
    },

    isDeleted:{
        type:Boolean,
        default:false
    }
   
  },
  { timestamps: true })

module.exports = mongoose.model('user',userSchema)