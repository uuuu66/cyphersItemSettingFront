import {ComponentProps,useMemo,useState} from "react"
import axios from "axios";
import {getItemInfo} from "../lib/data";
export default function ItemList(props:ComponentProps<any>){

   
    let data=props.data;
    data=useMemo(function(){
        data.map(async(value)=>{
            return value;
        },[data]);
    },data)
    let Content=null
    if(data){
        Content=data.map(value=>{
                   
            const item=value.split(":");
            const name=item[0];
            const code=item[1];
        
            if(name==="제피 베이직"||name==="D&C 특수킷 R")
                return
            const imgSrc="https://img-api.neople.co.kr/cy/items/"+item[1];
           return( <div  className="item" key={name}>
               <div className="itemImg">
                <img src={imgSrc} alt="img없" />
                </div>
                <div className="itemName">
                <span>{name}</span>
                </div>
            </div>)
        })
    }
    return(
        <div className="itemList">
            {Content}
        </div>
    )
}