import React from "react";
import ItemList from "./itemList";

export default function characterSet(props:React.ComponentProps<any>){
        const Contents=props.data.map(value=>{     
          return <ItemList key={value.character} data={value.item}></ItemList>
        });
    
      return(
        <div id="characterSet"> 
           {Contents}
        </div>
    );
}