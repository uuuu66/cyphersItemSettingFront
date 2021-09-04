import { ComponentProps,useState } from "react";
import DivButton from "../../atoms/divButton";
import ImgButton from "../../atoms/imgButton";
import ToolBarButton from "../toolBarButton/toolBarButton"

export default function ItemMenuButtons({onDelete,onSave,onReset}:ComponentProps<any>){
            const type="Small" 
            const toolBar={
                title:"삭제",
                buttons:[<DivButton key="delete" onBtnClick={function(){onDelete();}}>삭제</DivButton>,
                        <DivButton key="reset" onBtnClick={function(){onReset()}}>리셋</DivButton> ,
                        ]
                }                           
    return(
        <>
          
            <ToolBarButton  title={toolBar.title} buttons={toolBar.buttons}>
                 <ImgButton type={type} src="/deleteBtn.png" onBtnClick={null}/>
            </ToolBarButton>
            
               
          
          
            <ImgButton type={type} src="/saveBtn.png" onBtnClick={onSave}>

            </ImgButton>
        </>
    )
}