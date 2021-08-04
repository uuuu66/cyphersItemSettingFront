import React, { MouseEventHandler } from "react"
import {getItemList} from "../lib/data"
interface ItemList {
    code:string;
    index:number;
    character:string;
    item:Array<any>;
}
export default function CharListComp(props:React.ComponentProps<any>){
    let index=0;
   return(
    <>   
    {props.list.map((value)=>(
       
        <div className="charImg"  key={value.characterName} data-character={value.characterName}  
        onClick={ async function(e:React.SyntheticEvent<EventTarget>){
            if (!(e.currentTarget instanceof HTMLDivElement)) {
                        return       
                }
            const character=e.currentTarget.dataset.character;
            const data = await getItemList(character);
                
            if(!!data.code&&data.code==="error"){
                return  props.onChangeCharacter(data);
            }
                const itemList:ItemList={
                    code:"data",
                    index:index,
                    character:character,
                    item:data,
                }
                index++;
                props.onChangeCharacter(itemList);
 
             }
                            
        }>
            <img src={value.characterId}alt={value.characterName} />
        </div>
    ))}
    </>
    );
}