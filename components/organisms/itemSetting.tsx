
import { ComponentProps,memo,useReducer,useState } from "react";
import ItemList from "../molecules/itemList";
import ItemSlot from "../molecules/itemSlot";
class slotInfo{
    name:string;
    src:string;
    info:string;
    rarity:string;
    part:string;
    constructor(value,src,info,part){
        this.name=value;
        this.src=src;
        this.info=info;
        this.part=part;
    }
}
class slotParts {
    "손":slotInfo=null;
    "머리":slotInfo=null;
    "가슴":slotInfo=null;
    "허리":slotInfo=null;
    "다리":slotInfo=null;
    "발":slotInfo=null;
    "장신구1":slotInfo=null;
    "장신구2":slotInfo=null;
    "회복킷":slotInfo=null;
    "가속킷":slotInfo=null;
    "공격킷":slotInfo=null;
    "방어킷":slotInfo=null;
    "특수킷":slotInfo=null;
    "목":slotInfo=null;
    "장신구3":slotInfo=null;
    "장신구4":slotInfo=null;
    
}
interface slot{
    current:boolean;
    name:string;
    items:slotParts; 
}
const ItemSetting=(props:ComponentProps<any>)=>{
    const defaultSlotParts=new slotParts();
    const defaultSlot:slot={
        current:true,
        name:'기본',
        items:defaultSlotParts
    }
    const [slots,setSlots]=useReducer(actionSlot,[defaultSlot]);
    function actionSlot(slots,action){
        let newSlots=Array.from(slots);
        if(action[0]==="CREATE")
        newSlots.push(action[1]);
        if(action[0]==="DELETE")
        {

        }
        if(action[0]==="UPDATE")
        {   
            newSlots=equipItem(newSlots,action[1],action[2],action[3],action[4],action[5])
        }
        if(action[0]==="SELECT")
        {
            newSlots= selectSlot(newSlots,action[1])
        }
        
        return newSlots;
    }    
    function selectSlot(state,item){
        for(const slot of state){
            if(slot.current==true){
                slot.current=false;
                break;
            }   
        }   
        state[item].current=true;
        return state;
    }
    function equipItem(state,value,src,info,rarity,slot){
        let current=null;
        for(const slot of state){
            if(slot.current==true){
                current=slot;
            }   
        }
        const newSlotInfo:slotInfo={
            name:value,
            src:src,
            info:info,
            rarity:rarity,
            part:slot,
        }
        current.items[slot]=newSlotInfo;
        return state;
    }
  
  
    return(
        <div className="itemSetting">
            <div className="subtitle"><h1>{props.name }{"#"+props.index}</h1></div>
            <div className="subtitle"><h2>결과</h2></div>
            {slots.map(value=>(<ItemSlot key={value} slot={value}></ItemSlot>))}
            <ItemList key={props.name+props.index} data={props.data} onListEvent={function(value,src,info,rarity,slot){
                  return  setSlots(["UPDATE",value,src,info,rarity,slot.split("(")[0]]);
            }}></ItemList>
        </div>
    )
}
export default memo(ItemSetting)