import Span from "../../atoms/span"
import { ComponentProps, memo, useCallback, useMemo } from "react";

import {CslotInfo,Islot} from "../../organisms/itemSetting"
export interface Iabillities{
    "공격력":number;
    "치명타":number;
    "체력":number;
    "방어력":number;
    "회피":number;
    "이동속도":number;
    "공격속도":number;
    "부가효과":object;
   
}
const Result=({slot}:ComponentProps<any>)=>{
    
    const abillities=useMemo(()=>getSlotsAbillities(slot),[slot]);
    console.log("result");
    const abilNames=Object.keys(abillities[0]); 
    const renderAbills= useCallback((value,i,name)=>{
        return(
        <div key={i}>
            <Span rarity="유니크">{name}</Span>
            <br></br>
            <Span rarity="언커먼">{value[name].toFixed(2)}</Span>
        </div>
        )
    },[slot])
    const renderSideEffect=useCallback((value,i,name)=>{
       
        const items=Object.keys(value[name]);
        return(
            <div key={i}>
                <Span rarity="유니크">{name}</Span>    
                {items.map(item=>{
                        return (<div className="sideEffect" key={item}>
                            <br></br>
                            <br></br>
                             <Span> {item} </Span> 
                             {value[name][item].map(effect=>{
                                 return(
                                     <p key={effect+item+i}>
                                     <Span rarity="언커먼">{effect}</Span>
                                     </p>
                                 )
                             })}
                             </div>
                            )        
                    })
                }      
                    
            </div>   
        )
    },[slot])
    return(<div className="result">
            <div className="abillity">
            {abillities.map((value,i)=>{
                        return <div key={i}>{abilNames.map((name,i)=>{
                                  return name!="부가효과"?renderAbills(value,i,name):renderSideEffect(value,i,name);   
                                 }
                            )}</div>
                        }
                    ) 
            }
            </div>
        </div>)
}
export function getSlotsAbillities(slot:Islot)
{   
        let abillities:Iabillities[]=[]
        const items=slot.items;
        let result:Iabillities={
            "공격력":0,
            "치명타":0,
            "방어력":0,
            "체력":0,
            "회피":0,
            "이동속도":0,
            "공격속도":0,
            "부가효과":{},
        };
        for (const item in items) {
        items[item]!=null?processSplitAbillityStr(items[item],result):null;
        } 
        abillities.push(result);
        
        return abillities;
  
    function processSplitAbillityStr(item:CslotInfo,result:Iabillities){
        const info=item.info;
        const name=item.name;
       
        const infoStrings=info.split("\n");
        infoStrings.map((value,index)=>{
            result=processClassfyAbillity(value,index,result,infoStrings,name)         
        })      
     return result
    }
    function processClassfyAbillity(value:string,index,result:Iabillities,infoStrings:string[],name:string){
        if(value=="")
            return result;
        if(index>4)
            return result;
           
        result=processSetAbility(value,index,result,infoStrings,name);
        return result;
    }
    function processPercentToNum(percent:string){
        const subPercent=percent[percent.length-1]!="%"?percent.substring(2,percent.length):percent.substring(2,percent.length-1);
        const abilNum=Number(subPercent);
        return abilNum;
    }
    function processSetAbility(value:string,index:number,result:Iabillities,infoStrings:string[],name:string){
        if(value.split(":").length<=1){
           processSetSideEffect([value],name)
           return result;
        }
      
        const abilName=value.split(":")[0].split(" ")[0]
        let abilStrs:string[]=value.split(":")
        const abilNum=processPercentToNum(abilStrs[1]);
      
        processClassifySideEffectType(index,infoStrings)?
        processSetSideEffect(abilStrs,name)
        :
        result.hasOwnProperty(abilName)?result[abilName]+=abilNum:processSetSideEffect(abilStrs,name); 
        return result;
    }
    function processSetSideEffect(abilStrs:string[],name:string){
        result.부가효과[name]==null?result.부가효과[name]=[abilStrs]:result.부가효과[name].push(abilStrs);
    }
    function processClassifySideEffectType(index:number,infoStrings:string[]){
        let flag=false;
           if(index-1<0)
            return flag;
        for(let i=0;i<index;i++){
            if(infoStrings[i].startsWith("["))
                flag=true;
        }
          
        return flag;
    }
}
export default memo(Result)