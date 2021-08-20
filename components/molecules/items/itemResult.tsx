import { SSL_OP_SSLEAY_080_CLIENT_DH_BUG } from "constants";
import { ComponentProps } from "react";

import {CslotInfo,CslotParts,Islot} from "../../organisms/itemSetting"
export default function Result({slots}:ComponentProps<any>){
    const processedSlots=slots.map(value=>{return getItems(value.items)});
    function compareAbility(){

    }
    function getItems(items:CslotParts)
    {   
        let result={};
        for (const item in items) {
            
            items[item]!=null?getAbillity(items[item],result):null;
          }      
        console.log(result);
    }
    function getAbillity(item:CslotInfo,result:object){
        const info=item.info;
        const infoStrings=info.split("\n");
        infoStrings.map((value,index)=>{
            result=setAbil(value,index,result)
                
        })

        console.log(result);
        return result;
    }
    function setAbil(value,index,result){
        if(index==1){
            
        }
        return result;
    }
    return(
    <div className="result">
        
    </div> 
    )
}