import { ComponentProps,useState } from "react";
import ToolBar from "../bars/toolBar"

export default function ToolBarButton({children,title,buttons}:ComponentProps<any>){
    const[On,setOn]=useState("OFF");
    function toolBarOn(){
        const on=On=="ON"?"OFF":"ON";
        return setOn(on);
    }
    
    return(
    <div className="toolBarBtn" onClick={toolBarOn}>
    {children}
    <ToolBar onToolBarOFF={toolBarOn} on={On} title={title} >
         {buttons.map(value=>{return value})}
    </ToolBar>
    </div>
    )
}