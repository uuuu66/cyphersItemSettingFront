import { ComponentProps } from "react";
import { getStaticProps } from "../../../pages/make";
import Span from "../../atoms/span";


export default function Announce({announces,onCancle}:ComponentProps<any>){
  
    return(
                <div className="announceText" onClick={function(){onCancle()}}>
                  (<Span rarity={announces.rarity??null}>{announces.text}</Span>)       
                </div>  
    )
}