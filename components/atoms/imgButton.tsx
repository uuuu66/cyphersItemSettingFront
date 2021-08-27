import { ComponentProps } from "react";
import Image from 'next/image'

export default function ImgButton({onBtnClick,src,alt,children,}:ComponentProps<any>){
   return( 
       <div className="imgButton">
    <Image className="imgButton"  loading="eager" objectFit="fill" width="40px" height="40px" src={src} alt={alt?alt:children}  onClick={function(){onBtnClick()}} >
    </Image>
    </div>
    )

}