
import {useState} from "react";
import Link from "next/link";
import { ComponentProps } from "react";
export default function Nav(props:ComponentProps<any>){
    const menuText=props.data;
    return (
        <nav onClick={function(e){props.onLink(e)}}>
            
           {menuText.map((menu)=>(
                    <Link key={menu.index}  href={menu.href}><div className="menuText"  >{menu.title}</div></Link>
           ))}
           
        </nav>
    )
}
