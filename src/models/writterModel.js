const mongoose = require("mongoose");

const writterSchema = new mongoose.Schema(
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
    category:[],
    address: {
        street: { type: String, required: true },
        city: { type: String, required: true },
        pincode: { type: Number, required: true },
        country:{ type: Number, required: true },
    },
    isVerify:{
        type:Boolean,
        default:false
    },
    isDeleted:{
        type:Boolean,
        default:false
    },
    Token:{
        trype:String,
        default:''
    }
  },
  { timestamps: true })

module.exports = mongoose.model('Writter',writterSchema)