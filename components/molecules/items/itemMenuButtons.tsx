import { ComponentProps } from "react";
import ImgButton from "../../atoms/imgButton";
export default function ItemMenuButtons({onCreate,onDelete,onSave,onLoad}:ComponentProps<any>){
    return(
        <>
            <ImgButton src="/createBtn.png" onBtnClick={onCreate}>
               
            </ImgButton>
            <ImgButton src="/deleteBtn.png" onBtnClick={onDelete}>
               
            </ImgButton>
            <ImgButton src="/saveBtn.png" onBtnClick={onSave}>

            </ImgButton>
            <ImgButton src="/loadBtn.png" onBtnClick={onLoad}>
                
            </ImgButton>
        </>
    )
}