import { ComponentProps } from "react";

export default function span(props:ComponentProps<any>){
    const rarity=props.rarity?props.rarity:"커먼";
    return(
    <span className={rarity}>
        {props.children}
    </span>

    )
}