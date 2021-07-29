
import {useState} from "react"

export default function Menu(){
    const [select,setMenuSelection]=useState(0);
    const menuText=[
        {index:1,menu:"새 아이템 세트 만들기"},
        {index:2,menu:"아이템 코드 불러오기"},
        {index:3,menu:"다른 사람이 만든 코드 보기"}
    ]
    const openMenu=(e)=>{
        const {key}=e.target;
        setMenuSelection(key);
    }
 
    return (
        <nav>
           {menuText.map((menu)=>(
            <div className="menuText" key={menu.index} onClick={openMenu}>{menu.menu}</div>
           ))}
        </nav>
    )
}