import axios from "axios";
import { updateEventPattern } from "../aws/eventbridge";


export const like = async(girlId:string,token:string):Promise<boolean> =>{ 
    try {
        const {data} = await axios.get(`https://api.gotinder.com/like/${girlId}`,{
            headers:{
                "x-auth-token":token
            }
        });

        if(data.rate_limited_until){
            const rateLimitDate = new Date(data.rate_limited_until);
            const hours = Math.ceil(Math.abs(rateLimitDate.getTime() - Date.now()) / 36e5);
            console.log(`Rate limited until ${rateLimitDate.toLocaleString()},wait ${hours} hours.`)
            const res = await updateEventPattern(hours > 1 ? `rate(${hours} hours)`: `rate(1 hour)`)
            console.log(`Update cron rate limited ${res}`)
            return false
        }

        if (data.match) {
            // send a message to the pussy            
            console.log("GOT A MATCH BOY!!!!")
        }

        console.log(data);

        return true
    } catch (error :any) {
        console.log(error)
        return false;
    }
}