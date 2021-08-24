
import {  ComponentProps } from "react";
import TooltipData from "./tooltipData";
import ToolBar from "../bars/toolBar";
export default function Tooltip(props:ComponentProps<any>){
    function toolBar(props){
        if(!props.toolBar)
        return
        
        const toolBar=props.toolBar;
        console.log(toolBar)
        return(
            <ToolBar title={toolBar.title} buttons={toolBar.buttons}>

            </ToolBar>
        )
    }
    function toolTipInfo(props){
        const types=["character","item","itemicon"]
        if(types.filter(value=>{return value===props.type})!==[])
            return(
                    <div className={props.type+"I"}>
                        {toolBar(props)}
                        <br></br>
                        <TooltipData type={props.type} rarity={props.rarity} name={props.name}>{props.info}</TooltipData>
                    </div>
                )
        return( <div className="basic">
                    {props.type}
                </div>
            )
    }
    return(
        <div className="toolTip" >
           {props.children}
            
            {toolTipInfo(props)}
        </div>
    )
}