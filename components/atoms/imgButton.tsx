import { ComponentProps } from "react";
import Image from 'next/image'

export default function ImgButton({onBtnClick,src,alt,children,type}:ComponentProps<any>){
  
    return( 
       <div className={`imgButton${type||""}`}>
    <Image className="imgButton"  loading="eager" objectFit="fill" width="40px" height="40px" src={src} alt={alt?alt:children}  onClick={onBtnClick??null} >
    </Image>
    </div>
    )

}