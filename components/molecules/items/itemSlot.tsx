import { ComponentProps,memo,useCallback,useState } from "react";
import ItemBtn from "./itemBtn";
import DivBtn from "../../atoms/divButton"
import StatusBar from "../../molecules/bars/statusBar"
import {CslotInfo} from "../../organisms/itemSetting";
import Span from "../../atoms/span"
import { Iabillities } from "./itemResult";



const itemSlot=(props:ComponentProps<any>)=>{
    const title=props.slot.title+(props.slot.idx+1);
    const idx=props.slot.idx;
    const isMaximize=props.isMaximize?"Max":"Mini"; 
    const onMaximize=props.onMaximize??null;
    const isCurrent=props.slot.current;
    const isFloat=props.isFloat?"Float":"NotFloat";
    const onFloat=props.onFloat??null;
    const onCurrent=props.onCurrent??null;
    const result=props.slot.result;
    const contractedTitle=title.length>4?title.substr(0,title.length-3)+"...":title;
    const itemSlots=props.slot.items;
    const slotKeys=Object.keys(itemSlots);
   
    const Iabillities:Iabillities={
        "공격력":0,
        "치명타":0,
        "방어력":0,
        "체력":0,
        "회피":0,
        "이동속도":0,
        "공격속도":0,
        "부가효과":{},
    };
    const abillities=Object.keys(Iabillities);
    function itemBtn(value:CslotInfo){
        if(value==null)
            return
        return(
        
            <ItemBtn type="itemicon"
            code={value.src} 
            data-name={value.name} 
            name={value.name} 
            key={value.name} 
            rarity={value.rarity}
            info={value.info}
            slot={value.part}
            onWatchDetail={
                function(name,src,info,rarity,part){
                    return props.onWatchDetail(name,src,info,rarity,part)
                }
            }
            onUnEquipEvent={
            function(slot){ 
                return props.onListEvent(slot,idx);
            }}>     
            </ItemBtn>

        )
    }
    
   
    const minimizeBtn=useCallback(()=>{
        return(
            <DivBtn 
            onBtnClick=
            {function(){
                    onMaximize(idx,props.isMaximize);
            }}>-</DivBtn>
        )
    },[isMaximize])
    const maximizeBtn=useCallback(()=>{
        return(
            <DivBtn  
            onBtnClick=        
            {function(){         
                    onMaximize(idx,props.isMaximize);
            }}>□</DivBtn>
        )
    },[isMaximize])
    const closeBtn=useCallback(()=>{
        return(
            <DivBtn 
            onBtnClick=
            {function(){
                    onFloat(idx,props.isFloat);
            }}>x</DivBtn>
        )
    },[isFloat])
    const floatBtn=useCallback(()=>{
        return(
            <DivBtn 
            onBtnClick=
            {function(){
                    onFloat(idx,props.isFloat);              
            }}>+</DivBtn>
        )
    },[isFloat])
    const currentBtn=useCallback(()=>{      
            return(
                <DivBtn 
                onBtnClick=
                {function(){
                        onCurrent(idx,props.slot.current);
                }}>{isCurrent==true?"∧":"∨"}</DivBtn>
            )      
    },[isCurrent])
    const buttonOne=isFloat=="Float"?currentBtn() :null;
    const buttonTwo=isFloat=="Float"?minimizeBtn():currentBtn();
    const buttonThree=isFloat=="Float"?closeBtn():floatBtn();
    const maxmizeSlot=useCallback(()=>{
        return(
            <div className={"itemSlot"+isFloat+isMaximize}>
                <StatusBar title={title} current={isCurrent}>             
                        {buttonOne}
                        {buttonTwo}
                        {buttonThree}
                </StatusBar>  
            <div className="slot1">
                {slotKeys.map((value,i)=>
                    {
                        if(i<8)
                        {
                            return(
                            <table key={i}>
                                <tbody>
                                    <tr className="head">
                                        <th >
                                            {value}
                                        </th>
                                    </tr>
                                    <tr className="tail">
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
                                    <tr className="head">
                                        <th >
                                            {value}
                                        </th>
                                    </tr>
                                        <tr className="tail">
                                            <td className="slot">{itemBtn(itemSlots[value])}</td>
                                        </tr>
                                </tbody>  
                            </table>
                            ) 
                        }
                    }
                    )}
                </div>
                <div className={`summaryResult${isFloat}`}>
                    {result&&abillities.map((abil,i)=>{
                        if(abil!=="부가효과")
                         return i==4?<Span  key={i+abil}rarity="유니크">{`${abil}:${result[0][abil]} `}<br></br></Span>:<Span  key={i +abil}rarity="유니크">{`${abil}:${result[0][abil]}   `}</Span>
                        }
                        
                    )}
                </div>
            </div>    
        )
    },[isCurrent,isFloat,isMaximize,itemSlots,result])
    const minimizeSlot=useCallback(()=>{
        return(
            <div className="itemSlotFloatMini">
                <StatusBar title={contractedTitle} current={isCurrent}>
                    {currentBtn()}
                    {maximizeBtn()}
                    {closeBtn()}
                </StatusBar>
            </div>
        )  
    },[isCurrent,isFloat,isMaximize,itemSlots,result])
    const Content=isFloat=="Float"?(isMaximize=="Max"?maxmizeSlot():minimizeSlot()):(maxmizeSlot())
    return(
       <>
       {Content}
       </>
    )
}
export default  memo(itemSlot);