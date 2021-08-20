
import { ComponentProps,memo,useEffect,useReducer,useState } from "react";
import ItemList from "../molecules/items/itemList";
import ItemSlot from "../molecules/items/itemSlot";
import ItemResult from"../molecules/items/itemResult";
export class CslotInfo{
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
export class CslotParts {
    "손(공격)":CslotInfo=null;
    "머리(치명)":CslotInfo=null;
    "가슴(체력)":CslotInfo=null;
    "허리(회피)":CslotInfo=null;
    "다리(방어)":CslotInfo=null;
    "발(이동)":CslotInfo=null;
    "장신구1":CslotInfo=null;
    "장신구2":CslotInfo=null;
    "회복킷":CslotInfo=null;
    "가속킷":CslotInfo=null;
    "공격킷":CslotInfo=null;
    "방어킷":CslotInfo=null;
    "특수킷":CslotInfo=null;
    "목":CslotInfo=null;
    "장신구3":CslotInfo=null;
    "장신구4":CslotInfo=null;  
}
export interface Islot{
    idx:number;
    current:boolean;
    title:string;
    items:CslotParts; 
    isMaxmize:boolean;
    isFloat:boolean;
}
const ItemSetting=(props:ComponentProps<any>)=>{
    const onStateChangeEvent=props.onStateChangeEvent??null;
    const defaultSlotParts=new CslotParts();
    let defaultSlot:Islot=
    {
        idx:0,
        current:true,
        title:props.name,
        items:defaultSlotParts,
        isMaxmize:false,
        isFloat:false,
    }
    const [slots,setSlots]=useReducer(actionSlot,[defaultSlot]);
    function actionSlot(slots,action){
        let newSlots=Array.from(slots);
        if(action[0]==="CREATE")
            newSlots.push(action[1]);
        if(action[0]==="DELETE")
        {

        }
        if(action[0]==="EQUIP")
        {   
            newSlots=equipItem(newSlots,action[1],action[2],action[3],action[4],action[5])
        }
        if(action[0]==="UNEQUIP"){
            newSlots=unEquipItem(newSlots,action[1])
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
    function checkCurrent(state){
        let current=null;
        for(const currentSlot of state){
            current=currentSlot.current==true?currentSlot:null;  
        }
        return current; 
    }
    function equipItem(state,value,src,info,rarity,slot){
        let current=checkCurrent(state);
        
        const newSlotInfo:CslotInfo={
            name:value,
            src:src,
            info:info,
            rarity:rarity,
            part:slot,
        }
        current.items[slot]=newSlotInfo;
        return state;
    }
    function unEquipItem(state,slot){ 
        let current=checkCurrent(state);
        current.items[slot]=null;
        return state;
    }
    
    return(
        <div className="itemSetting">
            <div className="subtitle"><h1>{props.name }{"#"+props.index}</h1></div>
            <div className="subtitle"><h2>결과</h2></div>
            <ItemResult slots={slots}></ItemResult>
            {slots.map(value=>  (
                                    <ItemSlot 
                                    key={value} 
                                    slot={value} 
                                    onListEvent=
                                    {function(slot){
                                        props.onAnnounce(`<${slot}> 해제완료`,"유니크");
                                        return setSlots(["UNEQUIP",slot]);
                                        }
                                    }
                                    ></ItemSlot>
                                )
                        )
            }
            <ItemList key={props.name+props.index} data={props.data} onListEvent={function(value,src,info,rarity,slot,ready){
                props.onReady(ready)
                props.onAnnounce(`<${value}> 장착완료`,"유니크");
                return  setSlots(["EQUIP",value,src,info,rarity,slot]);
            }}></ItemList>
        </div>
    )
}
export default memo(ItemSetting)
