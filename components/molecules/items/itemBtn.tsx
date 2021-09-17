import { ComponentProps ,memo,useEffect,useState,} from "react";

import Name from '../../atoms/name';
import Icon from '../../atoms/icon';
import ToolTip from '../../molecules/toolTip/toolTip';
import DivButton from "../../atoms/divButton";
import ToolBar from "../../molecules/bars/toolBar"

export interface ItoolBar{
    title:string;
    buttons:any[];
}
const ItemBtn=(props:ComponentProps<any>)=>{
    const onBtnEvent=props.onBtnEvent??null;
    const onWatchDetail=props.onWatchDetail??null;
    const onUnEquipEvent=props.onUnEquipEvent??null;
    const src=props.src??null;
    const code=props.code??null;
    const name=props.name;
    const type=props.type;
    const info=props.info;
    const rarity=props.rarity??"커먼";
    const originalSlot=props.slot;
    const[slot,setSlot]=useState(props.slot);
    const[On,setOn]=useState("OFF");
    const[toolTip,setToolTip]=useState(false);
    let mouseFlag=false;
    let mouseInterval=null;
    let startTime=0;
    let currentTime=0;
    const shortTapTime=300;
    
    
    const toolBarButtons=makeToolBar();
    const toolBarTitle=originalSlot=="장신구ALL"?"슬롯 선택":"선택";
    const toolBar:ItoolBar=originalSlot=="장신구ALL"?{
        title:toolBarTitle,
        buttons:toolBarButtons,
    }:{title:toolBarTitle,buttons:toolBarButtons};
    const [toolBarTimeOut,setToolBarTimeOut]=useState(null);
    

    function toolBarOn(){
        clearTimeout(toolBarTimeOut);
        setToolBarTimeOut(null);
        const on=On=="ON"?"OFF":"ON";
        setToolBarTimeOut(setTimeout(()=>{setOn("OFF")},4500));
        mouseFlag=false;
        startTime=0; 
        clearInterval(mouseInterval);
        return setOn(on);
    }
    useEffect(function(){return clearTimeout(toolBarTimeOut)})
    function makeToolBar(){
        
        const Buttons=originalSlot==="장신구ALL"?makeAllButtons():makeButtons();
        return Buttons   
    }
    function makeAllButtons(){
        const Buttons=[]
        for(let i=1;i<5;i++){
            Buttons.push(<DivButton key={name+originalSlot+i} onBtnClick={ function(){makeEquipUnEquip(`장신구${i}`),toolBarOn();} }>{`${i}`}</DivButton>);
        }
        Buttons.push(<DivButton key={name+originalSlot+5} onBtnClick={function(){setToolTip(true)}}>{`보기`}</DivButton>)
        Buttons.push(<DivButton key={name+originalSlot+6} onBtnClick={function(){setToolTip(false);seeDetail()}}>{`상세`}</DivButton>)
        Buttons.push(<DivButton key={name+originalSlot+7} onBtnClick={ function(){return null} }>{`취소`}</DivButton>)
        return Buttons;    
    }
    function makeButtons(){
        const charButtons=[
            <DivButton key={name+originalSlot+1} onBtnClick={ function(){onBtnEvent(name),toolBarOn();} }>{`선택`}</DivButton>
        ,<DivButton key={name+originalSlot+2} onBtnClick={ function(){return null} }>{`취소`}</DivButton>
    
        ]
        const itemButtons=[<DivButton key={name+originalSlot+1} onBtnClick={ function(){makeEquipUnEquip(),toolBarOn();} }>{type==='item'?`장착`:"해제"}</DivButton>
        ,  <DivButton key={name+originalSlot+3} onBtnClick={function(){setToolTip(true)}}>{`보기`}</DivButton>
        , <DivButton key={name+originalSlot+6} onBtnClick={function(){setToolTip(false);seeDetail()}}>{`상세`}</DivButton>,
        <DivButton key={name+originalSlot+2} onBtnClick={function(){return null}}>{`취소`}</DivButton>
        ]
       
        return type==="character"?charButtons:itemButtons;  
    } 
    function mouseCapture(){
        startTime=Date.now();
        if(mouseFlag!=false)
            return;
        mouseFlag=true;  
        mouseInterval= setInterval(()=>howLongMouseTap(),20);       
    } 
    function howLongMouseTap(){
        if(mouseFlag==false)
         return clearInterval(mouseInterval) ;
        currentTime=Date.now();
    }
    function mouseUp(){
          return  shortTap();   
    }
    function shortTap(){
        if(toolTip)
        return  setToolTip(false);
        currentTime=Date.now();
        clearInterval(mouseInterval);
        const howLongTime=currentTime-startTime;
        mouseFlag=false;
        return  howLongTime>shortTapTime&&howLongTime<shortTapTime+500?null:toolBarOn();   
    }
    function makeEquipUnEquip(slot=originalSlot){   
        onBtnEvent?onBtnEvent(name,src,info,rarity,slot,code):slot=="장신구ALL"?onUnEquipEvent():onUnEquipEvent(originalSlot);
        mouseFlag=false;
        startTime=0; 
        return clearInterval(mouseInterval);
    }
    function seeDetail(){
        clearInterval(mouseInterval);  
        mouseFlag=false;
        startTime=0; 
        return type!="character"?onWatchDetail(name,src,info,rarity,slot):null;
    }

  
    return(
        <ToolTip On={toolTip} info={info} type={type} name={name} rarity={rarity} >    
            <div className={type} 
            onTouchStart={(e)=>{e.stopPropagation();mouseCapture()}}
            onTouchEnd={(e)=>{e.preventDefault();mouseUp()}}
          
            onMouseDown={(e)=>{e.stopPropagation();mouseCapture()}}
            onMouseUp={(e)=>{e.preventDefault();mouseUp()}}
         
            >
            <Icon src={src} type={type} alt={name} ></Icon>
            {type!="itemicon"&&<Name name={name} rarity={rarity}></Name>}
            </div> 
            {toolBar&&<ToolBar onToolBarOFF={toolBarOn} on={On} title={toolBar.title} buttons={toolBar.buttons}>
            {toolBar.buttons.map(value=>(value))}
            </ToolBar>
            }        
        </ToolTip>
      
    )
}
function areEqual(prevProps:ComponentProps<any>,nextProps:ComponentProps<any>){
    let flag=true;
    return flag
}
export default memo(ItemBtn,areEqual)