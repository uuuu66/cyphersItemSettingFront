import { NextApiRequest, NextApiResponse } from 'next'
import fs from 'fs';
import path from 'path';
const dataPath=path.join(process.cwd(),'lib/datas/');

export default async(req: NextApiRequest, res: NextApiResponse) => {
  // ...
    if(req.method="post"){
        const itemPath=path.join(dataPath,req.body.character+".txt");
        const ItemList= await fs.promises.readFile(itemPath);
        res.status(200).json({data:ItemList});
    }else{
        res.status(404);
    }
}