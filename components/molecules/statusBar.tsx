import { ComponentProps } from "react";
import Tool from '../atoms/tool';
export default function divRowAlign({children,title,current}:ComponentProps<any>){
    const isCurrent=current?"Current":"";
    
    return(
        <div className={`statusBar${isCurrent}`}>
            <div className="space">{title}</div>
            <Tool>
                {children}
            </Tool> 
        </div>
    )
}