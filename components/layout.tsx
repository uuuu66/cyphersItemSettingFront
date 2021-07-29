import {ReactNode,useState,useRef} from "react";
import Menu from './menu';


export default function layout({children}:{children:ReactNode}){
    const [menuState,setMenuState]=useState({index:0,text:"메뉴"});
 
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
            {!menuState.index?null:<Menu></Menu>}
            <article>
                {children}
            </article>
            
        </section>
    )
}