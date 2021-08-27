import { ComponentProps } from "react";
import Wrap from "../../atoms/wrap"
export default function List({children}:ComponentProps<any>){
    return(
    <Wrap type="list">
        {children}
    </Wrap>
    )
}