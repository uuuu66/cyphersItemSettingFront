import axios from 'axios'
import { NextApiResponse,NextApiRequest } from 'next'

export default async function getItemInfo(req:NextApiRequest,res:NextApiResponse){
    const code=req.body.code;
    const Axios=axios;
    try{
    const data=await axios.get(`https://api.neople.co.kr/cy/battleitems/${code}?apikey=fPCPcpKNOko5J0pe5ZH2qtcGIoRR1oFR`)
    console.log(data.data);
    return data;
    }catch(err){
        console.log(err);
    }
  
}