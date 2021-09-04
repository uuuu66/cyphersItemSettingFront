
import ImgButton from "../../atoms/imgButton";
import ToolBarButton from "../toolBarButton/toolBarButton";
import DivButton from "../../atoms/divButton";
import Wrap from "../../atoms/wrap"
import { ComponentProps, RefObject, useRef, useState } from "react";
import StatusBar from "../bars/statusBar"
export default function ItemMenuButtons({onCreate,onLoad}:ComponentProps<any>){
    const [codeInput,setInput]=useState(false);
    const toolBar={
        title:"슬롯 생성",
        buttons:[
        <DivButton key="create" onBtnClick={onCreate}>새로</DivButton>,
        <DivButton key="code" onBtnClick={function(){setInput(true)}}>코드</DivButton> ,
        ]
    }
    const codeRef:RefObject<HTMLInputElement>=useRef()
    return(
        <>
        <ToolBarButton title={toolBar.title} buttons={toolBar.buttons} >
            <ImgButton  src="/createBtn.png">        
            </ImgButton>
        </ToolBarButton>
        {codeInput&&<Wrap type="opacity">
            
           
            <input ref={codeRef} placeholder="이곳에 코드 붙여넣기" className="codeInput"></input>
            <StatusBar>
            <ImgButton src="/loadBtn.png" onBtnClick={()=>{setInput(false);onLoad(codeRef.current.value);codeRef.current.value=null;}}></ImgButton>
            <ImgButton src="/x.png" onBtnClick={()=>{codeRef.current.value=null;setInput(false)}}></ImgButton>
            </StatusBar>
        </Wrap>}
        </>
    )
}