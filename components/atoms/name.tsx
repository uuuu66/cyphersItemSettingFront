import { ComponentProps } from "react";
import Span from './span'

export default function Name(props:ComponentProps<any>){
    
    return(
            <div className="name">
                <Span rarity={props.rarity}>{props.name}</Span>
            </div>
       
    )
}