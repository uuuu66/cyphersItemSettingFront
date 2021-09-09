import { ComponentProps ,useEffect,useState,} from "react";

import Name from '../../atoms/name';
import Icon from '../../atoms/icon';
import ToolTip from '../../molecules/toolTip/toolTip';
import DivButton from "../../atoms/divButton";
import ToolBar from "../../molecules/bars/toolBar"

export interface ItoolBar{
    title:string;
    buttons:any[];
}
export default function ItemBtn(props:ComponentProps<any>){
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
    const longTapTime= 3000;
    
    const toolBarButtons=makeToolBar();
    const toolBarTitle=originalSlot=="장신구ALL"?"슬롯 선택":null;
    const toolBar:ItoolBar=originalSlot=="장신구ALL"?{
        title:toolBarTitle,
        buttons:toolBarButtons,
    }:null;
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
        
        const Buttons=originalSlot==="장신구ALL"?makeButtons():null;
        return Buttons   
    }
    function makeButtons(){
        const Buttons=[]
        for(let i=1;i<5;i++){
            Buttons.push(<DivButton key={name+originalSlot+i} onBtnClick={ function(){makeEquipUnEquip(`장신구${i}`),toolBarOn();} }>{`${i}`}</DivButton>);
        }
        return Buttons;    
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
        const howLongTime=currentTime-startTime;
        howLongTime>longTapTime?seeDetail():function(){return mouseFlag=false;};
    }
    function mouseUp(){
        if(mouseFlag==false){
            clearInterval(mouseInterval)
          return  longTap();
        }else{        
           
          return  shortTap();
        }    
        
    }
    function shortTap(){
        currentTime=Date.now();
        clearInterval(mouseInterval);
        const howLongTime=currentTime-startTime;
        mouseFlag=false;
        return  howLongTime>shortTapTime&&howLongTime<shortTapTime+500?originalSlot=="장신구ALL"?toolBarOn():makeEquipUnEquip():setToolTip(!toolTip);   
    }
    function longTap(){
        clearInterval(mouseInterval);
        if(mouseFlag===false)
            return null;
        return seeDetail();
    }
    function makeEquipUnEquip(slot=originalSlot){
        if(slot=="장신구ALL")
            return;
        onBtnEvent?onBtnEvent(name,src,info,rarity,slot,code):onUnEquipEvent(slot);
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