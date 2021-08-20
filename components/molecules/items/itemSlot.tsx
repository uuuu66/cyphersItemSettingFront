import { ComponentProps,useState } from "react";
import ItemBtn from "./itemBtn";
import DivBtn from "../../atoms/divButton"
import StatusBar from "../../molecules/bars/statusBar"
import {CslotInfo} from "../../organisms/itemSetting";


export default function itemSlot(props:ComponentProps<any>){
    const title=props.slot.title+(props.slot.idx+1);
    const isMaxmize=props.slot.isMaxmize?"Max":"Mini"; 
    const isCurrent=props.slot.current;
    const isFloat=props.slot.isFloat?"Float":"NotFloat";
    const contractedTitle=title.length>4?title.substr(0,title.length-3)+"...":title;
    const [current,setCurrent]=useState(isCurrent);
    const [maxmize,setMaximize]=useState(isMaxmize);
    const [float,setFloat]=useState(isFloat); 
    const itemSlots=props.slot.items;
    const slotKeys=Object.keys(itemSlots);
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
        
            onUnEquipEvent={
            function(slot){ 
                return props.onListEvent(slot);
            }}>     
            </ItemBtn>

        )
    }
    const buttonOne=float=="Float"?currentBtn() :null;
    const buttonTwo=float=="Float"?minimizeBtn():currentBtn();
    const buttonThree=float=="Float"?closeBtn():floatBtn();
   
    function minimizeBtn(){
        return(
            <DivBtn 
            onBtnClick=
            {function(){
                    setMaximize("Mini");
            }}>-</DivBtn>
        )
    }
    function maximizeBtn(){
        return(
            <DivBtn  
            onBtnClick=        
            {function(){         
                setMaximize("Max");
            }}>□</DivBtn>
        )
    }
    function closeBtn(){
        return(
            <DivBtn 
            onBtnClick=
            {function(){
                    setFloat("NotFloat");
                    setMaximize("Mini")
            }}>x</DivBtn>
        )
    }
    function floatBtn(){
        return(
            <DivBtn 
            onBtnClick=
            {function(){
                    setFloat("Float");
                    setMaximize("Max")
            }}>+</DivBtn>
        )
    }
    function currentBtn(){      
            return(
                <DivBtn 
                onBtnClick=
                {function(){
                        setCurrent(!current);
                }}>{current==true?"∧":"∨"}</DivBtn>
            )      
    }
    function maxmizeSlot(){
        return(
            <div className={"itemSlot"+float+maxmize}>
                <StatusBar title={title} current={current}>             
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
                 
            </div>    
        )
    }
    function minimizeSlot(){
        return(
            <div className="itemSlotFloatMini">
                <StatusBar title={contractedTitle} current={current}>
                    {currentBtn()}
                    {maximizeBtn()}
                    {closeBtn()}
                </StatusBar>
            </div>
        )  
    }
    const Content=float=="Float"?(maxmize=="Max"?maxmizeSlot():minimizeSlot()):(maxmizeSlot())
    return(
       <>
       {Content}
       </>
    )
}