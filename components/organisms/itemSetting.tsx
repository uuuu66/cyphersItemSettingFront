
import { ComponentProps,useCallback,useEffect,useReducer,useState,useRef, MutableRefObject,forwardRef, ForwardedRef } from "react";
import ItemList from "../molecules/items/itemList";
import ItemSlot from "../molecules/items/itemSlot";
import ItemResult,{getSlotsAbillities,Iabillities} from"../molecules/items/itemResult";
import ItemDetaiView from "../molecules/items/itemDetailView";
import ItemSlotButtons from "../molecules/items/itemSlotButtons";
import ItemMenuButtons from "../molecules/items/itemMenuButtons";
import ItemSearch from "../molecules/items/itemSearch";
import StatusBar from "../molecules/bars/statusBar"
import { getSlotCode } from "../../lib/data"; 
import DivButton from "../atoms/divButton";
import ImgButton from "../atoms/imgButton";
import ToolBarButton from "../molecules/toolBarButton/toolBarButton";


export class CslotInfo{
    name:string;
    src:string;
    info:string;
    rarity:string;
    part:string;
    code:string;
    constructor(value,src,info,rarity,part,code){
        this.name=value;
        this.src=src;
        this.info=info;
        this.rarity=rarity;
        this.part=part;
        this.code=code;
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
const  ItemSetting=(props:ComponentProps<any>)=>{
    const title=props.name!==null?props.name:`${props.char}#${props.index}`;
    const [detailTarget,setDTarget]=useState(new CslotInfo("없음","없음","없음","없음","없음","없음"));
    const defaultSlotParts=new CslotParts();
 
    const [reNameInput,setRenameInput]=useState(false)
   

    
    const toolBar={
        title:"삭제",
        buttons:[<DivButton key="delete" onBtnClick={function(){props.onDelete();}}>삭제</DivButton>,
                <DivButton key="cancle" onBtnClick={function(){}}>취소</DivButton>   
                ]
        }
   
    useEffect(function(){
            if(reNameInput===true)
            inputRef.current.focus();
           },[reNameInput])
    let defaultSlot:Islot=
    {
        idx:0,
        current:false,
        title:props.char,
        items:defaultSlotParts,
        isMaxmize:false,
        isFloat:false,
        result:null,
    }
    const [slots,setSlots]=useReducer(actionSlot,[defaultSlot]);
  
    function actionSlot(slots,action){
        let newSlots:Islot[]=[...slots];
        
        if(action[0]==="CREATE")
        {
            createSlot(newSlots)
        }
        if(action[0]==="DELETE")
        {
            deleteSlot(newSlots,action[1]);
        }
        if(action[0]==="RESET")
        {
            resetSlot(newSlots,action[1]);
        }
        if(action[0]==="EQUIP")
        {   
            newSlots=equipItem(newSlots,action[1],action[2],action[3],action[4],action[5],action[6])
        }
        if(action[0]==="UNEQUIP")
        {
            newSlots=unEquipItem(newSlots,action[1],action[2])
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
        if(action[0]==="LOAD"){
            newSlots=loadSlot(newSlots,action[1]);
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
    function deleteSlot(state:Islot[],idx:number){
        if(state.length==0){
          return  createSlot(state);
        }
        state.splice(idx,1) 
        return state
    }
    function resetSlot(state:Islot[],idx:number){
        const slot=selectSlot(state,idx);
        const slotNames=Object.keys(slot.items);
        for(const name of slotNames){
            slot.items[name]=null;
        }
        return state;
    }
    function checkCurrent(state:Islot[]){
       
        for(const currentSlot of state){
           if(currentSlot.current==true)
                return currentSlot;
        }
        return null;
       
    }
    function equipItem(state:Islot[],value,src,info,rarity,slot,code){
        
        let current=checkCurrent(state);
        
        if(current===null){
            if(state.length===0){
              state= createSlot(state);
            }
            setCurrent(state,0,false);
            current=selectSlot(state,0);
        }   
        const newSlot=new CslotInfo(value,src,info,rarity,slot,code);
        current.items[slot]=newSlot;
        return state;
    }
    function unEquipItem(state:Islot[],slot,idx){ 
        let current=selectSlot(state,idx);
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
   function saveSet(title:string,idx:number){
       const fileText=makeFile(idx); 
       if(fileText){
        title=title+(idx+1)+'아이템 세트';
        download(title,fileText);
       }else{
        props.onAnnounce(`파일 만들기 실패`,"경고");
       }
    }
     function makeFile(idx){
        let text:string="슬롯 정보 \n\n";
        const slot=selectSlot(slots,idx);
        if(!slot)
            return null;
        const items:CslotParts=slot.items;
        const parts=Object.keys(items);
        let itemCode="\n\n:::아이템 코드:::\n";
        parts.map((part,index)=>{
            const item:CslotInfo=items[part];
            const itemName=item===null?"없음":item.name;
            const itemInfo=item===null?"없음":item.info;
            const prefix=index===0?"":"-"
            itemCode+=`${prefix}${item===null?"null":item.code}`
            const infoText=`{${part}:{\n 아이템이름:  ${itemName} ,\n아이템 정보:\n[${itemInfo}]}\n}\n`
            text+=infoText;
        });
        text+=itemCode;
        return text
    }
    function download (title:string,text:string) {
        let blob = new Blob([text], {type:'text/plain'});
        let link = document.createElement("a");
        link.download = title;
        link.href = window.URL.createObjectURL(blob);
        document.body.appendChild(link);
        link.click();
        setTimeout(() => {
            document.body.removeChild(link);
            window.URL.revokeObjectURL(link.href);
        }, 100);
    }
    function loadSlot(state:Islot[],slot:CslotParts){
        const lastIdx=getLastIndex(state)
        const newIslot:Islot={
            idx:lastIdx+1,
            current:false,
            title:props.char,
            items:slot,
            isMaxmize:false,
            isFloat:false,
            result:null,
        } 
        state.push(newIslot);
        return state;
     
    }
    function createSlot(state:Islot[]){
        const lastIdx=getLastIndex(state)
      
        const newIslot:Islot={
            idx:lastIdx+1,
            current:false,
            title:props.char,
            items:defaultSlotParts,
            isMaxmize:false,
            isFloat:false,
            result:null,
        }
      
        state.push(newIslot);
        return state;
    }
    function getLastIndex(state){
        if(state.length==0){
            return -1;
        }
        let idx:number=0;
        for(const slot of state){
            idx=slot.idx;
        }
        return idx;
    }
    function onWatchDetail(name,src,info,rarity,slot){
        const newTarget=new CslotInfo(name,src,info,rarity,slot,null);
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
   
    function onCreate(){
        props.onAnnounce(`생성완료.`,"언커먼");
        return setSlots(["CREATE"]);
    }
    function onDelete(idx:number){
        return setSlots(["DELETE",idx]);
    }
    function onSave(idx:number){
        return saveSet(title,idx);
    }
    function onLoad(code:string){
        getSlotCode(code,props.char).then(value=>{
            if(value.code==="err"){
                return props.onAnnounce(value.data)
            }    
            return setSlots(["LOAD",value.data]);
           }).catch(err=>{
            console.log(err);
           })  
    }
    
    function onReset(idx:number){
        return setSlots(["RESET",idx])
    }
    const onEquip=(value,src,info,rarity,slot,code)=>
    {
        props.onAnnounce(`<${value}> 장착완료.`,"유니크")
        setSlots(["EQUIP",value,src,info,rarity,slot,code]);
    }
    
    const itemLists=useCallback(()=>{  
    return (<ItemList key={props.name+props.index} data={props.data} 
                onWatchDetail={
                    function(name,src,info,rarity,slot){
                        props.onAnnounce(`<${name}> 상세보기.`,"언커먼")
                        onWatchDetail(name,src,info,rarity,slot)
                    }
                }
                onListEvent={onEquip}>
            </ItemList>)},[slots]); 
    const itemSlots=useCallback(()=>
    slots.map((value,i)=>
        (  
            <div className="result"  key={value.title+value.idx} >
                    <StatusBar current="true" title={`${value.title}:아이템 슬롯#${value.idx+1}`}>
                        <ItemSlotButtons 
                        onCreate={onCreate}
                        onDelete={()=>onDelete(i)}
                        onReset={()=>onReset(i)}
                        onSave={()=>onSave(i)}
                        onLoad={onLoad}>
                        </ItemSlotButtons>
                    </StatusBar>
                    <h2>슬롯</h2>
               
                         
                <ItemSlot 
                    allowFloat="no"
                    isMaximize={value.isMaxmize}
                    isFloat={value.isFloat}
                    onWatchDetail={function(name,src,info,rarity,slot){onWatchDetail(name,src,info,rarity,slot)}}
                    onCurrent={function(idx:number,cur:boolean){ onCurrent(idx,cur)}}
                    onFloat={function(idx:number,float:boolean){ onFloat(idx,float)}}
                    onMaximize={function(idx:number,max:boolean){ onMaximize(idx,max)}}
                    slot={value}
                    onListEvent=
                        {
                            function(slot:string,idx)
                            {
                                props.onAnnounce(`<${slot}> 해제완료`,"유니크");
                                 setSlots(["UNEQUIP",slot,idx]);
                            }
                        }
                    ></ItemSlot>
                  
             <details className="slot" >
                <summary>{`능력치 보기`}</summary> 
                      <h2>능력치</h2>
                        <ItemResult slot={value}></ItemResult>
                   
            </details>  
            </div>
          
            )
        )
        ,[slots])
                        
        const inputRef:MutableRefObject<any>=useRef();
        const Title=<h1 onClick={function(){setRenameInput(!reNameInput);}}>{title}</h1>;
            
        const floatSlots=useCallback(()=>
        (
                 <div className="floatSlots" >
                    {slots.map((value,i)=>{return value.isFloat&&
                                <ItemSlot
                                    key={i}
                                    allowFloat="yes"
                                    isMaximize={value.isMaxmize}
                                    isFloat={value.isFloat} 
                                    onWatchDetail={function(name,src,info,rarity,slot){onWatchDetail(name,src,info,rarity,slot)}}
                                    onCurrent={function(idx:number,cur:boolean){ onCurrent(idx,cur)}}
                                    onFloat={function(idx:number,float:boolean){ onFloat(idx,float)}}
                                    onMaximize={function(idx:number,max:boolean){ onMaximize(idx,max)}}
                                    slot={value}
                                    onListEvent=
                                        {function(slot:string,idx:number)
                                            {
                                            
                                                props.onAnnounce(`<${slot}> 해제완료`,"유니크");
                                                return setSlots(["UNEQUIP",slot,idx]);
                                            }
                                        }
                                >
                                </ItemSlot>})}
                </div>
        ),[slots]);

    return(
        <div className="itemSetting" >
            s
            <div className="maintitle" >
            {Title}
            {<input className={`ReNameInput${reNameInput}`}  ref={inputRef} onBlur={function(e){setRenameInput(!reNameInput);props.onRename(e.target.value)}} placeholder={`제목 수정`}></input>}
            </div>
            <div className="subtitle">
                <h1>새 슬롯만들기</h1>
                <ItemMenuButtons onCreate={onCreate} onLoad={onLoad}></ItemMenuButtons>
               
            </div>
            {itemSlots()}
            {props.active&&floatSlots()}
            <ItemDetaiView target={detailTarget} ></ItemDetaiView>
            <ItemSearch char={props.char}
            onAnnounce={props.onAnnounce}
            onWatchDetail={onWatchDetail}
            onEquip={onEquip} 
            ></ItemSearch>
            {itemLists()}
        </div>
    )
}
export default ItemSetting