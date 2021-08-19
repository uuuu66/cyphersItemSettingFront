import { ComponentProps } from "react";


export default function DivButton(props:ComponentProps<any>){
   return( 
    <div className="divButton" onClick={function(){props.onBtnClick()}} >
            {props.children}
    </div>
    )

}