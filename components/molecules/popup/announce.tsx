import { ComponentProps } from "react";
import Span from "../../atoms/span";


export default function Announce({announces}:ComponentProps<any>){
    console.log(announces);
    return(
                <div className="announceText">
                  (<Span rarity={announces.rarity??null}>{announces.text}</Span>)       
                </div>  
    )
}