import axios from "axios";
import { Girl } from "../types/tinder";


export const getGirls = async (token:string):Promise<Girl[] | null> => {
    try {
        const {data} = await axios.get("https://api.gotinder.com/v2/recs/core",{
            headers:{
                "x-auth-token":token
            }
        });
        const girls = data.data.results;
        return girls;
    } catch (error:any) {
        console.log(error.response.data);
        return null
    }
}