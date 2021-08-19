import { ComponentProps } from "react";

export default function Space({children}:ComponentProps<any>){
    return(
        <div className="space">{children}</div>
    )
}