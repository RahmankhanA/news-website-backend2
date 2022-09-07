const { model } = require('mongoose');
const articalModel=require('../models/ArticalsModel');
const writterModel=require('../models/writterModel');
const Validator = require("../Validator/valid");

const createArtical=async (req,res)=>{
    try{
        let data=req.body
        const {subject,news,comments,langause,like,country,category,isPublished,writter}=data
        if (!Validator.isValid(subject)) return res.status(400).send({ status: false, message: "subject is Required" });
        if (!Validator.isValidString(subject)) return res.status(400).send({ status: false, message: "subject must be alphabate"});
        if (!Validator.isValid(news)) return res.status(400).send({ status: false, message: "news is Required" });

        if (!Validator.isValid(langause)) return res.status(400).send({ status: false, message: "langause is Required" });
        if (!Validator.isValidString(langause)) return res.status(400).send({ status: false, message: "langause must be alphabate"});
        if (!Validator.isValid(country)) return res.status(400).send({ status: false, message: "country is Required" });
        if (!Validator.isValidString(country)) return res.status(400).send({ status: false, message: "country must be alphabate"});
        if (!Validator.isValid(category)) return res.status(400).send({ status: false, message: "category is Required" });
        if (!Validator.isValidString(category)) return res.status(400).send({ status: false, message: "category must be alphabate"});
        if (!Validator.isValid(writter)) return res.status(400).send({ status: false, message: "writter id is Required" });

        if (!Validator.isValidObjectId(writter)) return res.status(400).send({ status: false, message: "writter id is not valid"});

        let writterid= await writterModel.findById(writter);

        if(!writterid) return res.status(404).send({status:false,message: 'no writter exicts'})


       
        let artical= await articalModel.create(data);
        return res.status(201).send({status:true,msg:artical});

    }catch(err){
        return res.status(500).send({ status: false, message: err.message });
    }
}

const updateArtical=async (res,req)=>{
    try{
        let data=req.body
        let articalId=req.params.articalId
        const {subject,news,comments,langause,like,country,category,isPublished,writter}=data
        const obj={}
        if(subject){
        if (!Validator.isValid(subject)) return res.status(400).send({ status: false, message: "subject is Required" });
            obj['subject']=subject;
        }
        if(news){
        if (!Validator.isValid(news)) return res.status(400).send({ status: false, message: "news is Required" });
            obj['news']=news
         }
         if(langause){
             if (!Validator.isValid(langause)) return res.status(400).send({ status: false, message: "langause is Required" });
             if (!Validator.isValidString(langause)) return res.status(400).send({ status: false, message: "langause must be alphabate"});
             obj['langause']=langause
        }
        if(country){
         if (!Validator.isValid(country)) return res.status(400).send({ status: false, message: "country is Required" });
         if (!Validator.isValidString(country)) return res.status(400).send({ status: false, message: "country must be alphabate"});
         obj['country']=country
        }
        if(category){
         if (!Validator.isValid(category)) return res.status(400).send({ status: false, message: "category is Required" });
         if (!Validator.isValidString(category)) return res.status(400).send({ status: false, message: "category must be alphabate"});
         obj['category']=category
        }
        if(writter){
            if (!Validator.isValid(writter)) return res.status(400).send({ status: false, message: "writter id is Required" });
            if (!Validator.isValidObjectId(writter)) return res.status(400).send({ status: false, message: "writter id is not valid"});
            let writterid= await writterModel.findById(writter);
            if(!writterid) return res.status(404).send({status:false,message: 'no writter exicts'})
            obj['writter']=writter
        }
        if(isPublished){
            if(isPublished!='false'||isPublished!='true')  return res.status(400).send({status:false,message: 'isPublished must be boolean'})
            obj['isPublished']=isPublished
        }

        let artical= await articalModel.findByIdAndUpdate(articalId,{isDeleted:false},{$set:obj},{new:true});
        return res.status(201).send({status:true,msg:artical});
    }catch(err){
        return res.status(500).send({ status: false, message: err.message });
    }
}

const getAllartical=async (req,res)=>{
    try{
        let data=req.query
        const {subject,news,comments,langause,like,country,category,isPublished,writter}=data
        const obj={}
        if(subject){
        if (!Validator.isValid(subject)) return res.status(400).send({ status: false, message: "subject is Required" });
            obj['subject']=subject;
        }
        if(news){
        if (!Validator.isValid(news)) return res.status(400).send({ status: false, message: "news is Required" });
            obj['news']=news
         }
         if(langause){
             if (!Validator.isValid(langause)) return res.status(400).send({ status: false, message: "langause is Required" });
             if (!Validator.isValidString(langause)) return res.status(400).send({ status: false, message: "langause must be alphabate"});
             obj['langause']=langause
        }
        if(country){
         if (!Validator.isValid(country)) return res.status(400).send({ status: false, message: "country is Required" });
         if (!Validator.isValidString(country)) return res.status(400).send({ status: false, message: "country must be alphabate"});
         obj['country']=country
        }
        if(category){
         if (!Validator.isValid(category)) return res.status(400).send({ status: false, message: "category is Required" });
         if (!Validator.isValidString(category)) return res.status(400).send({ status: false, message: "category must be alphabate"});
         obj['category']=category
        }
        if(writter){
            if (!Validator.isValid(writter)) return res.status(400).send({ status: false, message: "writter id is Required" });
            if (!Validator.isValidObjectId(writter)) return res.status(400).send({ status: false, message: "writter id is not valid"});
            let writterid= await writterModel.findById(writter);
            if(!writterid) return res.status(404).send({status:false,message: 'no writter exicts'})
            obj['writter']=writter
        }
        if(isPublished){
            if(isPublished!='false'||isPublished!='true')  return res.status(400).send({status:false,message: 'isPublished must be boolean'})
            obj['isPublished']=isPublished
        }

        let artical= await articalModel.find(obj);
        return res.status(201).send({status:true,msg:artical});

    }catch(err){
        return res.status(500).send({ status: false, message: err.message });
    }
}

const getArticalByid= async (req,res)=>{
    try{
        const articalId=req.params.articalId;
        if (!Validator.isValid(articalId)) return res.status(400).send({ status: false, message: "articalId is Required" });
        if (!Validator.isValidObjectId(articalId)) return res.status(400).send({ status: false, message: "articalId is not valid"});
        let artical= await writterModel.findById(articalId);
        if(!artical) return res.status(404).send({status:false,message: 'no artical exicts'});
       
        return res.status(200).send({status:false,message:artical});
        
    
    }catch(err){
            return res.status(500).send({ status: false, message: err.message });
        }
    }

const deletArticalByid= async (req,res)=>{
try{
    const articalId=req.params.articalId;
    if (!Validator.isValid(articalId)) return res.status(400).send({ status: false, message: "articalId is Required" });
    if (!Validator.isValidObjectId(articalId)) return res.status(400).send({ status: false, message: "articalId is not valid"});
    let artical= await writterModel.findById(articalId);
    if(!artical) return res.status(404).send({status:false,message: 'no artical exicts'});
    let isdelet=artical.isDeleted
    if(isdelet=='true'){
        return res.status(400).send({status:false,message: 'this artical are all ready deleted'});
    }else{
        await articalModel.findByIdAndUpdate(articalId,{$set:{isDeleted:true}},{new:true});
        return res.status(200).send({status:false,message: 'this artical delet successfuly'});
    }

}catch(err){
        return res.status(500).send({ status: false, message: err.message });
    }
}


const deletallArtical= async (req,res)=>{
    try{
        const writterId=req.params.writterId;
        if (!Validator.isValid(writterId)) return res.status(400).send({ status: false, message: "writterId is Required" });
        if (!Validator.isValidObjectId(writterId)) return res.status(400).send({ status: false, message: "writterId is not valid"});
        let artical= await writterModel.updateMany({writter:writterId},{$set:{isDeleted:false}},{new:true});
    
        return res.status(200).send({status:false,message:artical});
        
    
    }catch(err){
            return res.status(500).send({ status: false, message: err.message });
        }
    }

    module.exports={createArtical,deletArticalByid,deletallArtical,getAllartical,getArticalByid,updateArtical}