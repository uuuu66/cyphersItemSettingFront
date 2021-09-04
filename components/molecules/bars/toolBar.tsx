
import {ComponentProps,useEffect,useState} from "react"
import Space from "../../atoms/space"
import Tool from "../../atoms/tool"

export default function ToolBar(props:ComponentProps<any>){
  
   return(
      <>
         <div onClick={()=>props.onToolBarOFF()} className= {`toolBar${props.on}`}> 
         <Space>{props.title}</Space>
         <Tool>
            {props.children}
         </Tool>
         </div>
      </>
   ) 
}