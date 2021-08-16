import { ComponentProps } from "react";
import Name from '../atoms/name';
import Icon from '../atoms/icon';
import ToolTip from './toolTip';
import { clear } from "node:console";
export default function imgBtn(props:ComponentProps<any>){
    const onBtnEvent=props.onBtnEvent?props.onBtnEvent:null;
    const src=props.code?props.code:null;
    const name=props.name;
    const type=props.type;
    const info=props.info;
    const slot=props.slot;
    const rarity=props.rarity?props.rarity:"커먼";
    let mouseEvent=false;
    let repeat=null;
    
    function mouseCapture(){
        if(mouseEvent!=false)
            return;
        let time=Date.now();
        mouseEvent=true;
         
       repeat= setInterval(function mouseHandler(){
        const currenttime=Date.now();
            if(currenttime-time>1000){
                onBtnEvent(name,src,info,rarity,slot);
                mouseEvent=false;
                time=0; 
                return clearInterval(repeat);
            }  
        },20);
        
    } 
    function mouseUp(){
        
        mouseEvent=false;
        if(mouseEvent==false){
            clearInterval(repeat);
        }
        
    }
    return(
    <ToolTip info={info} type={type} name={name}>    
        <div className={type} 
        onClick={function(e){e.preventDefault()}}
        onMouseDown={()=>mouseCapture()
        }
        onMouseUp={()=>mouseUp()}
        onTouchStart={()=>mouseCapture()}
        onTouchEnd={()=>mouseUp()}
        >
         
           <Icon src={src} alt={name} ></Icon>
           {type!="itemicon"&&<Name name={name} rarity={rarity}></Name>}
        
        </div> 
    </ToolTip>         
    )
}