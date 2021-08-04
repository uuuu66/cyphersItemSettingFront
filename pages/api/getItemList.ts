import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';
const dataPath=path.join(process.cwd(),'lib/datas/');


export default async function hander(req: NextApiRequest, res: NextApiResponse)  {
  // ...
    if(req.method="post"){
        const itemPath=path.join(dataPath,req.body.character+".txt");
        await fs.readFile(itemPath,(err,data)=>{
            if(!err){
            return  res.json({code:"data",data:data.toString()});
            }else{
            return res.json({code:"error",data:err.code});
            }
        });
        
    }else{
        return  res.json({code:"error",data:"no signal"});
    }
   
}

// export const config = {
//     api: {
//       bodyParser: false
//     }
//   };
  