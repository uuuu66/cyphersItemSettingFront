import { ComponentProps } from "react";
import Image from 'next/image'
export default function Icon(props:ComponentProps<any>){
    // const priority=props.type=="item"?false:true;
   
    
    return( <div className="icon" > 
                <link rel="preload" href={props.src} as="image"/>
                <Image src={props.src} className="icon" width="40px" height="40px" priority={true}    alt={props.name}>
                </Image>
                
            </div>
            )
}
       