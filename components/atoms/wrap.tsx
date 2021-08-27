import { ComponentProps } from "react";

export default function FlexWrap({children,type}:ComponentProps<any>){
    return(
        <div className={`${type}Wrap`}>
            {children}
        </div>
    )
}