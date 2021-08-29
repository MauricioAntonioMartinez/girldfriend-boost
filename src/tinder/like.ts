import axios from "axios";


export const like = async(girlId:string,token:string):Promise<boolean> =>{ 
    try {
        const {data} = await axios.get(`https://api.gotinder.com/like/${girlId}`,{
            headers:{
                "x-auth-token":token
            }
        });

        if(data.rate_limited_until){
            console.log(`Rate limited until ${new Date(data.rate_limited_until).toLocaleString()}`)
            return false
        }

        return true
    } catch (error :any) {
        console.log(error)
        return false;
    }
}