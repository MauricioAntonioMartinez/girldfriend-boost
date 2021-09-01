import axios from "axios";
import { updateEventPattern } from "../aws/eventbridge";
import { Girl } from "../types/tinder";


export const getGirls = async (token:string):Promise<Girl[] | null> => {
    try {
        const {data} = await axios.get("https://api.gotinder.com/v2/recs/core",{
            headers:{
                "x-auth-token":token
            }
        });
        const girls = data.data.results;
        if(!girls) {
          const timeout = +data.data.timeout;
          const res = await updateEventPattern(`rate(${(timeout/1000)/60} minutes)`);
          console.log(`Timed out  ${timeout} ms`);
          console.log(`Update cron ${JSON.stringify(res)}`);
        }
        return girls;
    } catch (error:any) {
        console.log(error)
        return null
    }
}