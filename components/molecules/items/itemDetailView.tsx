import { ComponentProps } from "react";
import Icon from "../../atoms/icon"
import Span from "../../atoms/span"
export default function ItemDetaiView({target}:ComponentProps<any>){
    const src=target.src;
    const name=target.name;
    const info=target.info;
    const part=target.part;
    const rarity=target.rarity;
    const infoStrings=info.split("\n");
    return(
        <div className="itemDetailView">
            {src!="없음"&&<Icon src={src} name={name}></Icon>}
            <Span rarity={rarity}>{name}</Span>
            <h5>슬롯:{part}</h5>
            <div>
            {infoStrings.map((info,i)=>(
                <p key={name+info+i}>
                    {i>4?<Span  rarity="언커먼">{info}</Span>:<Span rarity="유니크">{info}</Span>}
                </p>
            ))}
            </div>
        </div>
    )
}