import { ComponentProps,useEffect,useState } from "react";
import DivButton from "../../atoms/divButton";
import ImgButton from "../../atoms/imgButton";
import ToolBar from "../bars/toolBar"
export default function ItemMenuButtons({onCreate,onDelete,onSave,onLoad,onReset}:ComponentProps<any>){
            const[On,setOn]=useState("OFF");
            const [toolBarTimeOut,setToolBarTimeOut]=useState(null);
            const toolBar={
                title:"삭제 버튼",
                buttons:[<DivButton key="delete" onBtnClick={function(){onDelete();setOn("OFF")}}>삭제</DivButton>,
                        <DivButton key="reset" onBtnClick={function(){onReset();setOn("OFF")}}>리셋</DivButton> ,
                        <DivButton key="cancle" onBtnClick={function(){setOn("OFF")}}>취소</DivButton>   
                        ]
                }
                function toolBarOn(){
                    clearTimeout(toolBarTimeOut)
                    setToolBarTimeOut(null)
                    const on=On=="ON"?"OFF":"ON";
                    setToolBarTimeOut(setTimeout(()=>{setOn("OFF")},5000));
                    return setOn(on);
                }   
                useEffect(function(){return clearTimeout(toolBarTimeOut)})
    return(
        <>
            <ImgButton src="/createBtn.png" onBtnClick={onCreate}>
               
            </ImgButton>
            <ToolBar on={On} title={toolBar.title} buttons={toolBar.buttons}/>
            <ImgButton src="/deleteBtn.png" onBtnClick={()=>{toolBarOn()}}>
               
            </ImgButton>
          
            <ImgButton src="/saveBtn.png" onBtnClick={onSave}>

            </ImgButton>
            <ImgButton src="/loadBtn.png" onBtnClick={onLoad}>
                
            </ImgButton>
            
        </>
    )
}