import { ComponentProps,useState } from "react";
import ImgBtn from './imgBtn'
import {searchStrProcess} from '../../lib/data';
export default function List(props:ComponentProps<any>){
    const items=props.data;
    const [listType,setListType]=useState(props.type);
   
    const Content=items.map(
                  
                    value=>{
                        if(props.search!=null){
                                if(!searchStrProcess(props.search,value.name)){   
                                    return ;
                                }    
                        }
                            return <ImgBtn 
                            type={listType} 
                            code={value.code?value.code:"https://img-api.neople.co.kr/cy/items/"+value.itemId} 
                            data-name={value.name?value.name:value.itemName} 
                            name={value.name?value.name:value.itemName} 
                            key={value.name?value.name:value.itemName} 
                            rarity={value.rarityName?value.rarityName:"유니크"}
                            info={value.explainDetail?value.explainDetail:value.name}
                            onBtnEvent={
                            function(value){ 
                                return !!props.onListEvent(value);
                                }
                            }>
                        </ImgBtn>  
                })
    return(
        <div className="listWrap">
            {Content}
        </div>
    )
}