import {ComponentProps,useState} from "react"
import Space from "../atoms/space"
import Tool from "../atoms/tool"
export default function ToolBar(props:ComponentProps<any>){
   return(
      <>
         <div className= {`toolBar${props.on}`}> 
         <Space>{props.title}</Space>
      
         <Tool>
            {props.buttons}
         </Tool>
         </div>
      </>
   ) 
}