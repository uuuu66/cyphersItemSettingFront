import { ComponentProps } from "react";
import Tool from '../../atoms/tool';
import Space from '../../atoms/space'
export default function DivRowAlign({children,title,current,type}:ComponentProps<any>){
    const isCurrent=current?"Current":"";
    
    return(
        <div className={`statusBar${isCurrent}${type??""}`}>
           <Space>{title}</Space>
            <Tool>
                {children??null}
            </Tool> 
        </div>
    )
}