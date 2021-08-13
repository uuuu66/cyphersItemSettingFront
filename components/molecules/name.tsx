import { ComponentProps } from "react";
import { getStaticProps } from "../../pages/make";
import Span from '../atoms/span'

export default function Name(props:ComponentProps<any>){
    
    return(
            <div className="name">
                <Span rarity={props.rarity}>{props.name}</Span>
            </div>
       
    )
}