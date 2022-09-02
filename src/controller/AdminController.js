const adminModel=require('../models/adminModel');
const Validator=require('../validator/valid')
const bcrypt = require('bcrypt');
const jwt=require('jsonwebtoken')
const saltRounds = 10;

 /********************************************* Register Admin *****************************************/
const adminCreate = async function (req, res) {

    try {
        let data = req.body
        
        let { fname, lname, phone, email,  password,address,passCode} = data
        /*----------------------------validations ----------------------------*/
        if (!Validator.isValidReqBody(data)) { return res.status(400).send({ status: false, msg: "Please provide user data" }) }

        if (!Validator.isValid(fname)) return res.status(400).send({ status: false, message: "First name is Required" });
        if (!Validator.isValidString(fname)) return res.status(400).send({ status: false, message: "First name  must be alphabetic characters" })

        if (!Validator.isValid(lname)) return res.status(400).send({ status: false, message: " Last Name is Required" });
        if (!Validator.isValidString(lname)) return res.status(400).send({ status: false, message: "Invalid last name name : Should contain alphabetic characters only" });

      if(!Validator.isValid(email)) return res.status(400).send({status: false,message: "Email is Required"});
        if (!Validator.isValidEmail(email)) return res.status(400).send({ status: false, message: "Invalid email address" });

        //check unique email
        const isEmailUsed = await adminModel.findOne({ email: email });
        if (isEmailUsed) return res.status(400).send({ status: false, message: "email is already used, try different one" });

      

        if (!Validator.isValid(phone)) return res.status(400).send({ status: false, message: "Phone is Required" });
        if (!Validator.isValidPhone(phone)) return res.status(400).send({ status: false, message: "Invalid phone number : must contain 10 digit and only number." });

        //check unique phone
        const isPhoneUsed = await adminModel.findOne({ phone: phone });
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
//     if(!Validator.isValid(passCode)) return res.status(400).send({status: false,message: "PassCode  is Required"});
// //owner give the pass code then register
//     if(passCode==genreate) return res.status(400).send({status: false,message: "owner give the Passcode"});

    let saveData = await adminModel.create(data)
    return res.status(201).send({status:true,msg:"Admin createted successfully",data:saveData})
    
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}
 /********************************************* Login Admin *****************************************/
const AdminLogin = async function (req, res) {
    try {
        let data = req.body
        const { email, password } = data

        /*----------------------------validations ----------------------------*/
        if (!Validator.isValidReqBody(data)) { return res.status(400).send({ status: false, msg: "Please provide user details" }) }

        if (!Validator.isValid(email)) { return res.status(400).send({ status: false, message: "Email is Required" }); }

        if (!Validator.isValid(password)) { return res.status(400).send({ status: false, message: "Password is Required" }); }

        let hash = await adminModel.findOne({email:email,isVerify:true,isDeleted:false});
        if(!hash){
            return res.status(400).send({ status: false, message: "This email id not valid"});
        }
        let compare = await bcrypt.compare(password, hash.password).then((res) => {
            return res
          });
      
          if (!compare) {return res.status(400).send({ status: false, msg: "password not valid" });}
       

        //create the jwt token 
        let token = jwt.sign({
            AdminId: hash._id.toString(),
            Admin:'Amit/Abdul',

        }, "Amit@233307", { expiresIn: "1d" });


        res.header("Authorization", "Bearer : " + token);

        return res.status(200).send({ status: true, message: "Admin login successfull", iat: new String(Date()),data:{ AdminId: hash._id.toString(), token }})
    }
    catch (err) {
        return res.status(500).send({ status: false, message: err.message });
    }
}

module.exports={adminCreate,AdminLogin}