import { ComponentProps } from "react";

export default function Tool({children}:ComponentProps<any>){
    return(
        <div className="tools">
            {children}
        </div>
    )
}