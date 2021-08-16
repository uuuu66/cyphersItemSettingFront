import { ComponentProps } from "react";

export default function Icon(props:ComponentProps<any>){
    return( <div className="icon">
                <img src={props.src} alt={props.name}></img>
            </div>
            )
}   