const aws = require("aws-sdk");

/* ------------------------------------------------aws config -------------------------------------------------------- */
aws.config.update({
    accessKeyId: "abc",
    secretAccessKey: "abc",
    region: "ap-south-1",
  });
  
  /* ------------------------------------------------aws fileUpload-------------------------------------------------------- */
  let uploadFile = async (file) => {
    return new Promise(function (resolve, reject) {
      let s3 = new aws.S3({ apiVersion: "2006-03-01" });
  
      var uploadParams = {
        ACL: "public-read",
        Bucket: "classroom-training-bucket",
        Key: "user/" + file.originalname,
        Body: file.buffer,
      };
      s3.upload(uploadParams, function (err, data) {
        if (err) return reject({ error: err });
  
        return resolve(data.Location);
      });
    });
  };

  module.exports.uploadFile = uploadFile