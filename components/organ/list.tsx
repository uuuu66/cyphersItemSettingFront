import { ComponentProps,useState } from "react";
import ImgBtn from '../tissue/imgBtn'
export default function List(props:ComponentProps<any>){
    const items=props.data;
    const [listType,setListType]=useState(props.type);
    const Content=
                items.map(  
                    value=>{
                            return <ImgBtn 
                            type={listType} 
                            code={value.code} 
                            data-name={value.name} 
                            name={value.name} 
                            key={value.name} 
                            onBtnEvent={
                            function(value){ 
                                return !!props.onListEvent(value);
                                }
                            }>
                        </ImgBtn>  
                })
    return(
        <div className="listWrap">
            {Content}
        </div>
    )
}