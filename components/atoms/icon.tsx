import { ComponentProps } from "react";
import Image from 'next/image'
export default function Icon(props:ComponentProps<any>){
    const priority=props.type=="character"?true:false;
    const loading=props.type=="character"?"eager":"lazy";
    return( <div className="icon" > 
                <Image  src={props.src} className="icon" width="40px" height="40px" priority={priority} loading={loading} objectFit="inherit"   alt={props.name}>
                </Image>
            </div>
            )
}
       