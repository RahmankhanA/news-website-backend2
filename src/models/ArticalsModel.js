const mongoose = require("mongoose");
const ObjectId=mongoose.Schema.Types.ObjectId

const ArticalseSchema = new mongoose.Schema(
  {
      Artical: {
        subject:{type:String},
        news:{type:String},
        like:{type:Number,default:0},
        comments:{type:String},
        langause:{type:String},
        country:{type:String},
        category:{type:String},
        isPublished:{type:Boolean,default:false}
      },
      Writter: {
        type:ObjectId,
        ref :'Writter',
        required:true
    }
  },
  { timestamps: true })

module.exports = mongoose.model('Artical',ArticalseSchema)