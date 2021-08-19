import { ComponentProps } from "react";
import Name from '../atoms/name';
import Icon from '../atoms/icon';
import ToolTip from './toolTip';

export default function imgBtn(props:ComponentProps<any>){
    const onBtnEvent=props.onBtnEvent??null;
    const onWatchDetail=props.onWatchDetail??null;
    const onEquipEvent=props.onEquipEvent??null;
    const src=props.code??null;
    const name=props.name;
    const type=props.type;
    const info=props.info;
    const slot=props.slot;
    const rarity=props.rarity??"커먼";
    let mouseFlag=false;
    let mouseInterval=null;
    let startTime=0;
    let currentTime=0;
    const tapTime= 1000;
   
    function mouseCapture(){
        startTime=Date.now();
        if(mouseFlag!=false)
            return;
        mouseFlag=true;  
        mouseInterval= setInterval(()=>howLongMouseTap(),20);       
    } 
    function howLongMouseTap(){
        currentTime=Date.now();
        const howLongTime=currentTime-startTime;
       
        howLongTime>tapTime?longTap():function(){return null};
    }
    function mouseUp(){ 
        if(mouseFlag==false){
            clearInterval(mouseInterval);
        }else{
         shortTap();
        }    
    }
    function shortTap(){
        return makeEquipUnEquip();
    }
    
    function longTap(){
        return seeDetail();
    }
    function makeEquipUnEquip(){
        onBtnEvent?onBtnEvent(name,src,info,rarity,slot):onEquipEvent(slot);
        mouseFlag=false;
        startTime=0; 
        return clearInterval(mouseInterval);
    }
    function seeDetail(){
        onWatchDetail?onWatchDetail(name,src,info,rarity,slot):null;
        mouseFlag=false;
        startTime=0; 
        return clearInterval(mouseInterval);  
    }
    return(
    <ToolTip info={info} type={type} name={name} rarity={rarity}>    
        <div className={type} 
        onClick={function(e){e.preventDefault()}}
        onMouseDown={()=>{mouseCapture()}}
        onMouseUp={(e)=>{e.preventDefault();mouseUp()}}
        onTouchStart={()=>{mouseCapture()}}
        onTouchEnd={(e)=>{e.preventDefault();mouseUp()}}
        >
        <Icon src={src} alt={name} ></Icon>
        {type!="itemicon"&&<Name name={name} rarity={rarity}></Name>}
        </div> 
    </ToolTip>         
    )
}