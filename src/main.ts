import refreshCredentials from "./auth/refreshCredentials";
import { getConfiguration } from "./storage/setKey";
import { getGirls } from "./tinder/getGirls";
import { like } from "./tinder/like";
import { Girl } from "./types/tinder";


exports.handler = async ()=>{
    const secretName = process.env.TinderSecretName;
    if(!secretName) throw new Error("Tinder secret name should be set.");
    
    let config = await getConfiguration(secretName);
 
    let girls = await getGirls(config.apiToken);
    let shouldContinue = true;
    let processedGirls = 0;
 
    if(!girls) {
        config = await refreshCredentials(config)
        girls = await getGirls(config.apiToken);
        if (!girls) {
            // notify me to update the refresh token;
            throw new Error("CW metric sns -> email me error > 0")
            return;
        }  
     }
    
    while (true){
        shouldContinue = await likeGirls(girls,config.apiToken);
        if(!shouldContinue) break;
        processedGirls+= girls.length
        girls = await getGirls(config.apiToken);
        if(!girls) break;
    }

    console.log(`Ending processing girls(likes), liked ${processedGirls}`);
}    




const likeGirls = async (girls:Girl[],token:string)=>{ 
    for(const girl of girls){ 
        const ok  = await like(girl.user._id,token); 
        if (!ok) return false
        console.log(`Liked ${girl.user.name}`);
    }
    return true;
}


