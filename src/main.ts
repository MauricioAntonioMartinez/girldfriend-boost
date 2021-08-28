import { generateToken, refreshCredentials } from "./auth";
import { getConfiguration, setConfiguration } from "./storage/setKey";
import { getGirls } from "./tinder/getGirls";
import { like } from "./tinder/like";
import { Girl } from "./types/tinder";


exports.handler = async ()=>{
    let config = await getConfiguration("LAMBDA_CONF");

    let girls = await getGirls(config.apiToken);
    let shouldContinue = true;
    let processedGirls = 0;
 
    if(!girls) {
        config = await refreshCredentials(config)
        girls = await getGirls(config.apiToken);
        if (!girls) {
            config= await generateToken({
                facebookEmailAddress: process.env.EMAIL!,
                facebookPassword:process.env.PASSWORD!
            });
            girls = await getGirls(config.apiToken);
            if (!girls) throw new Error("Unable to authenticate in any way");
            await setConfiguration("LAMBDA_CONF",config);
        }  
     }
    
    while (true){
        shouldContinue = await likeGirls(girls,config.apiToken);
        if(!shouldContinue) break;
        processedGirls+= girls.length
        girls = await getGirls(config.apiToken);
        if(!girls) break;
    }

    console.log(`Ending processing, successfully processed %${processedGirls}`);

}    




const likeGirls = async (girls:Girl[],token:string)=>{ 
    for(const girl of girls){ 
        const ok  = await like(girl.user._id,token); 
        if (!ok) return false
        console.log(`Liked ${girl.user.name}`);
    }
    return true;
}


