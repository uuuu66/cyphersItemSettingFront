import { ComponentProps } from "react";

export default function flexWrap({children,type}:ComponentProps<any>){
    return(
        <div className={`${type}Wrap`}>
            {children}
        </div>
    )
}