import { ComponentProps } from "react";


export default function imgButton({onBtnClick,src,alt,children}:ComponentProps<any>){
   return( 
    <img className="imgButton" src={src} alt={alt?alt:children} onClick={function(){onBtnClick()}} >
    </img>
    )

}