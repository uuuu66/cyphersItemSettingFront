import { ComponentProps,useState } from "react";
import Span from '../atoms/span'
export default function itemSlot(props:ComponentProps<any>){
    const itemSlots={
        "손":"옥스혼",
        "머리":"전사",
        "가슴":"옥스혼",
        "허리":"도적",
        "다리":"옥스혼",
        "발":"광전사",
        "장신구1":"옥스혼",
        "장신구2":"마법사",
        "회복킷":"옥스혼",
        "가속킷":"사제",
        "공격킷":"옥스혼",
        "방어킷":"옥수수",
        "특수킷":"옥스혼",
        "목":"감자",
        "장신구3":"옥스혼",
        "장신구4":"혼스옥",     
    }
    const slotNames=Object.keys(itemSlots);
    const [slots,setSlots]=useState(slotNames);
    return(<div className="itemSlot">
            <Span rarity="유니크">제목</Span>
            <div className="slot1">
                {slots.map((value,i)=>
                {
                    if(i<8)
                    {
                        return(
                        <table> 
                            <thead>
                                <th key={value}>
                                    {value}
                                </th>
                            </thead>
                            <tr>
                                <td>{itemSlots[value]}</td>
                            </tr>
                        </table>
                        ) 
                    }
                }
                )}
            
            </div>
            <div className="slot2">
            {slots.map((value,i)=>
                {
                    if(i>=8)
                    {
                        return(
                        <table> 
                            <thead>
                                <th key={value}>
                                    {value}
                                </th>
                                <tr>
                                    <td>{itemSlots[value]}</td>
                                </tr>
                            </thead>
                        </table>
                        ) 
                    }
                }
                )}
            </div>
        </div>
    )
}