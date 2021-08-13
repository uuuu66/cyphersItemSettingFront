import {ReactNode,useState} from "react";
import Nav from './nav';


export default function layout({children}:{children:ReactNode}){
    const [menuState,setMenuState]=useState({index:0,text:"메뉴"});
    const [navList,setNavList]=useState([{index:0,href:"/",title:"home"},{index:1,href:"/make",title:"아이템 세트 만들기 "}])
    const menuStatus =(e)=>{
      
        if(menuState.index==0){
           
            setMenuState({index:1,text:"열림"});
        }else{
            
            setMenuState({index:0,text:"메뉴"});
        }
        e.target.blur();
    }
    return(
        <section>
            <div id="menuBtn" onClick= {menuStatus} >
                {menuState.text}
            </div>
            {!menuState.index?null:<Nav data={navList}></Nav>}
            <article>
                {children}
            </article>       
        </section>
    )
}