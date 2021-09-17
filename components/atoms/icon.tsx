import { ComponentProps } from "react";
import Image from 'next/image'
export default function Icon(props:ComponentProps<any>){
    // const priority=props.type=="item"?false:true;
   
    
    return( <div className="icon" > 
                <Image src={props.src} className="icon" width="40px" height="40px" priority={true} loading="eager"   alt={props.name}>
                </Image>
            </div>
            )
}
       