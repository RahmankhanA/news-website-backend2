const jwt =require('jsonwebtoken');
const Validator = require("../validator/valid")




const Authentication = async function (req, res, next) {
    try {
        // getting token from req(header)
        let token1 = req.headers["Authorization"];
        if (!token1) token = req.headers["authorization"];
        if (!token1) { return res.status(400).send({ status: false, msg: "Enter Authorization In Header" }); }
        // token verification
        let token = token1.split(" ").pop()
        jwt.verify(token,"Amit@233307",{ ignoreExpiration: true },function (err, decoded) {
              if (err) {return res.status(400).send({status : false, meessage : "token invalid and authentication Falied"})}
               else {
                //The static Date.now() method returns the number of milliseconds elapsed since January 1, 1970
                if (Date.now() > decoded.exp * 1000) {
                  return res.status(401).send({status: false,msg: "Session Expired",});
                }
                req.writerId = decoded.writerId;
                req.adminId=decoded.adminId
                next();
              }});
       
    }
    catch (err) {
        res.status(500).send({ msg: err.message });
    }
}
module.exports.Authentication = Authentication;


const Authorization = async function (req, res, next) {
    try {
       // getting token from req(header)
       let token1 = req.headers["Authorization"];
       if (!token1) token = req.headers["authorization"];
       if (!token1) { return res.status(400).send({ status: false, msg: "Enter Authorization In Header" }); }
       // token verification
       let token = token1.split(" ").pop()
        let decodedToken = jwt.verify(token, "Amit@233307")
         let decodedwriterId = decodedToken.writerId;
         let decodedAdmin = decodedToken.adminId;
        let writerId = req.params.writerId;
        // check the value of writerId are present in params  or not
        if(!Validator.isValid(writerId)){
            let adminId = req.body.adminId;
            // check the adminId present in body
            if(!Validator.isValid(adminId)) return res.status(400).send({status: false,message: "adminId is Required"});
            if(!Validator.isValidObjectId(adminId))  return res.status(400).send({status: false,message: "adminId is not valid"});
            //check the  adminId are present in decoded token
            if (adminId != decodedAdmin) { return res.status(401).send({status:false,msg:"Not Authorised!!"})}
        }else{
            if(!Validator.isValid(writerId)) return res.status(400).send({status: false,message: "writerId is Required"});
            if(!Validator.isValidObjectId(writerId))  return res.status(400).send({status: false,message: "writerId is not valid"});

            //check the writter id and decoded token in user id same or not 
            if (writerId != decodedwriterId) { return res.status(401).send({status:false,msg:"Not Authorised!!"})}
        }
        next()
    }
    catch (err) {
        return res.status(500).send({ status:false,msg: err.message });
    }
}
module.exports.Authorization = Authorization;