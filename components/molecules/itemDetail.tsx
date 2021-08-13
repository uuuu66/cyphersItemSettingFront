import { ComponentProps, useState } from "react";
import Span from '../atoms/span'
export default function itemDetail(props:ComponentProps<any>){
    const [type,setType]=useState(props.type);
    const info=props.children;

    let Content=[];
    if(type=="item"){
       const data= info.split('\n');
       Content.push(<div key={info}>
       {data.map((value,i)=>{
            if(i==0){
                return (<Span key={value} rarity="유니크">{value}<br></br></Span>);
            }else if(i==1){
                return (<Span key={value} rarity="언커먼">{value}</Span>);
            }else{
                return
            }
        })}
        <br></br>
        <Span rarity="레어"><Span rarity="유니크">클릭</Span><br></br> 아이템 상세보기</Span>
        <br></br>
        <Span rarity="레어"><Span rarity="유니크">더블 클릭</Span><br></br> 아이템 착용하기</Span>
        </div>)
    }else{
        Content.push(<div key={info}>
        <Span rarity="유니크">{info}</Span><br/>
        <Span rarity="언커먼"><Span rarity="유니크">{info}</Span> 아이템 <br></br>세트 만들기</Span>
        </div>)
    }
    return(
        <div>
            {Content}
        </div>
    )
}