import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import { ComponentProps, useState } from "react";

import {CslotInfo,CslotParts,Islot} from "../../organisms/itemSetting"
export interface Iabillities{
    "공격력":number;
    "치명타":number;
    "체력":number;
    "방어력":number;
    "회피":number;
    "이동속도":number;
    "공격속도":number;
    "부가효과":string[][];
   
}
export default function Result({slots}:ComponentProps<any>){
    const processedSlots=slots.map(value=>{return getItems(value.items)});
 
    const [abilities,setAbillities]=useState(processedSlots);
    function getItems(items:CslotParts)
    {   
        let result:Iabillities={
            "공격력":0,
            "치명타":0,
            "방어력":0,
            "체력":0,
            "회피":0,
            "이동속도":0,
            "공격속도":0,
            "부가효과":[],
        };
        for (const item in items) {
            items[item]!=null?getAbillity(items[item],result):null;
          }      
       return result;
    }
    function getAbillity(item:CslotInfo,result:Iabillities){
        const info=item.info;
        const infoStrings=info.split("\n");
        infoStrings.map((value,index)=>{
            result=processStrOfAbillity(value,index,result)         
        })      
        console.log(result);
     return result
    }
    function processStrOfAbillity(value,index,result:Iabillities){
        if(value=="")
            return result;
        if(index>5)
            return result;
      
        if(value.split(":").length>1){
         const abilName=value.split(":")[0].split(" ")[0]
        let abilStrs:string[]=value.split(":").filter((value,i)=>i>0);
        console.log(value,abilStrs);
        const abilNum=percentToNum(abilStrs[0]);
        result.hasOwnProperty(abilName)?result[abilName]+=abilNum:result.부가효과.push(abilStrs);
        
        }else{
            result.부가효과.push(value);   
        }
        return result
    }
    function percentToNum(percent:string){
        const subPercent=percent[percent.length-1]!="%"?percent.substring(2,percent.length):percent.substring(2,percent.length-1);
        const abilNum=Number(subPercent);
        return abilNum;
    }
    console.log(abilities);
   return(
    <div className="result">
        hi {abilities.공격력}
    </div> 
    )
}