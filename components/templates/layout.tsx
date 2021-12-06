import {ReactNode,useState} from "react";
import Nav from './nav';


export default function Layout({children}:{children:ReactNode}){
  
    
    return(
        <section>
            <article>
                {children}
            </article>       
        </section>
    )
}