import { ComponentProps } from "react";

export default function Button(props:ComponentProps<any>){
    const how=props.how?props.how:"normal";
    return(
     <button className={how} onClick={props.onClick}>
         {props.children}
     </button>
 )
}