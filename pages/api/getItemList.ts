import { NextApiRequest, NextApiResponse } from 'next'
import itemJson from '../../lib/datas/items.json'




export default async function hander(req: NextApiRequest, res: NextApiResponse)  {
  // ...
    if(req.method="post"){
        const result=[];
        result.push(itemJson[req.body.character]);
        result.push(itemJson["null"]);
        return res.json({code:"done",data:result});
    }else{
        console.log("error",req);
        return  res.json({code:"error",data:"no signal"});
    }
}

// export const config = {
//     api: {
//       bodyParser: false
//     }
//   };
  