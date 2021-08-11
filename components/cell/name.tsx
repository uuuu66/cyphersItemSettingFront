import { ComponentProps } from "react";


export default function Name(props:ComponentProps<any>){
    const rarity=props.rarity?props.rarity:"common";
    return(
            <div className="name">
                <span className={rarity}>{props.name}</span>
            </div>
       
    )
}