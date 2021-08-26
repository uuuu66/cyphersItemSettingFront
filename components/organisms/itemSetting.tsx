
import { ComponentProps,memo,useCallback,useMemo,useReducer,useState } from "react";
import ItemList from "../molecules/items/itemList";
import ItemSlot from "../molecules/items/itemSlot";
import ItemResult,{getSlotsAbillities,Iabillities} from"../molecules/items/itemResult";
import ItemDetaiView from "../molecules/items/itemDetailView";
import { MemoryMeasurement } from "vm";

export class CslotInfo{
    name:string;
    src:string;
    info:string;
    rarity:string;
    part:string;
    constructor(value,src,info,rarity,part){
        this.name=value;
        this.src=src;
        this.info=info;
        this.rarity=rarity;
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
    result:Iabillities[];
}
 export default function ItemSetting(props:ComponentProps<any>){
    const onStateChangeEvent=props.onStateChangeEvent??null;
    const [detailTarget,setDTarget]=useState(new CslotInfo("없음","없음","없음","없음","없음"));
    const defaultSlotParts=new CslotParts();
    console.log("setting");
    let defaultSlot:Islot=
    {
        idx:0,
        current:false,
        title:props.name,
        items:defaultSlotParts,
        isMaxmize:false,
        isFloat:false,
        result:null,
    }
    const [slots,setSlots]=useReducer(actionSlot,[defaultSlot]);
   
    function actionSlot(slots,action){
        let newSlots:Islot[]=[...slots];
        
        if(action[0]==="CREATE")
            newSlots.push(action[1]);
        if(action[0]==="DELETE")
        {

        }
        if(action[0]==="EQUIP")
        {   
            newSlots=equipItem(newSlots,action[1],action[2],action[3],action[4],action[5])
        }
        if(action[0]==="UNEQUIP")
        {
            newSlots=unEquipItem(newSlots,action[1])
        }
        if(action[0]==="FLOAT")
        {
            newSlots=setFloat(newSlots,action[1],action[2]);
        }
        if(action[0]==="CURRENT")
        {
            newSlots=setCurrent(newSlots,action[1],action[2]);
        }
        if(action[0]==="MAXIMIZE"){
            newSlots=setMaximize(newSlots,action[1],action[2]);
        }
        newSlots=setResult(newSlots);
        return newSlots;
    }    
    function selectSlot(state:Islot[],idx:number){ 
        for(const slot of state){
            if(slot.idx===idx)
                return slot;   
        }
    }
    function checkCurrent(state:Islot[]){
        let current:Islot=null;
        for(const currentSlot of state){
            current=currentSlot.current==true?currentSlot:null;  
        }
        return current; 
    }
    function equipItem(state:Islot[],value,src,info,rarity,slot){
        let current=checkCurrent(state);
        if(current===null){

            return state;
        }   
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
    function unEquipItem(state:Islot[],slot){ 
        let current=checkCurrent(state);
        current.items[slot]=null;
        return state;
    }
    function setResult(state:Islot[]){  
        for(const slot of state){
           slot.result=getSlotsAbillities(slot),[slot];
        }       
        return state;
    }
    function setFloat(state:Islot[],idx:number,float:boolean){
        let slot=selectSlot(state,idx);
        slot.isFloat=!float;
        return state;
    }
    function setMaximize(state:Islot[],idx:number,max:boolean){
        const slot=selectSlot(state,idx);
    
        
        slot.isMaxmize=!max;
    
        return state;
    }
    function setCurrent(state:Islot[],idx:number,cur:boolean){
        for(const slot of state){
            slot.current=false;
        }
        const slot=selectSlot(state,idx);
        slot.current=!cur;
        return state;
    }
    function onWatchDetail(name,src,info,rarity,slot){
        const newTarget=new CslotInfo(name,src,info,rarity,slot);
        return setDTarget(newTarget);
    }
    function onCurrent(idx:number,current:boolean){
       return setSlots(["CURRENT",idx,current])
    }
    function onFloat(idx:number,float:boolean){
        return setSlots(["FLOAT",idx,float])
    }
    function onMaximize(idx:number,max:boolean){
        return setSlots(["MAXIMIZE",idx,max])
    }
    function checkCurrentIsNull(state:Islot[]){
        for(const slot of state){
            if(slot.current===true)
                return true;
        }
        return false;
    }
    const itemLists=useCallback(()=> 
            <ItemList key={props.name+props.index} data={props.data} 
                onWatchDetail={
                    function(name,src,info,rarity,slot){onWatchDetail(name,src,info,rarity,slot)}
                }
                onListEvent={
                    function(value,src,info,rarity,slot,ready)
                    {
                        props.onReady(ready)
                        props.onAnnounce(`<${value}> 장착완료`,"유니크");
                        return  setSlots(["EQUIP",value,src,info,rarity,slot]);
                    }
                }>
            </ItemList>,[props.data]) 
    return(
        <div className="itemSetting">
            <div className="subtitle"><h1>{props.name }{"#"+props.index}</h1></div>  
            {slots.map(value=>(  
                            <div className="result" key={value.title+value.idx}>
                                    <h1>{value.title+(value.idx+1)}</h1>
                                    <h2>슬롯</h2>
                                <div className="floatSlots">
                                    {value.isFloat&&
                                    <ItemSlot
                                        isMaximize={value.isMaxmize}
                                        isFloat={value.isFloat} 
                                        onWatchDetail={function(name,src,info,rarity,slot){onWatchDetail(name,src,info,rarity,slot)}}
                                        onCurrent={function(idx:number,cur:boolean){return onCurrent(idx,cur)}}
                                        onFloat={function(idx:number,float:boolean){return onFloat(idx,float)}}
                                        onMaximize={function(idx:number,max:boolean){return onMaximize(idx,max)}}
                                        slot={value}
                                        onListEvent=
                                            {function(slot:string)
                                                {
                                                    props.onAnnounce(`<${slot}> 해제완료`,"유니크");
                                                    return setSlots(["UNEQUIP",slot]);
                                                }
                                            }
                                    >
                                    </ItemSlot>}
                                </div>
                                <ItemSlot 
                                    isMaximize={value.isMaxmize}
                                    isFloat={value.isFloat}
                                    onWatchDetail={function(name,src,info,rarity,slot){onWatchDetail(name,src,info,rarity,slot)}}
                                    onCurrent={function(idx:number,cur:boolean){return onCurrent(idx,cur)}}
                                    onFloat={function(idx:number,float:boolean){return onFloat(idx,float)}}
                                    onMaximize={function(idx:number,max:boolean){return onMaximize(idx,max)}}
                                    slot={value}
                                    onListEvent=
                                        {
                                            function(slot:string)
                                            {
                                                props.onAnnounce(`<${slot}> 해제완료`,"유니크");
                                                return setSlots(["UNEQUIP",slot]);
                                            }
                                        }
                                    ></ItemSlot>
                                    <h2>능력치</h2>
                                <ItemResult slot={value}></ItemResult>
                            </div>
                                )
                        )
            }
            <h1>아이템 상세보기</h1>
            <ItemDetaiView target={detailTarget} ></ItemDetaiView>
            {itemLists()}
        </div>
    )
}
