import { ComponentProps } from "react";
import BtnList from "../molecules/btnList/btnList"
export default function characterList({type,search,data}:ComponentProps<any>){
    return(
        <BtnList  type={type} search={search}  data={data}>
            
        </BtnList>
    )
}