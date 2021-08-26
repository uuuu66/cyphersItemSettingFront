import { ComponentProps,useCallback,useState,useRef,MutableRefObject } from "react";
import ItemBtn from '../items/itemBtn'
import {searchStrProcess} from '../../../lib/data';
import List from '../list/list';
import Span from '../../atoms/span';
import Button from '../../atoms/button'
export default function BtnList(props:ComponentProps<any>){
    
    const items=props.data;
    const [search,setSearch]=useState(null);
    const [listType,setListType]=useState(props.type); 
    const inputRef:MutableRefObject<any>=useRef();
    const Content=useCallback(()=>items.map(
                    value=>{
                                if(search!=null){
                                        if(!searchStrProcess(search,value.name)){   
                                            console.log(search,value.name);
                                            return ;
                                        }    
                                }
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
                }),[search])
    return(
       <List>
            <h2>캐릭터 검색</h2>
            <Span rarity="레어">영어는 초성만 됨.사유:귀찮아서 </Span>
            <Button onClick={function(){setSearch(null); inputRef.current.value=" "}}>검색 초기화</Button>
            <div id="inputDiv">
              <input ref={inputRef} id="charSearch" onChange={function(e){setSearch(e.target.value)}}></input>
            </div> 
           {Content()}
       </List>
    )
}
