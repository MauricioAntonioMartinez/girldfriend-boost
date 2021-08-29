import generateToken from "./generateToken";


(async()=>{
 const config = await generateToken({
     facebookEmailAddress: process.env.EMAIL!,
    facebookPassword: process.env.PASSWORD!
 })
 console.log(config);
})()