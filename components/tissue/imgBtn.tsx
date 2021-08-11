import { ComponentProps } from "react";
import Name from '../cell/name';
import Icon from '../cell/icon';
export default function imgBtn(props:ComponentProps<any>){
    const onBtnEvent=props.onBtnEvent?props.onBtnEvent:null;
    const src=props.code?props.code:null;
    const name=props.name;
    const type=props.type; 
    const rarity=props.rarity?props.rarity:"커먼";
    return(
        <div className={type} onClick={function(e){
            onBtnEvent(name);
        }}>
           <Icon src={src} alt={name}></Icon>
           <Name name={name} rarity={rarity}></Name> 
        </div>       
    )
}