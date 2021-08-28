import { SecretsManager } from "aws-sdk";
import { SecretConfig } from "../types/secret";

export const setConfiguration = async (key:string,conf: SecretConfig) => new Promise((resolve,reject)=>{
      new SecretsManager().putSecretValue({
        SecretId: key, 
        SecretString: JSON.stringify(conf),      
      }, function(err, data) {
        if (err) reject(err) 
        resolve(data);
      });
});

export const getConfiguration = async (key:string):Promise<SecretConfig> => new Promise((resolve,reject)=>{
       new SecretsManager().getSecretValue({
        SecretId: key, 
       }, function(err, data) {
         if (err || !data?.SecretString) reject(err || new Error("Secret not found"));
         const secret = JSON.parse(data.SecretString!);
         resolve(secret);
       });
})