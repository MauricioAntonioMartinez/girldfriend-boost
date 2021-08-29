import { EventBridge } from "aws-sdk";


export const updateEventPattern = (pattern:string)=> new Promise((resolve,reject)=>{
      new EventBridge().putRule({
          Name: process.env.ScheduleName!,
          ScheduleExpression: pattern,
      }, function(err, data) {
        if (err) return reject(err)
        return resolve(data)           
      });
})