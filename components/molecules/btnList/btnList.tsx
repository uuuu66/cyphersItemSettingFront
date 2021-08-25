import { ComponentProps,useCallback,useState,memo } from "react";
import ItemBtn from '../items/itemBtn'
import {searchStrProcess} from '../../../lib/data';
import List from '../list/list';
const BtnList=(props:ComponentProps<any>)=>{
    
    const items=props.data;
    const [listType,setListType]=useState(props.type); 
    const Content=useCallback(()=>items.map(
                    value=>{
                       
                            return <ItemBtn type={listType} 
                            code={value.code?value.code:"https://img-api.neople.co.kr/cy/items/"+value.itemId} 
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
                                function(value,src,info,rarity,slot,ready){ 
                                    return props.onListEvent(value,src,info,rarity,slot,ready);
                                }
                            }>
                        </ItemBtn>  
                }),[items])
    return(
       <List>
           {Content()}
       </List>
    )
}
export default memo(BtnList)