import {  ComponentProps } from "react";
import ItemDetail from "./itemDetail";
export default function Tooltip(props:ComponentProps<any>){


    return(
        <div className="tooltip" >
           {props.children}
           <div className={props.type+"I"}>
                <ItemDetail type={props.type}>{props.info}</ItemDetail>
           </div>
        </div>
    )
}