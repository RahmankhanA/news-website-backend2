const WritterModel=require('../models/writterModel');
const articalModel=require('../models/ArticalsModel');
const Validator=require('../validator/valid');
const nodemaile=require('nodemailer');
const randomString=require('randomstring')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken');
const saltRounds = 10;

 /********************************************* writter Register *****************************************/
const WritterCreate = async function (req, res) {

    try {
        let data = req.body
        
        let { fname, lname, phone, email,  password,address} = data
  
        /*----------------------------validations ----------------------------*/
        if (!Validator.isValidReqBody(data)) { return res.status(400).send({ status: false, msg: "Please provide user data" }) }

        if (!Validator.isValid(fname)) return res.status(400).send({ status: false, message: "First name is Required" });
        if (!Validator.isValidString(fname)) return res.status(400).send({ status: false, message: "First name  must be alphabetic characters" })

        if (!Validator.isValid(lname)) return res.status(400).send({ status: false, message: " Last Name is Required" });
        if (!Validator.isValidString(lname)) return res.status(400).send({ status: false, message: "Invalid last name name : Should contain alphabetic characters only" });

      if(!Validator.isValid(email)) return res.status(400).send({status: false,message: "Email is Required"});
        if (!Validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "Invalid email address" });

        //check unique email
        const isEmailUsed = await WritterModel.findOne({ email: email });
        if (isEmailUsed) return res.status(400).send({ status: false, message: "email is already used, try different one" });

      

        if (!Validator.isValid(phone)) return res.status(400).send({ status: false, message: "Phone is Required" });
        if (!Validator.isValidPhone(phone)) return res.status(400).send({ status: false, message: "Invalid phone number : must contain 10 digit and only number." });

        //check unique phone
        const isPhoneUsed = await WritterModel.findOne({ phone: phone });
        if (isPhoneUsed) return res.status(400).send({ status: false, message: "phone is already used, try different one" });
         


        if (!Validator.isValid(password)) return res.status(400).send({ status: false, message: "Password is Required" });
        if (!Validator.isValidPassword(password)) return res.status(400).send({ status: false, message: "Invalid password (length : 8-16) : Abcd@123456" });
       
        let encryptedPassword = bcrypt
        .hash(data.password, saltRounds)
        .then((hash) => {
          console.log(`Hash: ${hash}`);
          return hash;
        });
        data.password = await encryptedPassword;
        //check address are given or not
       if(!address){return res.status(400).send({status: false,message: "address is Required"})}
       else {
    if(!Validator.isValid(add.street)) return  res.status(400).send({status: false,massage: "Street is Required"});
    
    if(!Validator.isValid(add.city)) return  res.status(400).send({status: false,message: "City is Required"});
    if(!Validator.isValidString(add.city))return res.status(400).send({ status: false, massage: "City   must be alphabetic characters" })
    if(!Validator.isValid(add.pincode)) return  res.status(400).send({status: false,message: "Pincode is Required"});
    if(!/^[0-9]{6}$/.test(add.pincode)) return res.status(400).send({status: false,message: "Pincode  is not valid minlenght:-6"});
       }  
        let saveData = await WritterModel.create(data)
        return res.status(201).send({status:true,msg:"Admin createted successfully",data:saveData})
    
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

 /********************************************* writter Login *****************************************/

const writeLogin = async function (req, res) {
    try {
        let data = req.body
        const { email, password } = data

        /*----------------------------validations ----------------------------*/
        if (!Validator.isValidReqBody(data)) { return res.status(400).send({ status: false, msg: "Please provide user details" }) }

        if (!Validator.isValid(email)) { return res.status(400).send({ status: false, message: "Email is Required" }); }
        if (!Validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "Invalid email address" })

        if (!Validator.isValid(password)) { return res.status(400).send({ status: false, message: "Password is Required" }); }
        if (!Validator.isValidPassword(password)) return res.status(400).send({ status: false, message: "Invalid password (length : 8-16) : Abcd@123456" });
        let hash = await WritterModel.findOne({email:email,isVerify:true,isDeleted:false});
        if(!hash){
            return res.status(400).send({ status: false, message: "This email id not valid"});
        }
        let compare = await bcrypt.compare(password, hash.password).then((res) => {
            return res
          });
      
          if (!compare) {return res.status(400).send({ status: false, msg: "password not valid" });}
       

        //create the jwt token 
        let token = jwt.sign({
            writterId: hash._id.toString(),
            AdminId:adminCreate._id.toString(),

        }, "Amit@233307", { expiresIn: "1d" });


        res.header("Authorization", "Bearer : " + token);

        return res.status(200).send({ status: true, message: "Writter login successfull", iat: new String(Date()),data:{ writterId: hash._id.toString(), token }})
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}


/*----------------------------------- getWritterById-api ------------------------------------------*/


const getWritterById = async function (req, res) {
    try {
        const writterId = req.params.writterId
        //validate the userId
        if (!Validator.isValidObjectId(writterId)) return res.status(400).send({ status: false, message: "Invalid userId" })
        let writerData = await WritterModel.findById(writterId,{password:0}).lean()
          if (!writerData) return res.status(404).send({ status: false, message: "User is not found " })   
        // find cart of the user 
        let ArticalData = await articalModel.findOne({Writter:writterId,isDeleted:false})
        if(Artical) writerData.Articals = ArticalData.Artical.count()// if the cart are exixts then add in userData

       
        return res.status(200).send({ status: true, message: "Writter profile details", data: writerData })
    } catch (err) {
        res.status(500).send({ status: false, message: err.message })

    }
}

/*----------------------------------- getallWritter-api ------------------------------------------*/

const getAllWritter=async function(req,res){
 const allwritter= await WritterModel.find()
 return res.status(200).send({ status: true, message: "Writter profile details", data: allwritter })
}

//------------------------------------ Put-api ---------------------------------------//

const updatedWritter = async function (req, res) {
    try {
        const writterId = req.params.writterId
        let data = req.body
        let update= {}

        let {fname, lname, email, phone, password, address} = data
       
    
        if (!Validator.isValidReqBody(data)) { return res.status(400).send({ status: false, msg: "Please provide user data for updation" }) }
        if(fname)
        if (!Validator.isValidString(fname)) return res.status(400).send({ status: false, message: "First name  must be alphabetic characters" })
        update["fname"]= fname
        if(lname)
        if (!Validator.isValidString(lname)) return res.status(400).send({ status: false, message: "Invalid last name name : Should contain alphabetic characters only" });
         update["lname"]=lname
       if(email)
        if (!Validator.isValidEmail(email)) { return res.status(400).send({ status: false, message: "Invalid email address" }) };
         const isEmailUsed = await WritterModel.findOne({ email: email });
        if (isEmailUsed) return res.status(400).send({ status: false, message: "email is already used, try different one" });
        update["email"]=email
        if(phone)
        if (!Validator.isValidPhone(phone)) return res.status(400).send({ status: false, message: "Invalid phone number : must contain 10 digit and only number." });
        const isPhoneUsed = await WritterModel.findOne({ phone: phone });
        if (isPhoneUsed) return res.status(400).send({ status: false, message: "phone is already used, try different one" });
        update["phone"]=phone
        if(password){ //check the password are given or not
        if (!Validator.isValidPassword(password)) return res.status(400).send({ status: false, message: "Invalid password (length : 8-16) : Abcd@123456"});      
        let encryptedPassword = bcrypt //convert to the password in bc
        .hash(password, saltRounds)
        .then((hash) => {
          console.log(`Hash: ${hash}`);
          return hash;
        });
         update["password"]= await encryptedPassword;
        
    } 
 
        if (address) {
            add = JSON.parse(address);
           
                let {street,city,pincode,country}=add
            if(street){
                if(!Validator.isValidString(street))return res.status(400).send({ status: false, message: "street   must be alphabetic characters" })
            update["address.street"]=street}
            if(city){
                if(!Validator.isValidString(city))return res.status(400).send({ status: false, message: "city must be alphabetic characters" })  
                update["address.city"]=city
            }
            if(pincode){
                if(!/^[0-9]{6}$/.test(pincode)) return res.status(400).send({ status: false, message: "pincode must be number min length 6"})
                update["address.pincode"]=pincode
            }
            if(country) {
                if(!Validator.isValidString(country))return res.status(400).send({ status: false, message: "Country  must be alphabetic characters" })
                update["address.country"]=pincode
            }
           
        }
        let updatedData = await WritterModel.findOneAndUpdate({ _id: writterId,isDeleted:false }, {$set:update},{ new: true })
        return res.status(200).send({ status: true, message: "Writter profile updated", data: updatedData })

    }
    catch (err) {
       return res.status(500).send({ err: err.message })
    }
}

/*********************************forget APi *******************/
const sendsetPasswordEmail=async function(name,email,token){
    try{
        const transport= nodemaile.createTransport({
            host:'smtp.gmail.com',
            port:587,
            secure:false,
            requireTLS:true,
            auth:{
                user:'abc',
                pass:"abc"
            }
         });
         const mailOption={
            from:'abc',
            to:email,
            subject:'For reset password',
            html:'<p>Hi '+name+',Please copy the link and <a href="http://localhost:3000/resetPasswored?'+token+'"> reset password</a>'
         }
         transport.sendMail(mailOption,function(err,info){
            if(err){
                 console.log(err);
            }else{
                console.log('Mail has been send :- ',info.response);
            }
         });

    }catch(err){
        return res.status(500).send({ err: err.message })
    }
}
const forgetPWD=async function(req,res){
    try{
        let data = req.body
        const { email, password } = data

        if (!Validator.isValid(email)) { return res.status(400).send({ status: false, message: "Email is Required" }); }
        if (!Validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "Invalid email address" })

        let checkEmail=await WritterModel.findOne({email:email,isDeleted:false})
        if(!checkEmail) return res.status(404).send({ status: false, message: "data not found" })
        const random=randomString.generate()
           await WritterModel.updateOne({email:email},{$set:{Token:random}})
        let name=checkEmail.fname+' '+checkEmail.lname
        sendsetPasswordEmail(name,checkEmail.email,random)


        if (!Validator.isValid(password)) { return res.status(400).send({ status: false, message: "Password is Required" }); }
        if (!Validator.isValidPassword(password)) return res.status(400).send({ status: false, message: "Invalid password (length : 8-16) : Abcd@123456" });
       
        let encryptedPassword = bcrypt
        .hash(data.password, saltRounds)
        .then((hash) => {
          console.log(`Hash: ${hash}`);
          return hash;
        });
        data.password = await encryptedPassword;
    }
    catch(err){
        return res.status(500).send({ err: err.message })
    }
}
const reset_password=async ()=>{
    try{
        
    }catch(err){
        return res.status(500).send({ err: err.message })
    }
}

module.exports={WritterCreate,writeLogin,updatedWritter,getWritterById,getAllWritter, forgetPWD, reset_password}


