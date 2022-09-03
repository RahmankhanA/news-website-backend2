const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema(
  {
    fname: {
       type: String,
       required: true 
      },
    lname: {
       type: String,
       required: true 
      },
    email: {
       type: String,
       required: true, 
       unique: true 
      },
  
    phone: {
       type: Number, 
       required: true, 
       unique: true 
      },
    password: {
       type: String,
       required: true
      }, // encrypted password
      address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: Number, required: true }
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    }
  },
  { timestamps: true })

module.exports = mongoose.model('Admin',adminSchema)