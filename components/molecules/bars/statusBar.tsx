import { ComponentProps } from "react";
import Tool from '../../atoms/tool';
import Space from '../../atoms/space'
export default function DivRowAlign({children,title,current}:ComponentProps<any>){
    const isCurrent=current?"Current":"";
    
    return(
        <div className={`statusBar${isCurrent}`}>
           <Space>{title}</Space>
            <Tool>
                {children}
            </Tool> 
        </div>
    )
}