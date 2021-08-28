import AWS from "aws-sdk";
import * as dotenv from "dotenv";
const { handler } = require("./main");
dotenv.config();


function connectAWS(){
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