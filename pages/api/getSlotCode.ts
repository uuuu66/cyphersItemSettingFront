import { NextApiRequest, NextApiResponse } from 'next'
import { CslotParts,CslotInfo } from '../../components/organisms/itemSetting';
import ItemJson from '../../lib/datas/items.json'
export default async function getSlotCode(req:NextApiRequest,res:NextApiResponse){
    const cSlotParts=new CslotParts();
    const parts=Object.keys(cSlotParts);
    const char=req.body.char;
    const code=req.body.code;
    
    if(!char)
        return res.json({data:"charErr"});
    if(!code)
        return res.json({data:"codeErr"})
    const itemCodes=code.split("-");
    if(itemCodes.length!==16)
        return res.json({data:"invalidCode"})
   const result=itemCodes.map((code,index)=>{
        try{
        return code==="null"?null:searchItem(char,parts[index],code);
        }catch(err){
            console.log(code,err);
            return null;
        }
    })
    return res.json({data:result});    
}   
function searchItem(char:string,part:string,code:string){
    code=code.trim();
    const charResult=getItems(char,part).filter(item=>{return item.itemId===code});
    let nullResult=getItems("null",part).filter(item=>{return item.itemId===code});
    nullResult=nullResult.length===0?null:nullResult[0];
    const item=charResult.length===0?nullResult:charResult[0];
    const result=new CslotInfo(item.itemName,`https://img-api.neople.co.kr/cy/items/${code}`,item.explainDetail,item.rarityName,item.slotName,code)
    return result;
}
function getItems(char:string,part:string){
    const Items=ItemJson[char][part];
   
    return Items;
}