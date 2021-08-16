import { ComponentProps,useState } from "react";
import Span from '../atoms/span'
import ItemBtn from "./itemBtn";
interface item{
    name:string;
    src:string;
    info:string;
    part:string;
    rarity:string;
}
export default function itemSlot(props:ComponentProps<any>){
        console.log(props.slot.items)
    const itemSlots=props.slot.items;
    const slotKeys=Object.keys(itemSlots);
    function itemBtn(value:item){
        if(value!=null)
        return(
            <ItemBtn type="itemicon"
            code={value.src} 
            data-name={value.name} 
            name={value.name} 
            key={value.name} 
            rarity={value.rarity}
            info={value.info}
            slot={value.part}
            onBtnEvent={
            function(value,src,info,rarity,slot){ 
           
                return props.onListEvent(value,src,info,rarity,slot);
                }}></ItemBtn>
        )
    
    }
 
    return(<div className={"itemSlot"+props.isOn}>
            <Span rarity="유니크">제목</Span>
                <div className="slot1">
                    {slotKeys.map((value,i)=>
                    {
                        if(i<8)
                        {
                            return(
                            <table key={i}>
                                <tbody>
                                    <tr>
                                        <th >
                                            {value}
                                        </th>
                                    </tr>
                                    <tr>
                                        <td className="slot">{itemBtn(itemSlots[value])}</td>
                                    </tr>
                                </tbody> 
                            </table>
                            ) 
                        }
                    }
                    )}
                
                </div>
                <div className="slot2">
                {slotKeys.map((value,i)=>
                    {
                        if(i>=8)
                        {
                            return(
                            <table key={i}> 
                                <tbody>
                                    <tr>
                                        <th >
                                            {value}
                                        </th>
                                    </tr>
                                        <tr>
                                            <td className="slot">{itemBtn(itemSlots[value])}</td>
                                        </tr>
                                </tbody>  
                            </table>
                            ) 
                        }
                    }
                    )}
                </div>
        </div>
    )
}