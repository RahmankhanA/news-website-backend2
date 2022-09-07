const mongoose = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId

const ArticalseSchema = new mongoose.Schema(
  {

    subject:{ type: String },
    news: { type: String },
    like: { type: Number, default: 0 },
    disLike:{ type: Number, default: 0 },
    comments:[{
      userId:{type:ObjectId,ref:'user'},
      user:{type:String,default:"guest"},
      text:{type:String},
      like: { type: Number, default: 0 },
      disLike:{ type: Number, default: 0 }
    }],
    langause: { type: String },
    country: { type: String },
    category: { type: String },
    isPublished: { type: Boolean, default: false },

    Writter: {
      type: ObjectId,
      ref: 'Writter',
      required: true
    },
    isDeleted:{
      type:Boolean,
      defoult:false
    }

  }, { timestamps: true });

module.exports = mongoose.model('Artical', ArticalseSchema);