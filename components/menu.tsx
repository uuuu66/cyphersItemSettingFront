
import {useState} from "react";
import Link from "next/link";
export default function Menu(){
    const [select,setMenuSelection]=useState(0);
    const menuText=[
        {index:1,menu:"아이템 세트 만들기/불러오기",href:"/make"},
        {index:2,menu:"아이템 검색하기",href:"/load"}
    ]

    return (
        <nav>
            
           {menuText.map((menu)=>(
                    <Link key={menu.index} href={menu.href}><div className="menuText"  >{menu.menu}</div></Link>
           ))}
           
        </nav>
    )
}
