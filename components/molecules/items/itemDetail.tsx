import { ComponentProps, useState } from "react";
import Span from '../../atoms/span'
export default function itemDetail(props:ComponentProps<any>){
    const type=props.type??"character";
    const info=props.children; 
    let Content=type!="character"?[<Span key={props.name} rarity={props.rarity}>[{props.name}]</Span>]:[];
    type=="item"||"itemicon"?isItem():isNotItem();
    return(
        <div>     
            {Content}
        </div>
    )
    function isItem(){
        const data= info.split('\n');
        Content.push(<div key={info}>
            
        {data.map((value,i)=>{
             if(i==0)
                 return(<Span key={value+i} rarity="유니크">{value}<br></br></Span>);
             if(i==1)
                 return(<Span key={value+i} rarity="언커먼">{value}<br></br>{data[2]}<br></br> {data[3]} <br></br>{data[4]}</Span>);
             return;                  
         })}
         <br></br>
         <Span rarity="레어"><Span rarity="유니크">터치</Span><br></br> 아이템 착용/해제하기</Span>
         <br></br>
         <Span rarity="레어"><Span rarity="유니크">길게 터치</Span><br></br> 아이템 상세보기</Span>
         </div>)
     }
     function isNotItem(){
         Content.push(<div key={info}>
         <Span rarity="유니크">{info}</Span><br/>
         <Span rarity="언커먼"><Span rarity="유니크">{info}</Span> 아이템 <br></br>세트 만들기</Span>
         </div>)
     }
}
