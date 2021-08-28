import AWS from "aws-sdk";
const { handler } = require("./main");

function connectAWS(){
    const dotenv = require("dotenv");
    dotenv.config();
    AWS.config = new AWS.Config({
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
        region: process.env.AWS_REGION,
      });
}

(async()=>{
   connectAWS();
   await handler();
})()