import { ComponentProps } from "react";
import Image from 'next/image'
export default function Icon(props:ComponentProps<any>){
    // const priority=props.type=="item"?false:true;
     const loading=props.type=="item"?"lazy":"eager";
    return( <div className="icon" > 
                <Image  src={props.src} className="icon" width="40px" height="40px" loading={loading}     alt={props.name}>
                </Image>
            </div>
            )
}
       