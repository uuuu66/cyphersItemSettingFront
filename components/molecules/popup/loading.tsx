import Image from "next/image"
import { ComponentProps,useMemo} from "react"
export default function Loading({on}:ComponentProps<any>){
   return( 
   <div className={`loading${on}`} >
       <Image width="300px" height="300px" priority={true} src={"/c.png"}></Image>
    </div>
    )
}