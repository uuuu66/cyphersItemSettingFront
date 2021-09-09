import { ComponentProps,useCallback,useState } from "react";
import ItemBtn from '../items/itemBtn'
import {searchChars} from '../../../lib/data';
import List from '../list/list';
export default function BtnList(props:ComponentProps<any>){
    
    const items=props.data;
    const search=props.search;
    const [listType,setListType]=useState(props.type); 
    const Content=useCallback(()=>items.map(
                    value=>{ 
                                if(search!=null){
                                    
                                        if(!searchChars(search,value.name)){   
                                            return ;
                                        }  
                                }
                            return <ItemBtn type={listType} 
                            src={value.code?value.code:"https://img-api.neople.co.kr/cy/items/"+value.itemId} 
                            code={value.itemId}
                            data-name={value.name?value.name:value.itemName} 
                            name={value.name?value.name:value.itemName} 
                            key={value.name?value.name:value.itemName} 
                            rarity={value.rarityName?value.rarityName:"유니크"}
                            info={value.explainDetail?value.explainDetail:value.name}
                            slot={props.slot}
                            onWatchDetail={
                                function(name,src,info,rarity,slot){
                                    return props.onWatchDetail(name,src,info,rarity,slot);
                                }
                            }
                            onBtnEvent={
                                function(value,src,info,rarity,slot,code){ 
                                    return props.onListEvent(value,src,info,rarity,slot,code);
                                }
                            }>
                        </ItemBtn>  
                }),[search])
    return(
       <List>
           {Content()}
       </List>
    )
}
